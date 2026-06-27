'use client'

import React from 'react'
import Image from 'next/image'
import cat from '../../public/cat.png'

import {
  MdOutlinePets,
  MdDisabledByDefault
} from 'react-icons/md'

import { CiSearch } from 'react-icons/ci'
import { FaHandHoldingHeart, FaHome } from 'react-icons/fa'

import { motion } from 'framer-motion'

const reasons = [
  {
    icon: <MdOutlinePets />,
    title: 'Save a Deserving Life',
    desc: 'Give a shelter pet a second chance at a loving forever home.'
  },
  {
    icon: <MdDisabledByDefault />,
    title: 'Fight Against Puppy Mills',
    desc: 'Support ethical adoption and stop harmful breeding practices.'
  },
  {
    icon: <CiSearch />,
    title: 'Find Your Perfect Match',
    desc: 'Discover pets of all ages, sizes, and personalities.'
  },
  {
    icon: <FaHome />,
    title: 'Create Space for Others',
    desc: 'Every adoption opens space for another rescued animal.'
  },
  {
    icon: <FaHandHoldingHeart />,
    title: 'Unmatched Loyalty',
    desc: 'Rescued pets form deep, lifelong emotional bonds.'
  }
]

export default function WhyAdopt() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8EE] to-[#FDF6EC] py-24 px-6">

      {/* Background Blobs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#F2C4A0]/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#C8DFC9]/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-[#F2C4A0]/40 px-6 py-2 text-sm font-semibold text-[#3D2B1F] shadow-sm">
            <MdOutlinePets className="text-[#C4844A]" />
            Make a Difference
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-black text-[#3D2B1F] tracking-tight">
            Why Should We{" "}
            <span className="text-[#C4844A] italic font-serif">
              Adopt
            </span>{" "}
            Pets?
          </h1>

          <p className="mt-4 text-lg text-[#9E7E6A] max-w-2xl mx-auto leading-7">
            Adopting a pet is not just a decision — it’s a lifelong bond
            filled with love, care, and loyalty.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-20 bg-[#C4844A]/30" />
            <MdOutlinePets className="text-[#C4844A]" />
            <div className="h-px w-20 bg-[#C4844A]/30" />
          </div>

        </motion.div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE SIDE */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <div className="relative group">

              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C4844A] to-[#E8A94F] opacity-20 blur-2xl scale-110 group-hover:opacity-40 transition" />

              {/* Rotating ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-dashed border-[#C4844A]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />

              {/* Floating image */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Image
                  src={cat}
                  alt="cat"
                  width={320}
                  height={320}
                  className="rounded-full border-4 border-[#F2C4A0] shadow-xl group-hover:scale-105 transition-transform duration-500"
                />
              </motion.div>

              {/* Badge */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#C4844A] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                🏡 Ready for Adoption
              </motion.div>

            </div>

          </motion.div>

          {/* REASONS LIST */}
          <div className="space-y-5">

            {reasons.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-5 rounded-2xl bg-white border border-[#F2C4A0]/40 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >

                {/* ICON */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#F2C4A0]/30 text-[#C4844A] text-xl">
                  {item.icon}
                </div>

                {/* TEXT */}
                <div>
                  <h3 className="font-bold text-[#3D2B1F] text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#7A6A50] leading-6">
                    {item.desc}
                  </p>
                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </div>
    </section>
  )
}