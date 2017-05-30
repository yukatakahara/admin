/*global API_HOST*/

import { h, Component } from 'preact'
import { route } from 'preact-router'

import style from './style'

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
			<div class={style.register}>
				<h1>Let's create your account.</h1>

				<form id="signup" onSubmit={this.handleSubmit} novalidate>

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
					/>
					<label class={style.invalid}>{errors.email}</label>

					<br />
					<br />

					<label htmlFor="password">Create Password:</label>
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

					<button>SIGN UP</button>
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

		const form = event.target
		let errors = {}
		const elements = document.getElementById('signup').elements

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

		this.registerAPI()
	}

	registerAPI() {
		const body = JSON.stringify(
			'{"email": "foo@gmail.com", "password": "password123"}'
		)

		const request = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body
		}

		fetch(`${API_HOST}/signup`, request)
			.then(res => {
				if (res.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' + res.status
					)
					console.log(res)

					this.setState({ errors: { api: 'failed to register' } })
					return
				}

				res.json().then(data => {
					localStorage.setItem('jwt', data.jwt)
					localStorage.setItem('registered', true)
					this.props.onRegister({ user: { jwt: data.jwt } })
					route('/')
					return
				})
			})
			.catch(err => this.setState({ errors: { api: 'failed to register' } }))
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
