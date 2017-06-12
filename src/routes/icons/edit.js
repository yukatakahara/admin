const IconEdit = ({ size = 24, ...props }) =>
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="#333"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		{...props}
	>
		<path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/>
		<polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/>
	</svg>

export default IconEdit
