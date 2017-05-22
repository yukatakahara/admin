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

		fetch(`${API_HOST}/doctors?lat=${crd.latitude}&lon=${crd.longitude}`, request)
			.then(res => {
				if (res.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' + res.status
					)
					resolve([])
					return
				}

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
