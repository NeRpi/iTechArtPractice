import styles from "./action-card.module.css"

type Props = {
	icon: string
	title: string
}

export default function ActionCard() {
	return <div className={styles.actionCard}></div>
}
