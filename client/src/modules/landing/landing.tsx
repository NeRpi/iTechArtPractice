import Image from "next/image"
import styles from "./landing.module.css"
import Button from "@/lib/button"
import FeaturesCard from "@/components/landing/features-card"
import { featuresData } from "@/helpers/landing/features-data"

export default function Landing() {
	return (
		<div className={styles.container}>
			<section className={styles.mainSection}>
				<div className={styles.logo}>
					<div className={styles.logoWrapper}>
						<Image src="/landing/logo.png" width={60} height={80} alt="Logo" />
					</div>
					<div className={styles.logoText}>
						<p className={styles.logoChess}>Chess</p>
						<p className={styles.logoWelcome}>—— WELCOME</p>
					</div>
				</div>
				<div className={styles.purpleEllipse} />
				<div className={styles.blueEllipse} />
				<div className={styles.leftSide}>
					<div className={styles.leftSideContent}>
						<h1 className={styles.mainText}>
							<div className={styles.gradientText}>Chess </div>
							{`is everything: \nart, science, and sport`}
						</h1>
						<span className={styles.text}>Play, compete with friends, have fun!</span>
						<div className={styles.buttons}>
							<Button text={"Play"} onClick={() => null} />
							<Button text={"Lear More"} onClick={() => null} type="outline" />
						</div>
					</div>
				</div>
				<div className={styles.rightSide}>
					<div className={styles.imageWrapper}>
						<Image src={"/landing/landing-figure.png"} fill alt="Main Cheese" objectFit="contain" />
					</div>
				</div>
			</section>
			<section className={styles.featuresSection}>
				<h2 className={styles.featuresTitle}>What features are there on this site?</h2>
				<div className={styles.features}>
					{featuresData.map((feature, idx) => (
						<FeaturesCard key={idx} {...feature} />
					))}
				</div>
			</section>
			<section className={styles.trackingSection}>
				<div className={styles.leftSide}>
					<h2 className={styles.trackSectionTitle}>
						The site provides the ability to <div className={styles.gradientText}>track your account statistics.</div>
					</h2>
					<span className={styles.trackSectionText}>For participating in games you are awarded points. Win and get on the leaderboard and increase your rank!</span>
					<Button text="Try Now" onClick={() => null} type="outline" />
				</div>
				<div className={styles.rightSide}>
					<div className={styles.imageWrapper}>
						<Image src="/landing/tracking.png" fill alt="Tracking" objectFit="contain" />
					</div>
				</div>
			</section>
			<section className={styles.studySection}>
				<span className={styles.friendText}>
					Play with your friends. Compete in private rooms and find out which of you is the coolest, or try the system of selecting random opponents with the same rank.
				</span>
				<div className={styles.rightSide}>
					<div className={styles.imageWrapper}>
						<Image src="/landing/study.png" fill alt="Tracking" objectFit="contain" />
					</div>
				</div>
				<span className={styles.studyText}>It is possible to create study groups. We provide you with convenient functionality for teaching students, demonstrating games and giving homework.</span>
			</section>
		</div>
	)
}
