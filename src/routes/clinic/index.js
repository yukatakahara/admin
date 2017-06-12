/*global API_HOST*/

import { h, Component } from "preact"
import { route } from "preact-router"
import { getClinic } from "./api"
import IconEdit from "../icons/edit"

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
					<div>
						<span class={style.field}>Address2:</span> <span>#07-05/06 CONNEXION</span>
					</div>
					<div>
						<span class={style.field}>Address City:</span> <span>Singapore</span>
					</div>
					<div>
						<span class={style.field}>Address Zip Code:</span> <span>217562</span>
					</div>
					<div>
						<span class={style.field}>Address Country:</span> <span>Singapore</span>
					</div>
					<div class={style.phone}>
						<span class={style.field}>Phone:</span> <span>+65 6511 9300</span>
					</div>
					<div>
						<span class={style.field}>Email:</span> <span>hello@nichii-icl.com</span>
					</div>
					<div>
						<span class={style.field}>Website:</span> <span>nichii-icl.com</span>
					</div>
					<div class={style.phone}>
						<span class={style.field}>Fee:</span> <span>$30.00</span>
					</div>
				</section>

				<h3 class={style.h3}>Operating Hours</h3>
				<IconEdit size="20" class={style.edit} />
				<section class={style.section}>
					<div>
						<span class={style.field}>Mon:</span> <span>8-12</span><span>, 13-15</span><span>, 15:30-19</span>
					</div>
					<div>
						<span class={style.field}>Tue:</span> <span>8-12</span><span>, 13-15</span>
					</div>
					<div>
						<span class={style.field}>Wed:</span> <span>8-12</span><span>, 13-15</span>
					</div>
					<div>
						<span class={style.field}>Thu:</span> <span>8-12</span><span>, 13-15</span><span>, 15:30-19</span>
					</div>
					<div>
						<span class={style.field}>Fri:</span> <span>8-12</span><span>, 13-15</span>
					</div>
					<div>
						<span class={style.field}>Sat:</span> <span>8-12</span>
					</div>
					<div>
						<span class={style.field}>Sun:</span> <span>Close</span>
					</div>
				</section>

				<h3 class={style.h3}>Auto-bid Defaults</h3>
				<section class={style.section}>
					<div>
						<span class={style.field}>Toggle:</span> <span>On</span>
					</div>
					<div>
						<span class={style.field}>Delay:</span> <span>1 hour</span>
					</div>
					<div>
						<span class={style.field}>Max Patients/Hour:</span> <span>1</span>
					</div>
				</section>

				<h3 class={style.h3}>Insurance</h3>
				<section class={style.section}>
					<div>
						<span>GE ClinicOne</span>
					</div>
					<div>
						<span>AIA</span>
					</div>
					<div>
						<span>Aviva Gold</span>
					</div>
				</section>

				<div class={style.addEmployee}>
					<a href={addEmployeeURL}>Add Employee</a>

					{clinic.employees.length !== 0 && <h3 class={style.h3}>Employees</h3>}

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
