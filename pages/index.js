import React from 'react';
import Head from 'next/head'

import Header from '../components/Header'
import { useRouter } from 'next/router'

import { useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      fullname: "Teach Edison",
      email: "teachedison@mail.com",
      meetingId: "",
      role: 0,
      password: "",
    },
  });

  const handleFormSubmit = (data) => {
    router.push({
      pathname: `/meeting`,
      query: { mn: data.meetingId, name: data.fullname, pwd: data.password, email: data.email, role: data.role }
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

      <section className='w-11/12 h-full mx-auto flex items-center justify-center my-5 mb-10'>
        <div className="bg-white flex flex-col p-8 relative rounded-lg shadow-md w-6/12">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Join Meeting
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Fill the below details
          </p>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="relative mb-4">
              <label
                htmlFor="fullname"
                className="leading-7 text-sm text-gray-600 required"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Full Name"
                className={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out}`}
                autoFocus={true}
                {...register("fullname", { required: "This field is required" })}
              />
              {errors.fullname && <span className='text-red-500 text-xs mt-1'>{errors.fullname.message}</span>}
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600 required">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                {...register("email", { required: "This field is required" })}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.email && <span className='text-red-500 text-xs mt-1'>{errors.email.message}</span>}
            </div>
            <div className="relative mb-4">
              <label htmlFor="meetingId" className="leading-7 text-sm text-gray-600 required">
                Meeting ID
              </label>
              <input
                type="text"
                id="meetingId"
                name="meetingId"
                placeholder="123456789"
                {...register("meetingId", { required: "This field is required" })}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.meetingId && <span className='text-red-500 text-xs mt-1'>{errors.meetingId.message}</span>}
            </div>
            <div className="relative mb-4">
              <label htmlFor="role" className="leading-7 text-sm text-gray-600">
                Role
              </label>
              <select className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                {...register("role", { required: "This field is required" })}
              >
                <option value="0">Attendee</option>
                <option value="1">Host</option>
                <option value="5">Assistant</option>
              </select>
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                {...register("password")}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-4"
              type='submit'>
              Join Meeting
            </button>
          </form>
        </div >
      </section >
    </>
  )
}
