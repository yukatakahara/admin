/*global API_HOST*/

function addClinic() {
	return new Promise((resolve, reject) => {
		const body = JSON.stringify(
			{"email": email, "password": password}
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

		this.setState({ spinner: true })

		fetch(`${API_HOST}/addClinic`, request)
			.then(res => {
				this.setState({ spinner: false })
				if (res.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' + res.status
					)
					console.log(res)

					this.setState({ errors: { api: 'Failed to register' } })
					return
				}

				res.json().then(data => {
					const t1 = performance.now();
					console.log("Login call took " + (t1 - t0) + " milliseconds.")

					localStorage.setItem('jwt', data.jwt)
					localStorage.setItem('registered', true)
					this.props.onRegister({ user: { jwt: data.jwt } })
					route('/')
					return
				})
			})
			.catch(err => {
				this.setState({ errors: { api: 'failed to register' }, spinner: false })
			})
	})
}

export { addClinic }
