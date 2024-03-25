import styles from "./button.module.css"

type Props = {
	text: string | JSX.Element
	onClick: () => void
	type?: "outline" | "primary"
	className?: string
	icon?: JSX.Element
}

export default function Button({ text, type = "primary", className, icon }: Props) {
	return <button className={`${styles.button} ${styles[type]} ${className}`}>{text}</button>
}
