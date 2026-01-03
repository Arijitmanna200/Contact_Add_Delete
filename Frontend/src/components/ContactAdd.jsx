import React, { useState } from 'react'
import { IoPersonAddOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactAdd = ({ onSuccess }) => {
  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [phone , setPhone] = useState("")
  const [msg , setMsg] = useState("")
  const [loading, setLoading] = useState(false);

  const submitButton = async (e) => {
    e.preventDefault();

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const contactData = { name, email, phone, msg: msg || null };
    setLoading(true);

    try {
      const res = await fetch("https://contact-add-delete.onrender.com/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData)
      });

      if (!res.ok) throw new Error("Failed to add contact");
      const data = await res.json();
      console.log("Contact added:", data);

      toast.success("Contact added successfully!");

      // Trigger refresh in parent
      onSuccess?.();

      // Reset form
      setName(""); setEmail(""); setPhone(""); setMsg("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add contact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-lg rounded-xl p-6 w-full flex flex-col gap-7 bg-gray-50 group">
      <div className="flex flex-row gap-4 font-bold text-2xl">
        <div className="group-hover:scale-110 rounded-xl flex justify-center items-center p-3 bg-linear-to-br from-violet-500 to-pink-500 transition duration-300 ease-in-out text-white">
          <IoPersonAddOutline size={20} />
        </div>
        <h2>Add new Contact</h2>
      </div>

      <form>
        <div className="flex flex-col gap-5">
          <label className="font-bold text-xl">Name</label>
          <input
            type="text" value={name} onChange={(e)=>setName(e.target.value)}
            placeholder="John Doe"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300 ease-in-out"
          />

          <label className="font-bold text-xl">Email</label>
          <input
            type="email" value={email} onChange={(e)=>setEmail(e.target.value)}
            placeholder="John123@gmail.com"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300 ease-in-out"
          />

          <label className="font-bold text-xl">Phone</label>
          <input
            type="number" value={phone} onChange={(e)=>setPhone(e.target.value)}
            placeholder="+91 1234567890"
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300 ease-in-out"
          />

          <label className="font-bold text-xl">Message</label>
          <textarea
            rows="4" value={msg} onChange={(e)=>setMsg(e.target.value)}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-purple-600 transition duration-300 ease-in-out"
          />
        </div>
      </form>

      <div className="flex justify-center w-1/2 mx-auto">
        <button
          className="w-full bg-purple-600 text-white font-bold px-6 py-2 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out"
          onClick={submitButton}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Contact"}
        </button>
      </div>
    </div>
  )
}

export default ContactAdd;
