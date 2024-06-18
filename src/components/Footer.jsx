import styles from '@/styles/Footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section>
        <p className={styles.ftLogo}>
          <Link href={'/'}>AllFood</Link>
        </p>
        <p>Copyright © Minsun Park 2024. All rights reserved.</p>
      </section>
    </footer>
  )
}
