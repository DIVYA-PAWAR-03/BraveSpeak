import React from "react";
import { Link } from "react-router-dom";
import { Shield, Phone, Heart,  } from "lucide-react";

export default function Footer() {
  return (
      <footer className="bg-gradient-to-b from-[#2E003E] to-[#1a0024] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield size={24} />
                </div>
                <h1 className="text-3xl font-bold">BraveSpeak</h1>
              </div>
              <p className="text-purple-200 leading-relaxed">
                Voices that matter. Stories that inspire. Creating safe spaces for justice and healing.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-purple-300">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-900 rounded-lg flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">24/7 Helpline</p>
                    <p className="font-semibold">1800-123-456</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-900 rounded-lg flex items-center justify-center mt-1">
                    <Heart size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-purple-300">Email Support</p>
                    <a href="mailto:support@bravespeak.org" className="font-semibold text-purple-300 hover:text-white transition-colors">
                      support@bravespeak.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-purple-300">Our Mission</h3>
              <p className="text-purple-200 leading-relaxed mb-6">
                BraveSpeak is dedicated to creating a safe space for voices to be heard, stories to be shared, and justice to be pursued.
              </p>
              <div className="space-y-2">
                <a href="#" className="block text-purple-300 hover:text-white transition-colors text-sm">Privacy Statement</a>
                <a href="#" className="block text-purple-300 hover:text-white transition-colors text-sm">Terms & Conditions</a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-purple-800">
            <p className="text-center text-purple-300">
              © 2025 BraveSpeak. All rights reserved. • Building a safer, more just world together.
            </p>
          </div>
        </div>
      </footer>
  );
}
