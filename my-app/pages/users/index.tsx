import Link from 'next/link'
import styles from '@/styles/Home.module.scss'
import { GetStaticProps } from 'next'

type UsersProps = {
    users: {
        map: any
        id: number
        name: string
        email: string
    }
}

const Users = ({ users }: UsersProps) => {
    return(
        <div>
            <h1>
                Title for users
            </h1>
            {users.map((user: any) => {
                return <div key={user.id}>
                    <Link className={styles.home} href={`/users/${user.id}`} passHref>
                        <p>{user.id} {user.name} {user.email}</p>
                    </Link>
                </div>
            })}
        </div>
    )
}
export default Users

export const getStaticProps: GetStaticProps = async () => {
    console.log("generate / re-generate")
    const response = await fetch("http://localhost:4000/users")
    const data = await response.json()
    return {
        props: {
            users: data
        },
        revalidate: 10,
    }
}