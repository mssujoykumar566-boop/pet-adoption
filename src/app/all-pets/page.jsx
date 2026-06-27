'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import PetCard from '@/components/cardComponents/PetCard'
import { FiSearch } from 'react-icons/fi'
import { FaChevronDown } from 'react-icons/fa'
import { MdOutlinePets } from 'react-icons/md'

export default function AllPets() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const petCategory = [
    'All Species',
    'Dog',
    'Cat',
    'Bird',
    'Rabbit',
    'Hamster',
    'Fish',
    'Turtle',
    'Other'
  ]

  useEffect(() => {
    const controller = new AbortController()

    const fetchPets = async () => {
      try {
        setLoading(true)

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}pets?searchName=${name}&species=${species}`,
          { signal: controller.signal }
        )

        const data = await res.json()
        setPets(data || [])

      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPets()

    return () => controller.abort()
  }, [name, species])

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FFF8EE] to-[#FDF6EC] pt-32 pb-20">

      {/* HEADER */}
      <div className="text-center mb-12 px-4">

        <h1 className="text-4xl md:text-5xl font-black text-[#3D2B1F]">
          Find Your New
          <span className="text-[#C4844A] italic font-serif"> Companion</span>
        </h1>

        <p className="text-[#9E7E6A] mt-3 text-sm md:text-base">
          Search among loving pets waiting for adoption 🐾
        </p>

      </div>

      {/* SEARCH SECTION */}
      <div className="max-w-3xl mx-auto px-4 flex flex-col md:flex-row gap-3 mb-10">

        {/* SEARCH INPUT */}
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C4844A]" />

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Search pets..."
            className="w-full h-12 pl-11 pr-4 rounded-xl border border-[#E2D8C5] bg-white outline-none focus:ring-2 focus:ring-[#C4844A]"
          />
        </div>

        {/* DROPDOWN */}
        <div className="relative w-full md:w-56">

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full h-12 flex items-center justify-between px-4 rounded-xl bg-white border border-[#E2D8C5]"
          >
            {species || 'All Species'}
            <FaChevronDown
              className={`text-[#C4844A] transition ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.ul
                className="absolute z-50 w-full mt-2 bg-white border border-[#E2D8C5] rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {petCategory.map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setSpecies(item === 'All Species' ? '' : item)
                      setDropdownOpen(false)
                    }}
                    className="px-4 py-2 hover:bg-[#F6F1E8] cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-96 rounded-2xl bg-[#F2C4A0]/20 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && pets.length === 0 && (
        <div className="text-center py-20">
          <MdOutlinePets className="text-6xl mx-auto text-[#C4844A]" />
          <h3 className="text-xl font-bold mt-3 text-[#3D2B1F]">
            No Pets Found
          </h3>
          <p className="text-[#9E7E6A] text-sm mt-1">
            Try adjusting your search or filter
          </p>
        </div>
      )}

      {/* PET GRID */}
      {!loading && pets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {pets.map((pet, i) => (
            <motion.div
              key={pet._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <PetCard pet={pet} />
            </motion.div>
          ))}
        </div>
      )}

    </section>
  )
}