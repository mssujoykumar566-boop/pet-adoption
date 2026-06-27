'use client'

import CancelModal from '@/components/CancelModal'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function MyRequest() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  const [requests, setRequests] = useState([])

  useEffect(() => {
    if (!user) return

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}adoption-requests?adopterId=${user.id}`
    )
      .then((res) => res.json())
      .then((data) => setRequests(data || []))
      .catch(console.error)
  }, [user])

  const handleDelete = (id) => {
    setRequests((prev) => prev.filter((item) => item._id !== id))
  }

  const statusStyle = {
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Approved: 'bg-green-100 text-green-700 border-green-200',
    Rejected: 'bg-red-100 text-red-700 border-red-200'
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FFF8EE] to-[#FDF6EC] pt-32 pb-20 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-[#3D2B1F]">
            Your Requests
          </h1>

          <p className="text-[#9E7E6A] mt-2 text-sm md:text-base">
            Track all your adoption requests in one place
          </p>
        </div>

        <div className="bg-white border border-[#F2C4A0]/40 rounded-3xl shadow-xl overflow-hidden">

          <div className="hidden md:grid grid-cols-5 bg-[#F6F1E8] px-6 py-4 text-sm font-semibold text-[#3D2B1F] border-b border-[#E2D8C5]">
            <span>Pet</span>
            <span>Requested</span>
            <span>Pickup</span>
            <span>Status</span>
            <span className="text-center">Actions</span>
          </div>

          <div className="divide-y divide-[#F2C4A0]/30">

            {requests.length === 0 && (
              <div className="p-10 text-center text-[#9E7E6A] text-sm">
                No requests found 🐾
              </div>
            )}

            {requests.map((req) => (

              <div
                key={req._id}
                className="p-5 md:p-6 hover:bg-[#FFF8EE] transition"
              >

                {/* Mobile */}

                <div className="md:hidden space-y-4">

                  <div className="flex justify-between items-start">

                    <div>

                      <p className="text-xs text-[#9E7E6A]">
                        Pet Name
                      </p>

                      <h2 className="font-bold text-[#3D2B1F] text-lg">
                        {req.petName}
                      </h2>

                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full border font-semibold ${statusStyle[req.status]}`}
                    >
                      {req.status}
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">

                    <div>

                      <p className="text-xs text-[#9E7E6A]">
                        Requested
                      </p>

                      <p className="text-[#3D2B1F]">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </p>

                    </div>

                    <div>

                      <p className="text-xs text-[#9E7E6A]">
                        Pickup
                      </p>

                      <p className="text-[#3D2B1F]">
                        {req.pickupDate
                          ? new Date(req.pickupDate).toLocaleDateString()
                          : '—'}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-3">

                    <Link
                      href={`/details/${req.petId}`}
                      className="flex-1"
                    >

                      <button className="w-full bg-[#7A9E7E] hover:bg-[#6B8F6F] text-white py-2 rounded-xl text-sm font-semibold transition">
                        View
                      </button>

                    </Link>

                    <div className="flex-1">

                      <CancelModal
                        req={req}
                        onDelete={handleDelete}
                      />

                    </div>

                  </div>

                </div>

                                {/* Desktop */}

                <div className="hidden md:grid grid-cols-5 items-center gap-4">

                  <div className="font-semibold text-[#3D2B1F]">
                    {req.petName}
                  </div>

                  <div className="text-sm text-[#7A6A50]">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </div>

                  <div className="text-sm text-[#7A6A50]">
                    {req.pickupDate
                      ? new Date(req.pickupDate).toLocaleDateString()
                      : '—'}
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full border w-fit font-semibold ${statusStyle[req.status]}`}
                  >
                    {req.status}
                  </span>

                  <div className="flex justify-center gap-3">

                    <Link href={`/details/${req.petId}`}>

                      <button className="bg-[#7A9E7E] hover:bg-[#6B8F6F] text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
                        View
                      </button>

                    </Link>

                    <CancelModal
                      req={req}
                      onDelete={handleDelete}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  )
}