'use client'

import React, { useState } from 'react'
import { Send, MessageCircle, Phone, MapPin, Clock } from 'lucide-react'
import { formatDate } from '@/utils/format'

interface Message {
  id: string
  sender: 'buyer' | 'marketing' | 'seller'
  senderName: string
  content: string
  timestamp: string
  isRead: boolean
}

interface Chat {
  id: string
  type: 'marketing' | 'seller'
  name: string
  phone: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  avatar?: string
  messages: Message[]
}

const BuyerCommunication: React.FC = () => {
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      type: 'marketing',
      name: 'Budi - Marketing Manager',
      phone: '+62812345678',
      lastMessage: 'Bagaimana kabar unit tersebut? Tertarik untuk kunjungan?',
      lastMessageTime: '2024-07-04 10:30',
      unreadCount: 2,
      messages: [
        {
          id: 'm1',
          sender: 'marketing',
          senderName: 'Budi',
          content: 'Halo, saya Budi dari team marketing. Ada yang bisa saya bantu?',
          timestamp: '2024-07-03 14:20',
          isRead: true,
        },
        {
          id: 'm2',
          sender: 'buyer',
          senderName: 'Anda',
          content: 'Halo Budi, saya tertarik dengan Rumah Tipe A di Blok A1',
          timestamp: '2024-07-03 14:25',
          isRead: true,
        },
        {
          id: 'm3',
          sender: 'marketing',
          senderName: 'Budi',
          content: 'Bagian unit tersebut tersedia dan masih dalam kondisi baik. Ingin saya jelaskan spesifikasinya?',
          timestamp: '2024-07-03 14:30',
          isRead: true,
        },
        {
          id: 'm4',
          sender: 'buyer',
          senderName: 'Anda',
          content: 'Ya, tolong jelaskan detail dan harganya',
          timestamp: '2024-07-04 09:15',
          isRead: true,
        },
        {
          id: 'm5',
          sender: 'marketing',
          senderName: 'Budi',
          content: 'Bagaimana kabar unit tersebut? Tertarik untuk kunjungan?',
          timestamp: '2024-07-04 10:30',
          isRead: false,
        },
      ],
    },
    {
      id: '2',
      type: 'seller',
      name: 'Siti - Pemilik Properti',
      phone: '+62821987654',
      lastMessage: 'Unit sudah siap dikunjungi kapan saja',
      lastMessageTime: '2024-07-02 16:45',
      unreadCount: 0,
      messages: [
        {
          id: 'm6',
          sender: 'seller',
          senderName: 'Siti',
          content: 'Halo, unit saya siap untuk dijual',
          timestamp: '2024-07-02 15:00',
          isRead: true,
        },
        {
          id: 'm7',
          sender: 'buyer',
          senderName: 'Anda',
          content: 'Kapan bisa kunjungan?',
          timestamp: '2024-07-02 15:30',
          isRead: true,
        },
        {
          id: 'm8',
          sender: 'seller',
          senderName: 'Siti',
          content: 'Unit sudah siap dikunjungi kapan saja',
          timestamp: '2024-07-02 16:45',
          isRead: true,
        },
      ],
    },
  ])

  const [selectedChatId, setSelectedChatId] = useState<string>('1')
  const [messageInput, setMessageInput] = useState('')

  const selectedChat = chats.find(c => c.id === selectedChatId)

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Send message logic
      setMessageInput('')
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Komunikasi</h1>
        <p className="text-gray-600 mt-1">Chat dengan Marketing atau Penjual properti</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Chat List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-bold text-gray-900">Percakapan</h2>
          </div>
          <div className="overflow-y-auto flex-1">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedChatId === chat.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{chat.name}</h3>
                  {chat.unreadCount > 0 && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 line-clamp-1 mb-1">{chat.lastMessage}</p>
                <p className="text-xs text-gray-500">{chat.lastMessageTime}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        {selectedChat && (
          <div className="lg:col-span-3 bg-white rounded-lg shadow overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{selectedChat.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-blue-100">
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                      <Phone size={16} />
                      <span>Call</span>
                    </button>
                    <a
                      href={`tel:${selectedChat.phone}`}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      <MessageCircle size={16} />
                      <span>{selectedChat.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'buyer'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                    }`}
                  >
                    {message.sender !== 'buyer' && (
                      <p className="text-xs font-semibold mb-1 opacity-75">{message.senderName}</p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'buyer' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Tulis pesan..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BuyerCommunication
