"use client"
import { useHomeSocket } from "@/hooks/socket/useHomeSocket"

export default function Home() {
	const { onSearch } = useHomeSocket()

	return (
		<main className="">
			<div className="">
				<button onClick={onSearch}>Start game</button>
			</div>
		</main>
	)
}
