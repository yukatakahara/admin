/*global API_HOST*/

function addEmployee(employee) {
	return new Promise((resolve, reject) => {
		const body = JSON.stringify({
			fname: employee.fname,
			lname: employee.lname,
			email: employee.email,
			clinic_id: employee.clinicId
		})

		const request = {
			mode: "cors",
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + employee.jwt
			},
			body
		}

		const t0 = performance.now()

		const API_HOST = process.env.NODE_ENV === "production"
			? "https://api.healthcobot.com"
			: "http://localhost:3000"

		fetch(`${API_HOST}/clinics/${employee.clinicId}/employees`, request)
			.then(res => {
				if (res.status !== 200) {
					console.error(
						"Looks like there was a problem. Status Code: " + res.status
					)
					console.log(res)

					reject({ api: "Failed to create an employee" })
					return
				}

				res.json().then(data => {
					const t1 = performance.now()
					console.log("Login call took " + (t1 - t0) + " milliseconds.")

					resolve({ message: "success" })
					// route('/')
					return
				})
			})
			.catch(err => {
				console.error(err)
				reject({ api: "Failed to create an employee" })
			})
	})
}

export { addEmployee }
