"use client"
import { useHomeSocket } from "@/hooks/socket/useHomeSocket"
import Landing from "@/modules/landing/landing"

export default function Home() {
	const { onSearch } = useHomeSocket()

	return (
		<main className="">
			<div className="">
				{/* <button onClick={onSearch}>Start game</button> */}
				<Landing />
			</div>
		</main>
	)
}
