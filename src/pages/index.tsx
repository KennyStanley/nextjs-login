import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'
import Link from 'next/link'
import cookie from 'js-cookie'

function Home() {
    const { data, revalidate } = useSWR('/api/me', async function (args: any) {
        const res = await fetch(args)
        return res.json()
    })
    if (!data) return <h1>Loading...</h1>
    let loggedIn = false
    if (data.email) {
        loggedIn = true
    }
    return (
        <div className="grid place-items-center h-screen bg-gray-900">
            <div className="bg-gray-300 rounded-lg p-8">
                <Head>
                    <title>Welcome to the landing page</title>
                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>
                <div className="mb-8 text-4xl text-center">
                    <h1>Simple login</h1>

                    <h2>Using Next.js and Mongodb</h2>
                </div>
                <div className="flex flex-col h-40 items-center justify-center">
                    {loggedIn && (
                        <>
                            <p className="text-2xl">Welcome {data.email}!</p>
                            <button
                                onClick={() => {
                                    cookie.remove('token')
                                    revalidate()
                                }}
                                className="bg-red-600 px-5 py-2 mt-10 rounded text-white text-xl w-full"
                            >
                                Logout
                            </button>
                        </>
                    )}
                    {!loggedIn && (
                        <>
                            <Link href="/login">
                                <button className="bg-blue-600 px-5 py-2 mb-5 rounded text-white text-xl w-full">
                                    Login
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="bg-green-600 px-5 py-2 rounded text-white text-xl w-full">
                                    Sign Up
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
