'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { FaPaw, FaPlus, FaList, FaHeart } from 'react-icons/fa'
import { MdOutlinePets } from 'react-icons/md'

import MyList from '@/components/MyList'
// import MyRequest from '@/components/MyRequest'
import AddPets from '../add-pets/page'
import MyRequest from '../my-requests/page'
// import AddPets from '@/components/AddPets'

const navItems = [
  { key: 'list', label: 'My List', icon: <FaList /> },
  { key: 'add-pets', label: 'Add Pet', icon: <FaPlus /> },
  { key: 'my-requests', label: 'Requests', icon: <FaHeart /> }
]

export default function Dashboard() {
  const [section, setSection] = useState('list')

  const renderSection = () => {
    switch (section) {
      case 'list':
        return <MyList />
      case 'add-pets':
        return <AddPets />
      case 'my-requests':
        return <MyRequest />
      default:
        return <MyList />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8EE] to-[#FDF6EC]">

      <div className="drawer lg:drawer-open">

        <input id="drawer" type="checkbox" className="drawer-toggle" />

        {/* MAIN CONTENT */}
        <div className="drawer-content">

          {/* MOBILE TOP BAR */}
          <div className="lg:hidden flex items-center justify-between px-5 py-4 bg-white border-b border-[#E2D8C5]">

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#C4844A] flex items-center justify-center">
                <FaPaw className="text-white" />
              </div>

              <h1 className="font-bold text-[#3D2B1F]">
                Dashboard
              </h1>
            </div>

            <label htmlFor="drawer" className="cursor-pointer space-y-1">
              <span className="block w-6 h-0.5 bg-[#C4844A]" />
              <span className="block w-6 h-0.5 bg-[#C4844A]" />
              <span className="block w-4 h-0.5 bg-[#C4844A]" />
            </label>

          </div>

          {/* PAGE CONTENT */}
          <div className="p-4 md:p-6">

            <AnimatePresence mode="wait">
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* SIDEBAR */}
        <div className="drawer-side z-40">

          <label htmlFor="drawer" className="drawer-overlay" />

          <aside className="w-72 min-h-full bg-white border-r border-[#E2D8C5] flex flex-col">

            {/* HEADER */}
            <div className="p-6 border-b border-[#E2D8C5]">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 bg-[#C4844A] rounded-xl flex items-center justify-center shadow">
                  <FaPaw className="text-white" />
                </div>

                <div>
                  <h2 className="font-black text-[#3D2B1F]">
                    PetNest
                  </h2>
                  <p className="text-xs text-[#9E7E6A]">
                    Dashboard Panel
                  </p>
                </div>

              </div>

            </div>

            {/* NAV */}
            <div className="flex-1 p-3 space-y-1">

              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setSection(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all
                    ${
                      section === item.key
                        ? 'bg-[#C4844A] text-white shadow'
                        : 'text-[#7A6A50] hover:bg-[#F6F1E8]'
                    }`}
                >

                  <span className="text-base">
                    {item.icon}
                  </span>

                  {item.label}

                  {section === item.key && (
                    <span className="ml-auto w-2 h-2 bg-white rounded-full" />
                  )}

                </button>
              ))}

            </div>

            {/* FOOTER */}
            <div className="p-5 border-t border-[#E2D8C5] text-xs text-[#9E7E6A] flex items-center gap-2">
              <FaPaw className="text-[#C4844A]" />
              PetNest Dashboard
              <MdOutlinePets />
            </div>

          </aside>

        </div>

      </div>

    </div>
  )
}