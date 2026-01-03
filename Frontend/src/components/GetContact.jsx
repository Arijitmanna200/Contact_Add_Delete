import React, { useEffect, useState } from 'react'
import { HiUserGroup } from "react-icons/hi2";
import { BiUser } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import DeleteContact from './DeleteContact';

const GetContact = ({ refresh }) => {
  const [contactCount, setContactCount] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://contact-add-delete.onrender.com/api/contact/");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setContacts(data.contacts || []);
      setContactCount(data.contacts?.length || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, [refresh]);

  return (
    <div className="shadow-lg rounded-xl p-6 w-full flex flex-col gap-7 bg-gray-50 group max-h-8/12">
      <div className="flex flex-row gap-4 font-bold text-2xl">
        <div className="group-hover:scale-110 rounded-xl flex justify-center items-center p-3 bg-linear-to-br from-green-500 to-blue-500 transition duration-300 ease-in-out text-white">
          <HiUserGroup size={20} />
        </div>
        <h2>Contact List</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <>
          {contactCount === 0 && (
            <h3 className="font-bold text-xl">No contacts available. Please add new contacts.</h3>
          )}

          <div className="flex flex-col gap-5 max-h-10/12 overflow-scroll">
            {contacts.map(contact => (
              <div key={contact._id} className="flex flex-row gap-4 mb-4 contact p-2 rounded-xl bg-purple-100">
                <div className="flex justify-center">
                  <div className="rounded-xl flex justify-center p-3 transition duration-300 ease-in-out">
                    <BiUser size={50} className="border p-2 rounded-xl bg-linear-to-br from-green-500 to-blue-500 text-white" />
                  </div>
                </div>

                <div className="flex flex-col gap-4 flex-grow">
                  <h4 className="font-bold text-xl">{contact.name}</h4>
                  <p className="text-gray-600 text-md">
                    <MdOutlineEmail size={20} className="inline mr-2" /> {contact.email}
                  </p>
                  <p className="text-gray-600 text-md">
                    <IoCallOutline size={20} className="inline mr-2" /> {contact.phone}
                  </p>
                </div>

                <div className="flex items-center">
                  <DeleteContact id={contact._id} onDelete={fetchContacts} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600">Total Contacts: {contactCount}</p>
        </>
      )}
    </div>
  )
}

export default GetContact;
