'use client'

import React, { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'

interface PropertyMarker {
  id: string
  name: string
  price: number
  lat: number
  lng: number
  type: string
}

interface InteractiveMapProps {
  properties?: PropertyMarker[]
  userLocation?: { lat: number; lng: number }
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties = [
    { id: '1', name: 'Rumah Modern Jakarta', price: 500000000, lat: -6.2088, lng: 106.8605, type: 'house' },
    { id: '2', name: 'Apartemen Mewah Sudirman', price: 1200000000, lat: -6.1945, lng: 106.8189, type: 'apartment' },
    { id: '3', name: 'Tanah Premium Bandung', price: 300000000, lat: -6.9147, lng: 107.6098, type: 'land' },
  ],
  userLocation = { lat: -6.2088, lng: 106.8605 },
}) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [selectedMarker, setSelectedMarker] = React.useState<PropertyMarker | null>(null)

  useEffect(() => {
    // This is a placeholder implementation.
    // In production, you would initialize Google Maps or OpenStreetMap here
    if (mapContainer.current) {
      // Example: Initialize map with Leaflet or Google Maps API
      const mapHTML = `
        <div style="width: 100%; height: 100%; background: url('https://tile.openstreetmap.org/0/0/0.png'); background-size: cover; display: flex; align-items: center; justify-content: center;">
          <div style="text-align: center; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; font-weight: bold; color: #333; margin: 0;">Integrasi Google Maps / OpenStreetMap</p>
            <p style="font-size: 14px; color: #666; margin: 10px 0 0 0;">Implementasi API akan dilakukan di deployment</p>
          </div>
        </div>
      `
      mapContainer.current.innerHTML = mapHTML
    }
  }, [])

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Peta Properti Interaktif
          </h2>
          <p className="text-gray-600 text-lg">
            Temukan properti di sekitar lokasi Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div
              ref={mapContainer}
              className="w-full h-96 lg:h-96 rounded-lg shadow-lg border-2 border-gray-200"
            />
          </div>

          {/* Property List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 h-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Properti Terdekat</h3>
              <div className="space-y-4">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => setSelectedMarker(property)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedMarker?.id === property.id
                        ? 'bg-blue-100 border-2 border-blue-600'
                        : 'bg-white border-2 border-gray-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <MapPin className="text-blue-600" size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">
                          {property.name}
                        </h4>
                        <p className="text-blue-600 font-bold text-sm mt-1">
                          Rp {(property.price / 1000000).toFixed(0)} Juta
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {Math.abs(property.lat - userLocation.lat).toFixed(2)}° away
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {selectedMarker && (
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                  Lihat Detail
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveMap
