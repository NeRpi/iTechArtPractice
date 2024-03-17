import { gameSocket } from "@/utils/socket.util"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function useHomeSocket() {
	const router = useRouter()

	useEffect(() => {
		gameSocket.on("game:start", ({ id }: { id: string }) => {
			router.push(`/game/${id}`)
		})

		return () => {
			gameSocket.off("game:start")
		}
	}, [router])

	const onSearch = () => {
		gameSocket.emit("game:search")
	}

	return { onSearch }
}
