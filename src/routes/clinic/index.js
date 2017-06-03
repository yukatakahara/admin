/*global API_HOST*/

import { h, Component } from 'preact'
import { route } from 'preact-router'

import style from './style'

export default class Register extends Component {
	constructor() {
		super()



		this.state = {
			/** Contains any validation errors */
			errors: { email: '' },
			clinic: {}
		}

	}

	componentDidMount() {
		// TODO: get clinic id from URL
		// get all clinic info and employees based on clinic id
		// this.state.clinic = getClinic(12)
		this.state.clinic = {id: 21, name: "foobar"}
	}

	render({}, { errors, clinic }) {
		// const clinic = window.clinic
		// if no clinic, get it from the server

		return (
			<div class={style.register}>
				<h1>Clinic page</h1>
				<p>{clinic.name}</p>
			</div>
		)
	}
}
