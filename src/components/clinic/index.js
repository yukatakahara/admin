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

	}

	componentDidMount() {
	}

	render({ onRegister }, { errors }) {
		return (
			<div class={style.register}>
				<h1>Clinic page</h1>
				<p> Novena Medical Center Singapore </p>
			</div>
		)
	}
}
