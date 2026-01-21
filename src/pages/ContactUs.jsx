import React from "react";
import { Mail, MapPin, Phone as PhoneIcon, User } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white flex items-center justify-center py-10 px-2 md:px-0">
      <div className="w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-purple-100">
        {/* Left: Contact Info */}
        <div className="md:w-1/2 bg-gradient-to-br from-[#6A0DAD] to-purple-400 text-white p-10 flex flex-col justify-center gap-8 relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <div className="flex items-center gap-4 mb-4">
            <MapPin size={28} className="text-white" />
            <div>
              <div className="font-semibold">Address</div>
              <div className="opacity-90">123 Justice Lane, Safe City, India</div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <PhoneIcon size={28} className="text-white" />
            <div>
              <div className="font-semibold">Phone</div>
              <div className="opacity-90">+91 12345 67890</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Mail size={28} className="text-white" />
            <div>
              <div className="font-semibold">Email</div>
              <div className="opacity-90">support@BraveSpeak.com</div>
            </div>
          </div>
          <div className="mt-8 text-sm opacity-80">We respect your privacy. Your information is safe with us.</div>
        </div>

        {/* Right: Contact Form */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2E003E] mb-6 text-center md:text-left">Contact Us</h1>
          <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
            <input type="hidden" name="access_key" value="9620de68-693f-4589-b226-c7b3b900267d" />
            <div>
              <label htmlFor="name" className="block text-[#2E003E] font-medium mb-1">Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400"><User size={18} /></span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="pl-10 pr-3 py-2 border border-purple-300 w-full text-purple-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white/80 transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-[#2E003E] font-medium mb-1">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400"><Mail size={18} /></span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="xyz@gmail.com"
                  required
                  className="pl-10 pr-3 py-2 border border-purple-300 w-full text-purple-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white/80 transition"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-[#2E003E] font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Your Message..."
                required
                className="p-3 border border-purple-300 w-full text-purple-950 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white/80 transition"
              ></textarea>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-[#6A0DAD] to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center gap-2">
              <Mail size={20} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
