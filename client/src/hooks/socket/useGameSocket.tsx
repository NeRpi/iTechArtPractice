import { useEffect, useState } from "react"
import { gameSocket, socket } from "@/utils/socket.util"
import { Move } from "@/types/game/game"
import { useParams } from "next/navigation"

export type MovesType = { [key: string]: number[] }
type StateChangeType = { fen: string; moves: MovesType }

export function useGameSocket() {
	const [moves, setMoves] = useState<MovesType>({ "": [] })
	const [fen, setFen] = useState("")

	const { id } = useParams()

	useEffect(() => {
		gameSocket.emit("game:run", { gameId: id })

		gameSocket.on("game:change:state", ({ fen, moves }: StateChangeType) => {
			setFen(fen)
			setMoves(moves)
		})

		return () => {
			gameSocket.off("game:change:state")
		}
	}, [id])

	const handleMove = (move: Move) => {
		gameSocket.emit("game:make:move", { move })
	}

	return { fen, moves, handleMove }
}
