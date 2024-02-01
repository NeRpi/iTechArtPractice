import Board from "@/components/game/board"
import styles from "./game.module.css"

export default function Game() {
	return (
		<div className={styles.container}>
			<Board />
		</div>
	)
}
