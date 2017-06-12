const IconClock = ({ size = 24, ...props }) =>
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		{...props}
		fill="none"
		stroke="#000"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<circle cx="12" cy="12" r="10" />
		<polyline points="12 6 12 12 15 15" />
	</svg>

export default IconClock
