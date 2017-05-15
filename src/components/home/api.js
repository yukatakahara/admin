/*global API_HOST*/

function getDoctors(crd) {
	return new Promise((resolve, reject) => {
		fetch(`${API_HOST}/doctors?lat=${crd.latitude}&lon=${crd.longitude}`)
			.then(res => {
				if (res.status !== 200) {
					console.log(
						'Looks like there was a problem. Status Code: ' + res.status
					)
					resolve([])
				}

				res.json().then(data => {
					let clinics = data.Doctors.map(clinic => {
						return { name: clinic.name, price: clinic.price }
					})
					resolve(clinics)
				})
			})
			.catch(err => resolve([]))
	})
}

export { getDoctors }
