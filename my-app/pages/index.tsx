import Link from 'next/link'
//import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.home}>My first page</h1>
        <Link href="/users">Go to Users</Link>
      </main>
    </div>
  )
}
