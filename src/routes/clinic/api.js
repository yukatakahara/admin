/*global API_HOST*/

function getClinic(options) {
	console.log("options", options)
	return new Promise((resolve, reject) => {
		const request = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + options.jwt
			},
		}

    const API_HOST = process.env.NODE_ENV === 'production' ? 'https://api.healthcobot.com' : 'http://localhost:3000'

		fetch(`${API_HOST}/clinic/${options.clinicId}`, request)
			.then(res => {
				if (res.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' + res.status
					)
					resolve()
					return
				}

				res.json().then(data => {
					resolve(data)
				})
			})
			.catch(err => reject())
	})
}

export { getClinic }
