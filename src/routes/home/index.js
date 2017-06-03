import { h, Component } from 'preact'
import style from './style'
import { getLocation } from '../../lib/location'
import { getDoctors } from './api'

export default class Profile extends Component {
	constructor() {
		super()

		this.clickClinic = this.clickClinic.bind(this)

		this.state = {
			count: 0,
			clinics: [],
			user: { jwt: '' }
		}
	}

	componentDidMount() {
		// check localStorage for jwt (user logged-in)
		let jwt = localStorage.getItem('jwt')
		let registered = localStorage.getItem('registered')

		// user is not logged in - don't show anything
		if (!jwt) {
			this.state.user.jwt = ''
			return
		}

		// show success message if we just registered (not all the time)
		this.state.user.jwt = jwt

		let successDoc = data => {
			this.setState({
				clinics: data
			})
			window.clinics = data;
		}

		let errDoc = data => {
			console.log(data)
			this.setState({
				clinics: []
			})

		}

		// getLocation().then(getDoctors).then(successDoc).catch(errDoc);
		getDoctors({ lat: '1', lon: '1', jwt: this.state.user.jwt }).then(successDoc).catch(errDoc)
	}

	render({user}, {clinics}) {
		if (!user.jwt) {
			return
		}

		return (
			<div class={style.home}>
				<div class={style.createClinic}>
				<a href="/clinic/new">Create Clinic</a>
				</div>

				<h1>Clinics</h1>
				{clinics.map(clinic => {
					return (
						<section>
							<a href={"/clinic/" + slugify(clinic.name)} onClick={this.clickClinic} data-clinic-id="12">{clinic.name}</a>
							{' '}
							{' '}
						</section>
					)
				})}
			</div>
		)
	}

	clickClinic(event) {
		event.preventDefault()
		console.log('foo', event.target.dataset.clinicId)
		window.clinic=event.target.dataset.clinicId
		return;
		// window.clinic =
	}
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
