/*global API_HOST*/

function getDoctors(crd) {
	return new Promise((resolve, reject) => {
		const request = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + crd.jwt
			},
		}

    const API_HOST = process.env.NODE_ENV === 'production' ? 'https://api.healthcobot.com' : 'http://localhost:3000'

		fetch(`${API_HOST}/clinics?lat=${crd.latitude}&lon=${crd.longitude}`, request)
			.then(res => {
				if (res.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' + res.status
					)
					resolve([])
					return
				}

				// TODO: get the clinic id as well
				// we need it so we can pass it to the /clinic page
				// the /clinic page will fetch more info like employees
				res.json().then(data => {
					let clinics = data.map(clinic => {
						return { name: clinic.name, price: clinic.price }
					})
					resolve(clinics)
				})
			})
			.catch(err => resolve([]))
	})
}

export { getDoctors }
