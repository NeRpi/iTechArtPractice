class BoardFactory {
	side: boolean
	castling: boolean[]
	halfMove: number
	fullMove: number
	cells: string[]
	enpassant: string | null

	constructor() {
		this.cells = Array.from(new Array(64), () => "")
		this.side = false
		this.castling = [false, false]
		this.halfMove = 0
		this.fullMove = 0
		this.enpassant = ""
	}

	setCell(figure: string, x: number, y: number) {
		this.cells[x + y * 8] = figure
	}

	getCell(x: number, y: number) {
		return this.cells[x + y * 8]
	}
}
