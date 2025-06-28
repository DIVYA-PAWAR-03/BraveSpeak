import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactUs() {
  return (
    <main className="bg-gradient-to-b from-purple-50 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-10 md:p-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#4d0864] mb-10 sm:mb-12">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-purple-800 font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-purple-800 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="xyz@example.com"
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-purple-800 font-medium mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Your message..."
                className="w-full border border-purple-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6A0DAD] text-white py-3 rounded-lg font-semibold hover:bg-[#5a0a9f] transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="text-purple-800 space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="text-[#6A0DAD] min-w-[28px]" size={28} />
              <div>
                <h3 className="font-semibold text-lg">Address</h3>
                <p className="text-sm sm:text-base">123 Justice Lane, Safe City, India</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="text-[#6A0DAD] min-w-[28px]" size={28} />
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-sm sm:text-base">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="text-[#6A0DAD] min-w-[28px]" size={28} />
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-sm sm:text-base">support@bravespeak.org</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
