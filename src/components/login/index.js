/*global API_HOST*/

import { h, Component } from 'preact'
import { route } from 'preact-router'

import style from './style'
const classNames = require('classnames');

export default class Register extends Component {
	constructor() {
		super()

		this.state = {
			/** Contains any validation errors */
			errors: { email: '' }
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleEmailKeyup = this.handleEmailKeyup.bind(this)
		this.handlePasswordKeyup = this.handlePasswordKeyup.bind(this)
	}

	componentDidMount() {
		// TODO: autofocus only works on refresh. why?
		document.getElementById('email').focus()
	}

	render({ onRegister }, { errors }) {
		return (
			<div class={style.login}>
				<h1>Log into your account.</h1>
				<form id="login" onSubmit={this.handleSubmit} novalidate class={style.form}>

					<label htmlFor="email">Email:</label>
					<input
						class={errors.email ? style['invalid-input'] : style.email}
						type="email"
						name="email"
						id="email"
						data-validate="email"
						onkeyup={this.handleEmailKeyup}
						maxlength="30"
						autofocus
						class={style.input}
					/>
					<label class={style.invalid}>{errors.email}</label>

					<br />
					<br />

					<label htmlFor="password">Password:</label>
					<input
						class={errors.password ? style['invalid-input'] : style.password}
						type="password"
						name="password"
						id="password"
						data-validate="password"
						onkeyup={this.handlePasswordKeyup}
					/>
					<label class={style.invalid}>{errors.password}</label>
					<br />
					<br />

					<button class={style.button}>LOG IN</button>
					<label class={classNames(style.invalid, style.apiError)}>{errors.api}</label>
					{this.state.spinner &&
						<div class={style.loader}></div>
					}
					<div class={style.clear}></div>
				</form>
			</div>
		)
	}

	handlePasswordKeyup(event) {
		const password = event.target.value

		if (!password) {
			return
		}

		if (this.state.submit) {
			let errors = this.state.errors

			if (!validatePassword(password)) {
				errors = Object.assign(errors, {
					password: 'Password should be at least 6 characters'
				})
			} else {
				errors = Object.assign(errors, { password: '' })
			}

			this.setState({
				errors
			})
		}
	}

	handleEmailKeyup(event) {
		const email = event.target.value

		if (!email) {
			return
		}

		if (this.state.submit) {
			let errors = this.state.errors

			if (!validateEmail(email)) {
				errors = Object.assign(errors, {
					email: 'Please provide a valid email address'
				})
			} else {
				errors = Object.assign(errors, { email: '' })
			}

			this.setState({
				errors
			})
		}
	}

	handleSubmit(event) {
		event.preventDefault()

		this.setState({ errors: {}, spinner: false })
		let errors = {}

		const elements = document.getElementById('login').elements

		Array.prototype.forEach.call(elements, element => {
			const validateName = element.dataset.validate
			if (validateName) {
				errors = inputValidator[validateName](errors, element.value)
			}
		})

		if (Object.keys(errors).length) {
			this.setState({
				errors,
				submit: true
			})

			focus(this.state.errors)
			return
		}

		const email = document.getElementById('email').value
		const password = document.getElementById('password').value

		this.registerAPI(email, password)
	}

	registerAPI(email, password) {
		const body = JSON.stringify(
			{"email": email, "password": password}
		)

		const request = {
			mode: 'cors',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body
		}

		const t0 = performance.now();

		this.setState({ spinner: true })

		fetch(`${API_HOST}/adminlogin`, request)
			.then(res => {
				this.setState({ spinner: false })
				if (res.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' + res.status
					)
					console.log(res)

					this.setState({ errors: { api: 'Failed to register' } })
					return
				}

				res.json().then(data => {
					const t1 = performance.now();
					console.log("Login call took " + (t1 - t0) + " milliseconds.")

					localStorage.setItem('jwt', data.jwt)
					localStorage.setItem('registered', true)
					this.props.onRegister({ user: { jwt: data.jwt } })
					route('/')
					return
				})
			})
			.catch(err => {
				this.setState({ errors: { api: 'failed to register' }, spinner: false })
			})
	}
}

const focus = errors => {
	if (errors.email) {
		document.getElementById('email').focus()
		return
	}

	if (errors.password) {
		document.getElementById('password').focus()
		return
	}
}

// object with validation methods
const inputValidator = {
	email(errors, data) {
		if (!data) {
			return Object.assign(errors, { email: 'Enter your email' })
		}
		if (!validateEmail(data)) {
			return Object.assign(errors, {
				email: 'Please provide a valid email address'
			})
		}
		return errors
	},
	password(errors, data) {
		if (!data) {
			return Object.assign(errors, { password: 'Enter your password' })
		}
		if (!validatePassword(data)) {
			return Object.assign(errors, {
				password: 'Password should be at least 6 characters'
			})
		}
		return errors
	}
}

const validateEmail = email => {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(email)
}

const validatePassword = password => {
	if (password.length > 5) {
		return true
	}
}
