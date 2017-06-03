/*global API_HOST*/

import { h, Component } from 'preact'
import { route } from 'preact-router'

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
			// TODO: submit a bug
			// route('/')
			return
		}

		// const clinicId = window.location.pathname.substring(8)

		// TODO: get all clinic info and employees based on clinic id
		// TODO: what if clinic is not found? go home
		// getClinic({ lat: '1', lon: '1', jwt: this.state.user.jwt }).then(successDoc).catch(errDoc)

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
