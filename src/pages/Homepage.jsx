import React, { useState, useEffect } from "react";
import { Menu, X, AlertTriangle, Clock, BarChart3, ArrowRight, Shield, Heart, Users, Scale, BookOpen, Phone } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

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
        {/* Background Image with Opacity */}
        <div className="absolute inset-0 bg-no-repeat bg-fixed opacity-100" style={{backgroundImage: 'url(/images/break-chain.png)', backgroundSize: 'contain', backgroundPosition: 'left top'}}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#D6B4FC]/80 via-purple-200/60 to-purple-100/80"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative group ml-12">
              <div className="left-section">
                 <motion.img
                    src="/images/break-chain.png"
                    alt="Break the Chain"
                    className="w-full max-w-md drop-shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 text-center md:text-left space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <motion.h1 
              className="text-[#2E003E] text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Breaking the Silence, Seeking Justice
            </motion.h1>
            <motion.p 
              className="text-purple-900 text-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Every voice matters. Every story deserves to be heard. Stand with survivors and create lasting change.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/laws">
                <motion.button 
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#6A0DAD] text-white rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                Know Your Rights
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              </Link>
              
              <Link to="/contact">
                <motion.button 
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#6A0DAD] rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                Get Help Now
                <Phone size={20} />
              </motion.button>
              </Link>
              
            </motion.div>
          </motion.div>
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
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-sm font-semibold text-purple-900 mb-4">
              Reality Check
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2E003E] mb-4">
              The Alarming Reality
            </h2>
            <p className="text-purple-700 text-xl">
              Daily Rape Statistics in India
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="p-5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <AlertTriangle className="text-[#6A0DAD]" size={48} strokeWidth={2} />
                  </motion.div>
                </div>
                <motion.h3 
                  className="text-6xl font-bold bg-gradient-to-r from-[#6A0DAD] to-purple-600 bg-clip-text text-transparent text-center mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  viewport={{ once: true }}
                >87</motion.h3>
                <p className="text-purple-800 text-center font-semibold text-lg">
                  Cases Reported Daily
                </p>
                <p className="text-purple-600 text-center text-sm mt-2">
                  Every single day in India
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="p-5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: -5 }}
                  >
                    <Clock className="text-[#6A0DAD]" size={48} strokeWidth={2} />
                  </motion.div>
                </div>
                <motion.h3 
                  className="text-6xl font-bold bg-gradient-to-r from-[#6A0DAD] to-purple-600 bg-clip-text text-transparent text-center mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  viewport={{ once: true }}
                >1/16</motion.h3>
                <p className="text-purple-800 text-center font-semibold text-lg">
                  Reporting Frequency
                </p>
                <p className="text-purple-600 text-center text-sm mt-2">
                  One case every 16 minutes
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 hover:border-purple-300 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
              <div className="relative">
                <div className="flex justify-center mb-6">
                  <motion.div 
                    className="p-5 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-md group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <BarChart3 className="text-[#6A0DAD]" size={48} strokeWidth={2} />
                  </motion.div>
                </div>
                <motion.h3 
                  className="text-6xl font-bold bg-gradient-to-r from-[#6A0DAD] to-purple-600 bg-clip-text text-transparent text-center mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  viewport={{ once: true }}
                >{caseCount}</motion.h3>
                <p className="text-purple-800 text-center font-semibold text-lg">
                  Since Page Load
                </p>
                <p className="text-purple-600 text-center text-sm mt-2">
                  Estimated cases counter
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="bg-purple-100 rounded-2xl p-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-purple-700 font-medium">
              Based on NCRB 2022 data • These statistics reflect only reported cases • Actual numbers may be significantly higher
            </p>
          </motion.div>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-white to-purple-50 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: 'url(/images/Rape-victims.jpg)'}}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-purple-50/90"></div>
        <div className="relative max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-sm font-semibold text-purple-900 mb-4">
              Understanding the Issue
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2E003E] mb-6">
              Why Awareness Matters
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Scale className="text-[#6A0DAD]" size={28} />
              </motion.div>
              <h3 className="text-xl font-bold text-[#2E003E] mb-4">Prevention Through Knowledge</h3>
              <p className="text-purple-700 leading-relaxed">
                Understanding the laws, knowing your rights, and recognizing signs of harassment empowers individuals and communities to act before harm is done.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <BookOpen className="text-[#6A0DAD]" size={28} />
              </motion.div>
              <h3 className="text-xl font-bold text-[#2E003E] mb-4">Breaking the Silence</h3>
              <p className="text-purple-700 leading-relaxed">
                Lack of awareness often leads to silence and injustice. Many survivors don't know what counts as harassment or that they have legal protection.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Users className="text-[#6A0DAD]" size={28} />
              </motion.div>
              <h3 className="text-xl font-bold text-[#2E003E] mb-4">Creating Safe Cultures</h3>
              <p className="text-purple-700 leading-relaxed">
                When people are informed about boundaries and consent, they can act. When society is aware, it becomes safer, stronger, and more just.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-50 to-transparent opacity-50"></div>
        <div className="relative max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-sm font-semibold text-purple-900 mb-4">
              Take Action
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2E003E] mb-6">
              How You Can Help
            </h2>
            <p className="text-purple-700 text-lg max-w-3xl mx-auto">
              Every action counts. Here's how you can make a difference in someone's life today.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-100 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{backgroundImage: 'url(/images/section_376.webp)'}}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/90 via-purple-200/80 to-purple-100/90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div 
            className="inline-block px-4 py-2 bg-white bg-opacity-70 backdrop-blur-sm rounded-full text-sm font-semibold text-purple-900 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join Our Mission
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2E003E] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Be the Voice for the Voiceless
          </motion.h2>
          <motion.p 
            className="text-purple-900 text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Change begins with awareness, but it doesn't stop there. Stand up, speak out, and support survivors in your community.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/survivorStories">
              <motion.button 
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#2E003E] text-white rounded-full font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Survivor Stories
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button 
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-[#2E003E] rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Support the Cause
                <Heart size={22} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}