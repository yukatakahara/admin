import { h, Component } from 'preact'
import style from './style'
import { getLocation } from '../../lib/location'
import { getDoctors } from './api'

export default class Profile extends Component {
	state = {
		count: 0,
		clinics: []
	}

	componentDidMount() {
		let successDoc = data => {
			this.setState({
				clinics: data
			})
		}

		let errDoc = data => {
			console.log(data)
			this.setState({
				clinics: []
			})
		}

		// getLocation().then(getDoctors).then(successDoc).catch(errDoc);
		getDoctors({ lat: '1', lon: '1' }).then(successDoc).catch(errDoc)
	}

	render({user}) {
		if (user.jwt) {
		} else {
			return
		}

		let clinics = this.state.clinics

		return (
			<div class={style.home}>
				<div class={style.createClinic}>
				<a href="/clinic/new">Create Clinic</a>
				</div>

				<h1>Clinics</h1>
				{clinics.map(clinic => {
					return (
						<section>
							<a href="/clinic/1">{clinic.name}</a>
							{' '}
							{' '}
						</section>
					)
				})}
			</div>
		)
	}
}
