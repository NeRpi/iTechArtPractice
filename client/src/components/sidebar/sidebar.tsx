"use client"
import { useState } from "react"
import Image from "next/image"
import { sidebarData } from "@/helpers/sidebar/sidebar-data"
import styles from "./sidebar.module.css"

export default function Sidebar() {
	const [scrollMenu, setScrollMenu] = useState("")

	return (
		<div className={styles.sidebar}>
			<div className={styles.logo}>
				<Image src="/landing/logo.png" fill alt="Logo" />
			</div>
			<div className={styles.icons}>
				{sidebarData.map((s, idx) => (
					<button key={idx} className={styles.menuItem} onClick={() => setScrollMenu(s.style)}>
						<div className={styles.icon}>
							<Image src={s.icon} fill alt={s.icon} objectFit="contain" />
						</div>
					</button>
				))}
			</div>
			<div className={`${styles.scrollMenu} ${styles[scrollMenu]}`} />
		</div>
	)
}
