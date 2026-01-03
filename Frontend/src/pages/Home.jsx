import React, { useState } from 'react'
import ContactAdd from '../components/ContactAdd'
import GetContact from '../components/GetContact'
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <div className="flex flex-col text-center mt-5 mb-2 px-6 md:px-10 lg:px-20 gap-4">
        <h1 className="text-purple-600 text-3xl font-semibold">Contact Hub</h1>
        <p className="text-lg text-gray-600">
          Organize and manage your professional network with ease. Add contacts, track conversations, and stay connected.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row md:flex-col gap-6 md:gap-10 p-6 md:p-10 justify-center">
        <div className="w-full lg:w-2/3 md:w-11/12 mx-auto">
          <ContactAdd onSuccess={() => setRefresh(prev => !prev)} />
        </div>
        <div className="w-full md:w-11/12 mx-auto">
          <GetContact refresh={refresh} />
        </div>
      </div>

      {/* Toast container for success/error messages */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  )
}

export default Home;
