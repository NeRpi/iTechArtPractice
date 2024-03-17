export function getCellByIdx(idx: number) {
	return String.fromCharCode(Math.floor(idx / 8) + 97) + ((idx % 8) + 1)
}

export function getIdxByCell(cell: string) {
	return cell[0]
}
