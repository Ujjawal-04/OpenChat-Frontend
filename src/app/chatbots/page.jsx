import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Code } from "lucide-react"

export default function ChatbotImplementationGuide() {
  return (
    <div className="container mx-auto px-4 py-28 bg-gradient-to-r from-indigo-50 to-rose-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Implementing a Chatbot on Your Website</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Introduction</h2>
        <p className="mb-4 text-gray-600">
          Implementing a chatbot on your website can greatly enhance user experience and provide instant support to your visitors. This guide will walk you through the process of adding a chatbot to your website using React and a hypothetical chatbot API.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Chatbot Component</h2>
        <p className="mb-4 text-gray-600">
          First, let's create a basic chatbot component. This component will handle the chat interface and communication with the chatbot API.
        </p>
        <Card className="shadow-lg border border-gray-200 rounded-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-gray-800">Chatbot.jsx</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-gray-800">
{`import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    // Add user message to chat
    setMessages([...messages, { text: input, sender: 'user' }]);

    // Call chatbot API (replace with your actual API call)
    const response = await fetch('https://api.example.com/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    // Add chatbot response to chat
    setMessages(msgs => [...msgs, { text: data.reply, sender: 'bot' }]);
    setInput('');
  };

  return (
    <div className="w-80 border rounded-lg overflow-hidden">
      <div className="h-96 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={\`mb-2 \${msg.sender === 'user' ? 'text-right' : 'text-left'}\`}>
            <span className={\`inline-block p-2 rounded-lg \${
              msg.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-white border border-gray-300'
            }\`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white">
        <div className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-grow border-gray-300"
          />
          <Button onClick={sendMessage} className="bg-gradient-to-r from-indigo-500 to-rose-500 text-white shadow-md hover:from-indigo-600 hover:to-rose-600 transition-all">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;`}
              </code>
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Implementing the Chatbot</h2>
        <p className="mb-4 text-gray-600">
          To implement the chatbot on your website, follow these steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Save the above code as <code className="bg-gray-200 px-1 rounded">Chatbot.jsx</code> in your components folder.</li>
          <li>Import and use the Chatbot component in your desired page or layout file.</li>
          <li>Customize the styling and behavior as needed.</li>
          <li>Replace the example API call with your actual chatbot service API.</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Example Usage</h2>
        <p className="mb-4 text-gray-600">
          Here's an example of how to use the Chatbot component in a page:
        </p>
        <Card className="shadow-lg border border-gray-200 rounded-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-100 to-rose-100 p-4 rounded-t-lg">
            <CardTitle className="text-lg font-semibold text-gray-800">page.jsx</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              <code className="text-sm text-gray-800">
{`import React from 'react';
import Chatbot from '@/components/Chatbot';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Our Website</h1>
        <p className="mb-8 text-gray-600">How can we help you today?</p>
        <Chatbot />
      </div>
    </div>
  );
};

export default HomePage;`}
              </code>
            </pre>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Chatbot Image</h2>
        <p className="mb-4 text-gray-600">
          You can add an image or icon to represent your chatbot. Here's an example of how you might include it:
        </p>
        <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full flex items-center justify-center text-white">
            <Code size={48} />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Replace this placeholder with your actual chatbot image or icon.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Additional Considerations</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Ensure your chatbot API is secure and can handle the expected traffic.</li>
          <li>Implement error handling for API failures or timeouts.</li>
          <li>Consider adding features like typing indicators or message timestamps.</li>
          <li>Test thoroughly across different devices and browsers.</li>
        </ul>
      </section>

      <footer className="text-center text-sm text-gray-600 mt-12 border-t border-gray-200 pt-4">
        <p>Created with ❤️ by the OpenChat Team</p>
      </footer>
    </div>
  )
}
