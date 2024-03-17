import { Cell } from "@/types/game/game"

const allCastlings = ["K", "Q", "k", "q"]

export default class FenParser {
	static getByFen(fen: string): string[] {
		const [field, side, castlings, enpassant, halfMove, fullMove] = fen.split(" ")

		const pieces: string[] = field.split("/")
		let result = Array.from(new Array(64), () => "")

		let x = 0
		for (const row of pieces) {
			let y = 0
			for (const figure of row) {
				if (!isNaN(+figure)) {
					y += +figure
				} else {
					result[x * 8 + y] = figure
					y++
				}
			}
			x++
		}
		return result
	}
}

