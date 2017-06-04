/*global API_HOST*/

import { h, Component } from 'preact'
import { route } from 'preact-router'
import { getClinic } from './api'

import style from './style'

export default class Register extends Component {
	constructor() {
		super()

		this.state = {
			/** Contains any validation errors */
			user: { jwt: '' },
			errors: { email: '' },
			clinic: {},
			foo: ""
		}
	}

	componentDidMount() {
		let jwt = localStorage.getItem('jwt')
		let registered = localStorage.getItem('registered')

		// user is not logged in
		if (!jwt) {
			route('/')
			return
		}

		const clinicId = window.location.pathname.substring(8)


		// TODO: get all clinic info and employees based on clinic id
		// TODO: what if clinic is not found? go home
		console.log('before')
		getClinic({ jwt, clinicId }).then(successDoc).catch(errDoc)
		console.log('after')

		let successDoc = data => {
			console.log('data', data)
			this.setState({
				clinics: data
			})
		}

		let errDoc = data => {
			console.log("error", data)
			this.setState({
				clinics: []
			})
		}

		// this.state.clinic = getClinic(12)

		this.setState({user: {jwt: jwt}, clinic: {id: 21, name: "foobar"}})
	}

	render({}, { user, errors, clinic}) {
		if (!user.jwt) {
			return
		}

		return (
			<div class={style.register}>
				<h1>Clinic page</h1>
				<p>{clinic.name}</p>
			</div>
		)
	}
}
