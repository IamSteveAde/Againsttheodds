"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface BuyBookModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BuyBookModal({ isOpen, onClose }: BuyBookModalProps) {
  const [step, setStep] = useState(1)
  const [format, setFormat] = useState("Audiobook")
  const [language, setLanguage] = useState("English")
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  })

  if (!isOpen) return null

  const handleNextStep = () => {
    setStep(2)
  }

  const handleBackStep = () => {
    setStep(1)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckout = () => {
    setShowSuccess(true)
    setTimeout(() => {
      onClose()
      setStep(1)
      setShowSuccess(false)
    }, 2000)
  }

  const priceMap = {
    Audiobook: "£15",
    Paperback: "£37",
    Hardcover: "£49",
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg max-w-md w-full p-6 max-h-96 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="float-right text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>

        {step === 1 && !showSuccess && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Select Book Format</h2>

            <div className="space-y-3 mb-4">
              {(["Audiobook", "Paperback", "Hardcover"] as const).map((fmt) => (
                <label key={fmt} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value={fmt}
                    checked={format === fmt}
                    onChange={(e) => setFormat(e.target.value)}
                    className="mr-3"
                  />
                  <span>
                    {fmt} - {priceMap[fmt]} GBP
                  </span>
                </label>
              ))}
            </div>

            {format === "Audiobook" && (
              <div className="mb-4">
                <label className="block mb-2">Select Audiobook Language:</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option>English</option>
                  <option>Arabic</option>
                  <option>Mandarin</option>
                  <option>Japanese</option>
                  <option>Swahili</option>
                </select>
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-2">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value)))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              onClick={handleNextStep}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && !showSuccess && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>

            <div className="space-y-3 mb-4">
              {[
                { name: "fullName", placeholder: "John Doe", label: "Full Name" },
                { name: "email", placeholder: "example@mail.com", label: "Email" },
                { name: "phone", placeholder: "+234 800 000 0000", label: "Phone Number" },
                { name: "addressLine1", placeholder: "Street address", label: "Address Line 1" },
                { name: "addressLine2", placeholder: "Apartment, suite (optional)", label: "Address Line 2" },
                { name: "city", placeholder: "City", label: "City" },
                { name: "state", placeholder: "State/Province", label: "State/Province" },
                { name: "postalCode", placeholder: "ZIP / Postal code", label: "Postal Code" },
                { name: "country", placeholder: "Country", label: "Country" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm mb-1">{field.label}:</label>
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleBackStep}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={handleCheckout}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-green-600">Thank you! Your order has been added.</p>
          </div>
        )}
      </div>
    </div>
  )
}
