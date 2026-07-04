'use client'

import React from 'react'
import Link from 'next/link'
import { MessageCircle, Phone, MapPin } from 'lucide-react'

const WhatsAppGateway: React.FC = () => {
  const handleWhatsAppClick = (phone: string, message: string) => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank')
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-12">
            {/* Left Side */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <MessageCircle className="text-green-600" size={24} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Hubungi Kami via WhatsApp
                </h2>
              </div>
              <p className="text-gray-600 text-lg mb-8">
                Dapatkan jawaban cepat dari tim kami melalui WhatsApp. Kami siap membantu Anda 24/7.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg mt-1">
                    <Phone className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Customer Service</h3>
                    <p className="text-gray-600 text-sm">+62 812 3456 789</p>
                    <p className="text-gray-500 text-xs mt-1">Tanya-tanya seputar properti</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg mt-1">
                    <MapPin className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Tim Penjualan</h3>
                    <p className="text-gray-600 text-sm">+62 821 9876 543</p>
                    <p className="text-gray-500 text-xs mt-1">Konsultasi pembelian properti</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() =>
                    handleWhatsAppClick(
                      '6281234567890',
                      'Halo, saya ingin menanyakan tentang properti yang tersedia. Bisa dibantu?'
                    )
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={20} />
                  <span>Chat dengan Customer Service</span>
                </button>
                <button
                  onClick={() =>
                    handleWhatsAppClick(
                      '6282198765430',
                      'Saya tertarik membeli properti. Bisa konsultasi?'
                    )
                  }
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone size={20} />
                  <span>Hubungi Tim Penjualan</span>
                </button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block p-6 bg-white rounded-full shadow-lg mb-4">
                    <MessageCircle className="text-green-600" size={64} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Chat Sekarang</h3>
                  <p className="text-gray-600">Respon cepat dalam hitungan menit</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Link
            href="#"
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Tanya Harga Terbaru</h3>
            <p className="text-gray-600 text-sm mb-4">
              Dapatkan update harga properti terkini
            </p>
            <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
              Chat via WhatsApp →
            </button>
          </Link>

          <Link
            href="#"
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Jadwal Kunjungan</h3>
            <p className="text-gray-600 text-sm mb-4">
              Atur jadwal kunjungan properti
            </p>
            <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
              Chat via WhatsApp →
            </button>
          </Link>

          <Link
            href="#"
            className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">Keluhan & Masukan</h3>
            <p className="text-gray-600 text-sm mb-4">
              Sampaikan keluhan atau saran Anda
            </p>
            <button className="text-green-600 hover:text-green-700 font-semibold text-sm">
              Chat via WhatsApp →
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WhatsAppGateway
