/*global API_HOST*/

import { h, Component } from 'preact'
import { route } from 'preact-router'
import { addClinic } from './api'

import style from './style'
const classNames = require('classnames');

export default class Register extends Component {
	constructor() {
		super()

		this.state = {
			/** Contains any validation errors */
			errors: { name: '' }
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		// this.handleEmailKeyup = this.handleEmailKeyup.bind(this)
		// this.handlePasswordKeyup = this.handlePasswordKeyup.bind(this)
	}

	componentDidMount() {
		// TODO: autofocus only works on refresh. why?
		document.getElementById('name').focus()
	}

	render({ onRegister }, { errors }) {
		return (
			<div class={style.login}>
				<h1>Create Clinic.</h1>
				<form id="createClinic" onSubmit={this.handleSubmit} novalidate class={style.form}>

					<label htmlFor="name">Name:</label>
					<input
						class={errors.name ? style['invalid-input'] : style.email}
						type="text"
						name="name"
						id="name"
						data-validate="name"
						maxlength="30"
						autofocus
						class={style.input}
					/>
					<label class={style.invalid}>{errors.name}</label>

					<br />
					<br />

					<label htmlFor="address1">address1:</label>
					<input
						class={errors.address1 ? style['invalid-input'] : style.password}
						type="password"
						name="address1"
						id="address1"
						data-validate="address1"
					/>
					<label class={style.invalid}>{errors.address1}</label>
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

		const elements = document.getElementById('createClinic').elements

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

		const clinic = {
			email: document.getElementById('name').value,
			address1: document.getElementById('address1').value
		}

		console.log("make API call", clinic)

		let success = data => {
			console.log(data)
		}

		let err = errors => {
			console.log("errors", errors)
			// this.setState({
			// 	errors: errors,
			// 	spinner: false
			// })
		}

		addClinic(clinic).then(success).catch(err)
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
	if (errors.name) {
		document.getElementById('name').focus()
		return
	}

	if (errors.address1) {
		document.getElementById('address1').focus()
		return
	}
}

// object with validation methods
const inputValidator = {
	name(errors, data) {
		if (!data) {
			return Object.assign(errors, { name: 'Enter clinic name' })
		}
		return errors
	},
	address1(errors, data) {
		if (!data) {
			return Object.assign(errors, { address1: 'Enter clinic address1' })
		}
		return errors
	}
}

