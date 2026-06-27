'use client'

import { authClient } from '@/lib/auth-client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaPaw } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { MdOutlinePets } from 'react-icons/md'

const labelClass =
  "block text-xs font-semibold text-[#7A6A50] uppercase tracking-wide mb-1.5"

const inputClass =
  "w-full h-12 rounded-xl border border-[#E2D8C5] bg-[#FFFDF8] px-4 text-sm text-[#3D2B1F] placeholder:text-[#9E7E6A] focus:outline-none focus:ring-2 focus:ring-[#C4844A]/40 focus:border-[#C4844A] transition-all duration-200 shadow-sm hover:shadow-md"

const selectClass =
  "w-full h-12 rounded-xl border border-[#E2D8C5] bg-[#FFFDF8] px-4 text-sm text-[#3D2B1F] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C4844A]/40 focus:border-[#C4844A] transition-all duration-200 shadow-sm hover:shadow-md"

export default function AddPets() {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const user = session?.user
  const name = user?.name

  const [token, setToken] = useState(null)

  useEffect(() => {
    const getToken = async () => {
      const { data: tokenData } = await authClient.token()
      setToken(tokenData?.token)
    }
    getToken()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const pet = {
      petName: data.petName,
      species: data.species,
      breed: data.breed || "Unknown",
      age: data.age.toString(),
      gender: data.gender,
      healthStatus: data.healthStatus,
      vaccinationStatus: data.vaccinationStatus,
      adoptionFee: data.adoptionFee ? data.adoptionFee.toString() : "0",
      location: data.location,
      imageUrl: data.imageUrl,
      description: data.description.replace(/\n/g, ' ').trim(),
      ownerName: name,
      ownerEmail: user?.email || "unknown@example.com",
      ownerId: user?.id || "unknown_id",
      adopted: false,
      createdAt: new Date()
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}pets`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(pet)
      }
    )

    const result = await res.json()

    if (result.insertedId) {
      toast.success('🐾 Pet added successfully!')
      router.push('/all-pets')
    } else {
      toast.error('Something went wrong!')
    }
  }

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay }
  })

  return (
    <div className="relative min-h-screen bg-[#FDF6EC] px-4 py-14 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F2C4A0]/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C8DFC9]/20 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto">

        {/* Header */}
        <motion.div className="text-center mb-10" {...fadeUp(0)}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F2C4A0] text-[#3D2B1F] text-sm font-semibold">
            <MdOutlinePets />
            Add New Pet
          </div>

          <h1 className="text-4xl font-black text-[#3D2B1F] mt-5">
            List a Pet for Adoption
          </h1>

          <p className="text-sm text-[#9E7E6A] mt-2">
            Fill details carefully — help a pet find a loving home 🐾
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-[#C4844A]/30" />
            <FaPaw className="text-[#C4844A]" />
            <div className="h-px w-16 bg-[#C4844A]/30" />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-[#FFFDF8] border border-[#E2D8C5] rounded-3xl shadow-[0_10px_40px_rgba(196,132,74,0.12)] p-6 md:p-10 space-y-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          <div className="grid md:grid-cols-2 gap-6">

            <div className="md:col-span-2">
              <label className={labelClass}>Pet Name</label>
              <input name="petName" className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Species</label>
              <select name="species" className={selectClass} required>
                <option value="">Select</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
                <option>Rabbit</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Breed</label>
              <input name="breed" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Age</label>
              <input name="age" className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Gender</label>
              <select name="gender" className={selectClass} required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Health</label>
              <select name="healthStatus" className={selectClass} required>
                <option>Healthy</option>
                <option>Minor Issues</option>
                <option>Under Treatment</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Vaccination</label>
              <select name="vaccinationStatus" className={selectClass}>
                <option>Fully Vaccinated</option>
                <option>Partial</option>
                <option>Not Vaccinated</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Fee</label>
              <input name="adoptionFee" type="number" className={inputClass} />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Location</label>
              <input name="location" className={inputClass} required />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Image URL</label>
              <input name="imageUrl" className={inputClass} />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                rows={4}
                className="w-full rounded-xl border border-[#E2D8C5] bg-[#FFFDF8] p-4 text-sm"
              />
            </div>

          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#3D2B1F] hover:bg-[#C4844A] text-white font-bold transition"
          >
            <FaPaw className="inline mr-2" />
            Submit Pet
          </button>

        </motion.form>
      </div>
    </div>
  )
}