/*global API_HOST*/

import { h, Component } from 'preact'
import { route } from 'preact-router'
import { addEmployee } from './api'

import style from './style'

export default class AddEmployee extends Component {
	constructor() {
		super()

		this.state = {
			/** Contains any validation errors */
			errors: { name: '' }
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		// TODO: validate fname and lname
		// this.handleNameKeyup = this.handleNameKeyup.bind(this)
		this.handleEmailKeyup = this.handleEmailKeyup.bind(this)
	}

	componentDidMount() {

		let jwt = localStorage.getItem('jwt')
		let registered = localStorage.getItem('registered')

		// user is not logged in
		if (!jwt) {
			route('/')
			return
		}

		// TODO: autofocus only works on refresh. why?
		document.getElementById('fname').focus()
	}

	render({user}, { errors }) {
		if (!user.jwt) {
			return
		}

		return (
			<div class={style.login}>
				<h1>Add Employee</h1>
				<form id="addEmployee" onSubmit={this.handleSubmit} novalidate class={style.form}>

					<label htmlFor="fname">First Name:</label>
					<input
						class={errors.fname ? style['invalid-input'] : style.email}
						type="text"
						name="fname"
						id="fname"
						data-validate="fname"
						maxlength="30"
						autofocus
						class={style.input}
					/>
					<label class={style.invalid}>{errors.fname}</label>

					<br />
					<br />

					<label htmlFor="lname">Last Name:</label>
					<input
						class={errors.jname ? style['invalid-input'] : style.email}
						type="text"
						name="lname"
						id="lname"
						data-validate="lname"
						maxlength="30"
						autofocus
						class={style.input}
					/>
					<label class={style.invalid}>{errors.lname}</label>

					<br />
					<br />

					<label htmlFor="email">Email:</label>
					<input
						class={errors.email ? style['invalid-input'] : style.password}
						type="text"
						name="email"
						id="email"
						data-validate="email"
						onkeyup={this.handleEmailKeyup}
					/>
					<label class={style.invalid}>{errors.email}</label>
					<br />
					<br />

					<button class={style.button}>Add Employee</button>
					<label class={style.invalid + ' ' + style.apiError}>{errors.api}</label>
					{this.state.spinner &&
						<div class={style.loader}></div>
					}
					<div class={style.clear}></div>
				</form>
			</div>
		)
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

		const elements = document.getElementById('addEmployee').elements

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

		const clinicId = this.props.clinicId

		const employee = {
			fname: document.getElementById('fname').value,
			lname: document.getElementById('lname').value,
			email: document.getElementById('email').value,
			clinicId: clinicId,
			jwt: this.props.user.jwt
		}

		let success = data => {
			console.log(data)
			route('/')
		}

		let err = errors => {
			this.setState({
				errors: errors,
				spinner: false
			})
		}

		addEmployee(employee).then(success).catch(err)
	}
}

const focus = errors => {
	if (errors.fname) {
		document.getElementById('fname').focus()
		return
	}

	if (errors.lname) {
		document.getElementById('lname').focus()
		return
	}

	if (errors.email) {
		document.getElementById('email').focus()
		return
	}
}

// object with validation methods
const inputValidator = {
	fname(errors, data) {
		if (!data) {
			return Object.assign(errors, { fname: 'Enter employee first name' })
		}
		return errors
	},
	lname(errors, data) {
		if (!data) {
			return Object.assign(errors, { lname: 'Enter employee last name' })
		}
		return errors
	},
	email(errors, data) {
		if (!data) {
			return Object.assign(errors, { email: 'Enter employee email' })
		}
		return errors
	}
}

const validateEmail = email => {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(email)
}
