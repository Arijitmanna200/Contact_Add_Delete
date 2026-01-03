import React from 'react'
import { IoPersonAddOutline } from "react-icons/io5";

const ContactAdd = () => {
  return (
    <>
    <div className="shadow-lg rounded-xl p-6 w-full flex flex-col gap-7 bg-gray-50 group " >
    <h1 className="flex flex-row gap-4 font-bold text-2xl"><div className="group-hover:scale-110 rounded-xl flex justify-center items-center p-3 bg-linear-to-br from-violet-500 to-pink-500 transition duration-300 ease-in-out text-white">
                <IoPersonAddOutline size={20} />
              </div><h2>Add new Contact</h2></h1>
  <form>
    <div className="flex flex-col gap-5 ">
      <label htmlFor="name" className="font-bold text-xl">
        Name
      </label>

      <input
        type="text"
        id="name"
        name="name"
        placeholder="John Doe"
        className="border rounded-md px-3 py-2 focus:outline-none focus:border-none focus:ring-1 focus:ring-purple-600 transition duration-300 ease-in-out"
      />

      <label htmlFor="email" className="font-bold text-xl">
        Email
      </label>

      <input
        type="email"
        id="email"
        name="email"
        placeholder="John123@gmail.com"
        className="border rounded-md px-3 py-2 focus:outline-none focus:border-none focus:ring-1 focus:ring-purple-600  transition duration-300 ease-in-out"
      />

      <label htmlFor="phone" className="font-bold text-xl">
        Phone
      </label>

      <input
        type="text"
        id="phone"
        name="phone"
        placeholder="+91 1234567890"
        className="border rounded-md px-3 py-2 focus:outline-none focus:border-none focus:ring-1 focus:ring-purple-600 transition duration-300 ease-in-out"
      />

      <label htmlFor="msg" className="font-bold text-xl">
        Message
      </label>

      <textarea name="msg" id="msg" rows="4" className="border rounded-md px-3 py-2 focus:outline-none focus:border-none focus:ring-1 focus:ring-purple-600 transition duration-300 ease-in-out"></textarea>
    </div>
  </form>
</div>

    
    </>
  )
}

export default ContactAdd