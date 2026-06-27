'use client'

import React, { useEffect, useState } from 'react'
import { FaPaw } from 'react-icons/fa'
import { MdEmail, MdOutlinePets } from 'react-icons/md'
import { IoCalendar } from 'react-icons/io5'
import { authClient } from '@/lib/auth-client'
import { toast } from 'react-toastify'

export default function RequestModal({ pet, onAdopted }) {
  const [users, setUsers] = useState([])
  const [loadingId, setLoadingId] = useState(null)

  useEffect(() => {
    if (!pet?._id) return

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}adoption-requests/pet/${pet._id}`)
      .then(res => res.json())
      .then(data => setUsers(data || []))
  }, [pet?._id])

  const updateStatus = async (userId, status, successMsg) => {
    try {
      setLoadingId(userId)

      const { data: tokenData } = await authClient.token()

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}adoption-requests/${userId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify({ status })
        }
      )

      if (!res.ok) throw new Error('Request failed')

      setUsers(prev =>
        prev.map(u =>
          u._id === userId ? { ...u, status } : u
        )
      )

      toast.success(successMsg)
      onAdopted?.()

    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setLoadingId(null)
    }
  }

  const handleApprove = (id) => updateStatus(id, 'Approved', 'Approved')
  const handleReject = (id) => updateStatus(id, 'Rejected', 'Rejected')

  return (
    <div>

      {/* Trigger Button */}
      <button
        onClick={() =>
          document.getElementById(`request_modal_${pet._id}`).showModal()
        }
        className="relative w-full overflow-hidden bg-amber-100/50 hover:bg-amber-600 border border-amber-400/30 hover:border-amber-600 text-amber-800 hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 group"
      >
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />

        <span className="relative flex items-center justify-center gap-2">
          Requests

          {users.length > 0 && (
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-bold">
              {users.length}
            </span>
          )}
        </span>
      </button>

      {/* Modal */}
      <dialog id={`request_modal_${pet._id}`} className="modal">

        <div className="modal-box bg-white rounded-3xl border border-amber-100 shadow-xl p-0 max-w-lg overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 bg-amber-50 border-b border-amber-100">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white">
                <FaPaw />
              </div>

              <div>
                <h2 className="font-bold text-gray-800 text-sm">
                  Adoption Requests
                </h2>
                <p className="text-xs text-gray-500">{pet.petName}</p>
              </div>
            </div>

            <span className="text-xs px-3 py-1 rounded-full font-semibold bg-amber-200 text-amber-800">
              {users.length} Requests
            </span>
          </div>

          {/* BODY */}
          <div className="px-6 py-5 max-h-[60vh] overflow-y-auto space-y-4">

            {users.length === 0 && (
              <div className="text-center py-10">
                <MdOutlinePets className="text-4xl mx-auto text-amber-500 mb-2" />
                <p className="font-semibold text-gray-700">No requests yet</p>
                <p className="text-xs text-gray-400">
                  Adoption requests will appear here
                </p>
              </div>
            )}

            {users.map((user) => (
              <div
                key={user._id}
                className="border border-amber-100 rounded-2xl p-4 bg-white hover:shadow-md transition"
              >

                {/* USER INFO */}
                <div className="flex justify-between mb-2">

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {user.adopterName?.[0]?.toUpperCase() ?? 'U'}
                      </div>

                      <p className="font-semibold text-sm text-gray-800">
                        {user.adopterName}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 ml-10 text-xs text-gray-500">
                      <MdEmail />
                      {user.adopterEmail}
                    </div>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full font-semibold border bg-gray-50">
                    {user.status || 'Pending'}
                  </span>
                </div>

                {/* PICKUP DATE */}
                <div className="flex items-center gap-2 text-xs text-gray-600 my-2">
                  <IoCalendar />
                  Pickup: {user.pickupDate}
                </div>

                {/* MESSAGE */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-3 text-xs italic text-gray-600">
                  "{user.message}"
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2">

                  <button
                    onClick={() => handleApprove(user._id)}
                    disabled={loadingId === user._id || user.status !== 'Pending'}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-green-100 hover:bg-green-600 text-green-700 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loadingId === user._id ? 'Processing...' : 'Approve'}
                  </button>

                  <button
                    onClick={() => handleReject(user._id)}
                    disabled={loadingId === user._id || user.status !== 'Pending'}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold bg-red-100 hover:bg-red-600 text-red-500 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loadingId === user._id ? 'Processing...' : 'Reject'}
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t border-amber-100 bg-amber-50 flex justify-end">
            <form method="dialog">
              <button className="px-5 py-2 text-xs rounded-xl bg-gray-900 text-white hover:bg-amber-600 transition">
                Close
              </button>
            </form>
          </div>

        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>

      </dialog>

    </div>
  )
}