import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'
import Home from '../components/Home'
export default function Index() {
    return (
        <div className={styles.Container}>
            <Hero />
            <Home limit={4} />
        </div>
    )
}
