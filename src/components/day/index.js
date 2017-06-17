import { h, Component } from "preact"
import style from "./style"

export default class Day extends Component {
	constructor() {
		super()

		this.state = {
		}

		this.handleEditHours = this.handleEditHours.bind(this)
	}

	render({name}, {}) {
		return (
			<div>
				<span class={style.field}>{name}: </span>
				<select name="select">
					<option value="7">7</option>
					<option value="8" selected>8</option>
					<option value="9">9</option>
				</select>
							<span> - </span>
					<select name="select">
						<option value="11">11</option>
						<option value="12" selected>12</option>
						<option value="13">13</option>
					</select>
				<span>, </span>
					<select name="select">
						<option value="12">12</option>
						<option value="13" selected>13</option>
						<option value="14">14</option>
					</select>
				<span> - </span>
					<select name="select">
						<option value="14">14</option>
						<option value="15" selected>15</option>
						<option value="16">16</option>
					</select>
				<span>, </span>
					<select name="select">
						<option value="15">15</option>
						<option value="15:30" selected>15:30</option>
						<option value="16">16</option>
					</select>
				<span> - </span>
					<select name="select">
						<option value="18">18</option>
						<option value="19" selected>19</option>
						<option value="20">20</option>
					</select>
			</div>
		)
	}

	handleEditHours(event) {
		console.log("click")
		event.preventDefault()

		this.setState({
			editHours: true
		})
	}
}

