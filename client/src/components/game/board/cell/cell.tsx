import styles from "./cell.module.css"

type Props = {
	isGrey: boolean
	figure?: string
}

export default function Cell({ isGrey, figure }: Props) {
	return <div className={`${styles.container} ${isGrey ? styles.grey : ""}`}>{figure}</div>
}
