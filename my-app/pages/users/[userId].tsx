import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.scss'
import { GetStaticPaths, GetStaticProps } from 'next'

type UserProps = {
    user: {
        id: number
        name: string
        email: string
    }
}

const User = ({ user }: UserProps) => {
    const router = useRouter()

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }
    return (
        <div key={user.id}>
            <Link href="/users">Return back</Link>
            <p className={styles.home}>{user.id} {user.name} {user.email}</p>
        </div>
    )
}
export default User

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch("http://localhost:4000/users")
    const data = await response.json()

    const paths = data.map((user: any) => {
        return {
            params: {
                userId: `${user.id}`,
            }
        }
    })
    return {
        paths: [
            {
                params: {userId: "1"},
            },
            {
                params: {userId: "2"},
            },
            {
                params: {userId: "3"},
            },
    ], fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context: any) => {
    console.log("generate / re-generate")
    const {params} = context
    const response = await fetch(`http://localhost:4000/users/${params.userId}`)
    const data = await response.json()

    return {
        props: {
            user: data
        },
        revalidate: 10,
    }
}