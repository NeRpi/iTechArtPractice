import styles from "./figure.module.css"

type Props = {
	type: string
}

export default function Figure({ type }: Props) {
	return <div className={styles.container}>{type}</div>
}
