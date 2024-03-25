import Sidebar from "@/components/sidebar/sidebar"
import styles from "./layout.module.css"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className={styles.layout}>
			<Sidebar />
			{children}
		</div>
	)
}
