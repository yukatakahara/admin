import { h, Component } from 'preact'
import { Router } from 'preact-router'
import localStorage from '../lib/storage';

import Header from './header'
import Home from '../routes/home'
import Login from '../routes/login'
import Clinic from '../routes/clinic'
import CreateClinic from '../routes/create-clinic'
import AddEmployee from '../routes/add-employee'

export default class App extends Component {
	constructor() {
		super()

		this.state = {
			/** Contains the user object */
			user: { jwt: '' }
		}
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url
	}

	componentWillMount() {
		// check localStorage for jwt (user logged-in)
		let jwt = localStorage.getItem('jwt')
		let registered = localStorage.getItem('registered')

		if (jwt) {
			// show success message if we just registered (not all the time)
			this.state.user.jwt = jwt
			return
		}

		this.state.user.jwt = ''
	}

	setUser = user => this.setState(user)

	render({}, { user }) {
		return (
			<div id="app">
				<Header user={user} onLogout={this.setUser} />
				<Router onChange={this.handleRoute}>
					<Home path="/" user={user} />
					<Login path="/login" onRegister={this.setUser} />
					<CreateClinic path="/clinic/new" user={user} />
					<AddEmployee path="/employee/new" user={user} />
					<Clinic path="/clinic/:id" />
				</Router>
			</div>
		)
	}
}

