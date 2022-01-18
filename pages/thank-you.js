import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import Header from '../components/Header'

const ThankYou = () => {
    return (
        <>
            <Head>
                <title>Edison Meet</title>
                <meta name="description" content="ZOOM Meeting SDK" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <div className="flex h-full flex-col items-center justify-center w-full">
                <div className="flex h-[60vh] flex-col items-center justify-center w-full">
                    <div className="m-auto">
                        <h1 className='text-9xl'>Thank You</h1>
                    </div>
                    <div className="m-auto">
                        <Link href="/">
                            <a className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Back to home</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ThankYou
