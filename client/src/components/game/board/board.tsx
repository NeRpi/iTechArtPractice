import { useState } from "react"
import { Move } from "@/types/game/game"
import { MovesType } from "@/hooks/socket/useGameSocket"
import FenParser from "@/utils/FenParser"
import Cell from "./cell"
import styles from "./board.module.css"

type Props = {
	fen: string
	moves: MovesType
	handleMove: (move: Move) => void
}

export default function Board({ fen, moves, handleMove }: Props) {
	const [selectCell, setSelectCell] = useState<number>()
	const [cellsMoving, setCellsMoving] = useState(Array.from(new Array(64), () => false))
	const cells = FenParser.getByFen(fen)

	const cellHandleClick = (idx: number) => {
		if (cellsMoving[idx] && selectCell) {
			handleMove({
				fromX: Math.floor(selectCell / 8),
				fromY: selectCell % 8,
				toX: Math.floor(idx / 8),
				toY: idx % 8
			})
			setCellsMoving(Array.from(new Array(64), () => false))
		} else {
			setCellsMoving(() => {
				const cell = String.fromCharCode((idx % 8) + 97) + Math.floor(idx / 8 + 1)
				console.log(cell)
				const cells = Array.from(new Array(64), () => false)
				moves[cell]?.map((c) => (cells[c] = true))
				return cells
			})
			setSelectCell(idx)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.frame}>
				<div className={styles.board}>
					{cells.map((cell, idx) => (
						<Cell
							key={idx}
							isMoving={cellsMoving[idx]}
							isGrey={((idx + Math.trunc(idx / 8)) & 1) === 1}
							figure={cell}
							onClick={() => cellHandleClick(idx)}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
