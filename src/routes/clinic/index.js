/*global API_HOST*/

import { h, Component } from "preact"
import { route } from "preact-router"
import { getClinic } from "./api"

import style from "./style"

export default class Register extends Component {
	constructor() {
		super()

		this.state = {
			/** Contains any validation errors */
			user: { jwt: "" },
			errors: { email: "" },
			clinic: { employees: [] }
		}
	}

	componentDidMount() {
		let jwt = localStorage.getItem("jwt")
		let registered = localStorage.getItem("registered")

		// user is not logged in
		if (!jwt) {
			route("/")
			return
		}

		const clinicId = window.location.pathname.substring(8)

		let successDoc = data => {
			data.employees = data.employees || []
			this.setState({
				user: { jwt: jwt },
				clinic: data
			})
		}

		let errDoc = err => {
			console.log(err.message)
			route("/")
		}

		getClinic({ jwt, clinicId }).then(successDoc).catch(errDoc)
	}

	render({}, { user, errors, clinic }) {
		if (!user.jwt) {
			return
		}

		const addEmployeeURL = `/clinic/${clinic.id}/employees/new`

		return (
			<div class={style.clinic}>
				<h1>Clinic page</h1>
				<section class={style.section}>
					<div>
						<span class={style.field}>Name:</span> <span>{clinic.name}</span>
					</div>
					<div>
						<span class={style.field}>Address1:</span> <span>{clinic.address1}</span>
					</div>
				</section>

				<div class={style.addEmployee}>
					<a href={addEmployeeURL}>Add Employee</a>

					{clinic.employees.length !== 0 && <h3>Employees:</h3>}

					{clinic.employees.map(employee => {
						return (
							<section class={style.section}>
								<div>
									<span class={style.field}>First Name:</span> <span>{employee.fname}</span>
								</div>
								<div>
									<span class={style.field}>Last Name:</span> <span>{employee.lname}</span>
								</div>
								<div>
									<span class={style.field}>Email:</span> <span>{employee.email}</span>
								</div>
							</section>
						)
					})}

				</div>
			</div>
		)
	}
}
