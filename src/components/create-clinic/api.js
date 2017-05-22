/*global API_HOST*/

function addClinic(clinic) {
	return new Promise((resolve, reject) => {
		const body = JSON.stringify(
			{"name": clinic.name, "address1": clinic.addrress1}
		)

		const request = {
			mode: 'cors',
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body
		}

		const t0 = performance.now();

		// this.setState({ spinner: true })

		fetch(`${API_HOST}/addClinic`, request)
			.then(res => {
				// this.setState({ spinner: false })
				if (res.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' + res.status
					)
					console.log(res)

					reject({ api: 'Failed to create a clinic' })
					return
				}

				res.json().then(data => {
					const t1 = performance.now();
					console.log("Login call took " + (t1 - t0) + " milliseconds.")

					resolve({message: "success"})
					// route('/')
					return
				})
			})
			.catch(err => {
				reject({ api: 'Failed to create a clinic' })
			})
	})
}

export { addClinic }
