import { h, Component } from "preact"
import style from "./style"
import IconEdit from "../../routes/icons/edit"
import Day from "../day"

export default class OperatingHours extends Component {
	constructor() {
		super()

		this.state = {}
	}

	render({ clinicId }, {}) {
		const clinicUrl = `/clinic/${clinicId}/hours`

		let content = (
			<div>
				<a href={clinicUrl}>
					<IconEdit size="24" class={style.edit} />
				</a>
				<section class={style.section}>
					<div>
						<span class={style.field}>Mon:</span> <span>8-12</span>
						<span>, 13-15</span><span>, 15:30-19</span>
					</div>
					<div>
						<span class={style.field}>Tue:</span> <span>8-12</span>
						<span>, 13-15</span>
					</div>
					<div>
						<span class={style.field}>Wed:</span> <span>8-12</span>
						<span>, 13-15</span>
					</div>
					<div>
						<span class={style.field}>Thu:</span> <span>8-12</span>
						<span>, 13-15</span><span>, 15:30-19</span>
					</div>
					<div>
						<span class={style.field}>Fri:</span> <span>8-12</span>
						<span>, 13-15</span>
					</div>
					<div>
						<span class={style.field}>Sat:</span> <span>8-12</span>
					</div>
					<div>
						<span class={style.field}>Sun:</span> <span>Close</span>
					</div>
				</section>
			</div>
		)

		return (
			<div>
				<h3 class={style.h3}>Operating Hours</h3>
				{content}
			</div>
		)
	}
}
