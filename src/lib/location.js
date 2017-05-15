function getLocation() {
	return new Promise((resolve, reject) => {
		let options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		}

		function success(pos) {
			let crd = pos.coords
			resolve(crd)
		}

		function error(err) {
			reject(`ERROR(${err.code}): ${err.message}`)
		}

		navigator.geolocation.getCurrentPosition(success, error, options)
	})
}

export { getLocation }
