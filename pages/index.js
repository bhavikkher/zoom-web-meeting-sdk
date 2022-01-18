import React from 'react';
import Head from 'next/head'

import Header from '../components/Header'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()
  const [formData, setFormData] = React.useState({
    fullname: "Tony Stark",
    username: "Tony Stark",
    email: "Tony.Stark@mail.com",
    password: "abcd1234",
    meetingId: "81811304265",
    role: 0,
  });
  const handleFormChange = (e) => {
    const [name, value] = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = () => {
    router.push({
      pathname: `/meeting`,
      query: { mn: formData.meetingId, name: formData.fullname, pwd: formData.password, email: formData.email }
    });
  }
  return (
    <>
      <Head>
        <title>Edison Meet</title>
        <meta name="description" content="ZOOM Meeting SDK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <section className='w-11/12 h-[84vh] mx-auto flex items-center justify-center'>
        <div className="bg-white flex flex-col p-8 relative rounded-lg shadow-md w-6/12">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Join Meeting
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Fill the below details
          </p>
          <div className="relative mb-4">
            <label
              htmlFor="fullname"
              className="leading-7 text-sm text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={handleFormChange}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="meetingId"
              className="leading-7 text-sm text-gray-600"
            >
              Meeting ID
            </label>
            <input
              type="text"
              id="meetingId"
              name="meetingId"
              value={formData.meetingId}
              onChange={handleFormChange}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-4" onClick={handleFormSubmit}>
            Join Meeting (Client view)
          </button>
        </div>
      </section>
    </>
  )
}
