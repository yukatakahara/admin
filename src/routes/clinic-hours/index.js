import { h, Component } from "preact"
import style from "./style"
import Range from "rc-slider/lib/Range"
import "rc-slider/assets/index.css"
import IconMinus from "../icons/minus"

function log(value) {
	console.log(value) //eslint-disable-line
}

export default class ClinicHours extends Component {
	render() {
		return (
			<div class={style.home}>
				<Sliders day="Monday"/>
				<Sliders day="Tuesday"/>
				<Sliders day="Wednesday"/>
				<Sliders day="Thursday"/>
				<Sliders day="Friday"/>
				<Sliders day="Saturday"/>
				<Sliders day="Sunday"/>
			</div>
		)
	}
}

class Sliders extends Component {
	constructor(props) {
		super(props)
		this.state = {
			min: 0,
			max: 23,
      slot1: {from: 8, to: 12},
      slot2: {from: 13, to: 15},
      slot3: {from: 16, to: 20},
		}
	}

  componentDidMount() {
  }

	onSlider1Change = value => {
		this.setState({ slot1: {from: value[0], to: value[1]} })
	}

	onSlider2Change = value => {
		this.setState({ slot2: {from: value[0], to: value[1]} })
	}

	onSlider3Change = value => {
		this.setState({ slot3: {from: value[0], to: value[1]} })
	}

	render() {
		return (
			<div class={style.slider}>
        <div class={style.summary}>
          <h2>{this.props.day}</h2>
          <span>{addAmOrPm(this.state.slot1.from)}-</span>
          <span class={style.time}>{addAmOrPm(this.state.slot1.to)},</span>

          <span>{addAmOrPm(this.state.slot2.from)}-</span>
          <span class={style.time}>{addAmOrPm(this.state.slot2.to)},</span>

          <span>{addAmOrPm(this.state.slot3.from)}-</span>
          <span>{addAmOrPm(this.state.slot3.to)}</span>
        </div>

        <div class={style.ranges}>
          <Range
            defaultValue={[this.state.slot1.from, this.state.slot1.to]}
            min={this.state.min}
            max={this.state.max}
            onChange={this.onSlider1Change}
            pushable
            allowCross={false}
            marks={{0: "12am", 8: "8am", 16: "4pm", 23: "11pm"}}
            class={style.range}
          />
          <br /><br />
          <Range
            defaultValue={[this.state.slot2.from, this.state.slot2.to]}
            min={this.state.min}
            max={this.state.max}
            onChange={this.onSlider2Change}
            pushable
            allowCross={false}
            marks={{0: "12am", 8: "8am", 16: "4pm", 23: "11pm"}}
            class={style.range}
          />
          <br /><br />
          <Range
            class={style.range}
            defaultValue={[this.state.slot3.from, this.state.slot3.to]}
            min={this.state.min}
            max={this.state.max}
            onChange={this.onSlider3Change}
            pushable
            allowCross={false}
            marks={{0: "12am", 8: "8am", 16: "4pm", 23: "11pm"}}
            class={style.range}
          />
          <div class={style.action}><IconMinus size="24" class={style.minus} /></div>
        <div class={style.clear}></div>
        </div>

			</div>
		)
	}
}

const addAmOrPm = (time) => {
  if(Number(time) > 11) {

  if(Number(time) > 12) {time = time - 12}

    return `${time}pm`
  }

  if(Number(time) === 0) {time=12}
  return `${time}am`
};
