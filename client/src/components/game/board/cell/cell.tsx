import styles from "./cell.module.css"

type Props = {
	isMoving?: boolean
	isGrey?: boolean
	figure?: string
	onClick: () => void
}

export default function Cell({ isGrey = false, isMoving = false, onClick, figure }: Props) {
	return (
		<div onClick={onClick} className={`${styles.container} ${isGrey ? styles.grey : ""}`}>
			{isMoving && "M"}
			{figure}
		</div>
	)
}
