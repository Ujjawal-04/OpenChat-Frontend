'use client'

import React, { useState } from 'react'
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'

export default function FloatingChatbot({ apiKey = "f09e96134f09b65d" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    const userMessage = { role: 'user', content: query }
    setChatHistory(prev => [...prev, userMessage])

    try {
      const res = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, api_key: apiKey }),
      })

      const data = await res.json()
      const aiMessage = { role: 'ai', content: data.response }
      setChatHistory(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = { role: 'ai', content: 'An error occurred. Please try again.' }
      setChatHistory(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setQuery('')
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          className="rounded-full w-12 h-12 bg-gradient-to-r from-indigo-500 to-rose-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Chat with AI</h3>
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[300px] overflow-y-auto p-4 bg-gray-50">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex items-start mb-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'ai' && (
                  <Bot className="w-8 h-8 rounded-full bg-indigo-100 p-1 mr-2 flex-shrink-0" />
                )}
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-rose-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <User className="w-8 h-8 rounded-full bg-rose-100 p-1 ml-2 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Ask a question..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-gradient-to-r from-indigo-500 to-rose-500 text-white rounded-md hover:from-indigo-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}