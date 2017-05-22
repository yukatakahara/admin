/*global API_HOST*/

import { h, Component } from 'preact'
import { route } from 'preact-router'
import { addClinic } from './api'

import style from './style'

export default class AddClinic extends Component {
	constructor() {
		super()

		this.state = {
			/** Contains any validation errors */
			errors: { name: '' }
		}

		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		// TODO: autofocus only works on refresh. why?
		document.getElementById('name').focus()
	}

	render({user}, { errors }) {
		if (!user.jwt) {
			return
		}

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
						type="text"
						name="address1"
						id="address1"
						data-validate="address1"
					/>
					<label class={style.invalid}>{errors.address1}</label>
					<br />
					<br />

					<button class={style.button}>LOG IN</button>
					<label class={style.invalid + ' ' + style.apiError}>{errors.api}</label>
					{this.state.spinner &&
						<div class={style.loader}></div>
					}
					<div class={style.clear}></div>
				</form>
			</div>
		)
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
			name: document.getElementById('name').value,
			address1: document.getElementById('address1').value,
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

		addClinic(clinic).then(success).catch(err)
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
