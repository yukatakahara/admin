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
			clinic: {employees: []},
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


		let successDoc = data => {
			data.employees = data.employees || []
			this.setState({
				user: {jwt: jwt},
				clinic: data
			})
		}

		let errDoc = err => {
			console.log(err.message)
			route('/')
		}

		getClinic({ jwt, clinicId }).then(successDoc).catch(errDoc)
	}

	render({}, { user, errors, clinic}) {
		if (!user.jwt) {
			return
		}

		const addEmployeeURL = `/clinic/${clinic.id}/employees/new`

		return (
			<div class={style.clinic}>
				<h1>Clinic page</h1>
				<div class={style.section}>
					<label>Name:</label>
					<p>{clinic.name}</p>
					<label>Address1:</label>
					<p>{clinic.address1}</p>
				</div>
				<br/>

				{clinic.employees.length !== 0 &&
					<h3>Employees:</h3>
				}

				{clinic.employees.map(employee => {
					return (
						<section class={style.section}>
							<p>{employee.fname}</p>
							<p>{employee.email}</p>
						</section>
					)
				})}

				<div class={style.addEmployee}>
				<a href={addEmployeeURL}>Add Employee</a>
				</div>
			</div>
		)
	}
}
