import Cell from "./cell"
import styles from "./board.module.css"

export default function Board() {
	const cells = Array.from(new Array(64), () => "Bishop")

	return (
		<div className={styles.container}>
			<div className={styles.board}>
				{cells.map((cell, idx) => (
					<Cell key={idx} isGrey={((idx + Math.trunc(idx / 8)) & 1) === 1} figure={cell} />
				))}
			</div>
		</div>
	)
}
