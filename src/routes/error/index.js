import { h, Component } from "preact"
import { route } from "preact-router"

import style from "./style"

export default function Error() {
	setTimeout(() => {
		route("/")
	}, 0)

	return <div />
}
