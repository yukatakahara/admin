import { h, Component } from 'preact'
import { Link } from 'preact-router'
import style from './style'

export default class Header extends Component {
	constructor() {
		super()

		this.handleLogoutClick = this.handleLogoutClick.bind(this)
	}

	render({ user, onLogout }) {
		let link = null
		let link2 = null

		if (user.jwt) {
			link = <a href="#" onClick={this.handleLogoutClick}>LOG OUT</a>
		} else {
			link2 = <Link href="/login">LOG IN</Link>
		}

		return (
			<header class={style.header}>
				<h1><Link href="/" class={style.title}>Admin</Link></h1>
				<nav>
					{link}
					{link2}
				</nav>
			</header>
		)
	}

	handleLogoutClick(event) {
		event.preventDefault()
		localStorage.removeItem('jwt')
		this.props.onLogout({ user: { jwt: '' } })
	}
}
