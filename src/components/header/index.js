import { h, Component } from "preact"
import { Link, route } from "preact-router"
import style from "./style"

export default class Header extends Component {
	constructor() {
		super()

		this.handleLogoutClick = this.handleLogoutClick.bind(this)
	}

	render({ user, onLogout }) {
		let link = null
		let link2 = null

		if (user.jwt) {
			link = (
				<span><a href="#" onClick={this.handleLogoutClick}>LOG OUT</a></span>
			)
		} else {
			link2 = <span><Link href="/login">LOG IN</Link></span>
		}

		return (
			<header class={style.header}>
				<h1><Link href="/" class={style.title}>Admin</Link></h1>
				<nav />
				<div class={style.navigation}>
					<span class={style.navItem}>Clinics</span>
					<span class={style.navItem}>Analytics</span>
					{link}
					{link2}
				</div>
				<hr />
			</header>
		)
	}

	handleLogoutClick(event) {
		event.preventDefault()
		localStorage.removeItem("jwt")
		this.props.onLogout({ user: { jwt: "" } })
		route("/")
	}
}
