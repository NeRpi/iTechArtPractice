import Button from "@/lib/button"
import styles from "./features-card.module.css"
import Image from "next/image"

type Props = {
	icon: string
	title: string
	text: string
	color: string
	learnMore?: () => void
}

export default function FeaturesCard({ icon, title, text, color, learnMore }: Props) {
	return (
		<div className={styles.container}>
			<div className={styles.icon}>
				<Image src={icon} fill alt="Feature" />
			</div>
			<div className={styles.content} style={{ background: `linear-gradient(180deg, ${color} 100%)` }}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.text}>{text}</p>
				{learnMore && <Button text="Lear More" onClick={learnMore} />}
			</div>
		</div>
	)
}
