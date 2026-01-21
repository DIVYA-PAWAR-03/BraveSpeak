import React, { useState, useEffect } from "react";
import { Menu, X, AlertTriangle, Clock, BarChart3, ArrowRight, Shield, Heart, Users, Scale, BookOpen, Phone } from "lucide-react";
import { Link } from 'react-router-dom';

export default function BraveSpeakDemo() {
  const [caseCount, setCaseCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCaseCount((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#D6B4FC] via-purple-200 to-purple-100 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 flex justify-center">
            <div className="relative group">
              <div className="left-section">
                 <img
                    src="/images/break-chain.png"
                    alt="Break the Chain"
                    className="w-full max-w-md drop-shadow-lg"
                  />

              </div>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-[#2E003E] text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Breaking the Silence, Seeking Justice
            </h1>
            <p className="text-purple-900 text-xl leading-relaxed">
              Every voice matters. Every story deserves to be heard. Stand with survivors and create lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/laws">
                <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6A0DAD] text-white rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer ">
                Know Your Rights
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
              
              <Link to="/contact">
                <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#6A0DAD] rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                Get Help Now
                <Phone size={20} />
              </button>
              </Link>
              
            </div>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-transparent opacity-50"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl p-12 shadow-xl border border-purple-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative space-y-6">
              <p className="text-purple-900 text-lg leading-relaxed text-center">
                Every voice matters. Every story deserves to be heard. For far too long, survivors of sexual violence have been silenced by fear, shame, or stigma. But silence protects no one.
              </p>
              <p className="text-purple-900 text-lg leading-relaxed text-center">
                We stand with the brave individuals who speak up — not just for themselves, but for those who still can't. This platform is a safe space for support, awareness, and action.
              </p>
              <div className="flex justify-center pt-4">
                <div className="inline-block bg-gradient-to-r from-[#2E003E] to-purple-900 text-white px-8 py-4 rounded-full font-semibold shadow-lg">
                  Break the silence. Speak your truth. Justice begins with your voice.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-purple-50 to-white relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-sm font-semibold text-purple-900 mb-4">
              Reality Check
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2E003E] mb-4">
              The Alarming Reality
            </h2>
            <p className="text-purple-700 text-xl">
              Daily Rape Statistics in India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <div className="p-5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="text-[#6A0DAD]" size={48} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-6xl font-bold bg-gradient-to-r from-[#6A0DAD] to-purple-600 bg-clip-text text-transparent text-center mb-4">87</h3>
                <p className="text-purple-800 text-center font-semibold text-lg">
                  Cases Reported Daily
                </p>
                <p className="text-purple-600 text-center text-sm mt-2">
                  Every single day in India
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <div className="p-5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Clock className="text-[#6A0DAD]" size={48} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-6xl font-bold bg-gradient-to-r from-[#6A0DAD] to-purple-600 bg-clip-text text-transparent text-center mb-4">1/16</h3>
                <p className="text-purple-800 text-center font-semibold text-lg">
                  Reporting Frequency
                </p>
                <p className="text-purple-600 text-center text-sm mt-2">
                  One case every 16 minutes
                </p>
              </div>
            </div>

            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <div className="p-5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="text-[#6A0DAD]" size={48} strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-6xl font-bold bg-gradient-to-r from-[#6A0DAD] to-purple-600 bg-clip-text text-transparent text-center mb-4">{caseCount}</h3>
                <p className="text-purple-800 text-center font-semibold text-lg">
                  Since Page Load
                </p>
                <p className="text-purple-600 text-center text-sm mt-2">
                  Estimated cases counter
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-100 rounded-2xl p-6 text-center">
            <p className="text-sm text-purple-700 font-medium">
              Based on NCRB 2022 data • These statistics reflect only reported cases • Actual numbers may be significantly higher
            </p>
          </div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-white to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-sm font-semibold text-purple-900 mb-4">
              Understanding the Issue
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2E003E] mb-6">
              Why Awareness Matters
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
                <Scale className="text-[#6A0DAD]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#2E003E] mb-4">Prevention Through Knowledge</h3>
              <p className="text-purple-700 leading-relaxed">
                Understanding the laws, knowing your rights, and recognizing signs of harassment empowers individuals and communities to act before harm is done.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="text-[#6A0DAD]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#2E003E] mb-4">Breaking the Silence</h3>
              <p className="text-purple-700 leading-relaxed">
                Lack of awareness often leads to silence and injustice. Many survivors don't know what counts as harassment or that they have legal protection.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-[#6A0DAD]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#2E003E] mb-4">Creating Safe Cultures</h3>
              <p className="text-purple-700 leading-relaxed">
                When people are informed about boundaries and consent, they can act. When society is aware, it becomes safer, stronger, and more just.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-50 to-transparent opacity-50"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-sm font-semibold text-purple-900 mb-4">
              Take Action
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2E003E] mb-6">
              How You Can Help
            </h2>
            <p className="text-purple-700 text-lg max-w-3xl mx-auto">
              Every action counts. Here's how you can make a difference in someone's life today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group flex items-start gap-5 p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="text-[#6A0DAD]" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-[#2E003E] mb-2 text-lg">Listen Without Judgment</h4>
                <p className="text-purple-700">Create a safe space if someone confides in you. Your empathy can make all the difference.</p>
              </div>
            </div>
            
            <div className="group flex items-start gap-5 p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="text-[#6A0DAD]" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-[#2E003E] mb-2 text-lg">Report and Witness</h4>
                <p className="text-purple-700">Report incidents and stand as a witness if it's safe to do so. Your testimony matters.</p>
              </div>
            </div>
            
            <div className="group flex items-start gap-5 p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="text-[#6A0DAD]" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-[#2E003E] mb-2 text-lg">Share Knowledge</h4>
                <p className="text-purple-700">Share verified information and resources. Help spread awareness responsibly.</p>
              </div>
            </div>
            
            <div className="group flex items-start gap-5 p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="text-[#6A0DAD]" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-[#2E003E] mb-2 text-lg">Support Organizations</h4>
                <p className="text-purple-700">Support organizations working for survivor safety and rights through donations or volunteering.</p>
              </div>
            </div>
            
            <div className="md:col-span-2 group flex items-start gap-5 p-6 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-200">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-300 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="text-[#6A0DAD]" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-[#2E003E] mb-2 text-lg">Amplify Voices</h4>
                <p className="text-purple-700">Use your voice on social media and in your community to spread awareness, empathy, and support for survivors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-100 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white bg-opacity-70 backdrop-blur-sm rounded-full text-sm font-semibold text-purple-900 mb-6">
            Join Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2E003E] mb-6">
            Be the Voice for the Voiceless
          </h2>
          <p className="text-purple-900 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Change begins with awareness, but it doesn't stop there. Stand up, speak out, and support survivors in your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/survivorStories">
              <button className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#2E003E] text-white rounded-full font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-lg cursor-pointer">
                Read Survivor Stories
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/contact">
              <button className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#2E003E] rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg cursor-pointer">
                Support the Cause
                <Heart size={22} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}