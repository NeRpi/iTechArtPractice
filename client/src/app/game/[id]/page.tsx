"use client"
import { useGameSocket } from "@/hooks/socket/useGameSocket"
import Board from "@/components/game/board"
import styles from "./game.module.css"

export default function Game() {
	const { handleMove, fen, moves } = useGameSocket()

	return (
		<div className={styles.container}>
			<Board fen={fen} moves={moves} handleMove={handleMove} />
		</div>
	)
}
