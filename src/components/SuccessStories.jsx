'use client'

import React, { useEffect, useState } from 'react'
import SuccesssStoryCard from './cardComponents/SuccesssStoryCard'
import { FaPaw } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function SuccessStories() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}success-stories`)
      .then(res => res.json())
      .then(data => setStories(data || []))
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8EE] to-[#FDF6EC] py-24 px-6">

      {/* Background Blobs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#F2C4A0]/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#C8DFC9]/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          {/* badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-[#F2C4A0]/40 px-6 py-2 text-sm font-semibold text-[#3D2B1F] shadow-sm">
            ❤️ Happy Endings
          </span>

          {/* title */}
          <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight text-[#3D2B1F]">
            Our{" "}
            <span className="text-[#C4844A] italic font-serif">
              Success
            </span>{" "}
            Stories
          </h1>

          {/* subtitle */}
          <p className="mt-4 text-lg text-[#9E7E6A] max-w-2xl mx-auto leading-7">
            Every adoption is a new beginning. These heartwarming stories
            show how love changes lives forever.
          </p>

          {/* divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-20 bg-[#C4844A]/30" />
            <FaPaw className="text-[#C4844A]" />
            <div className="h-px w-20 bg-[#C4844A]/30" />
          </div>

        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {stories.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-[#9E7E6A] text-sm">
                No success stories found yet 🐾
              </p>
            </div>
          ) : (
            stories.map((storie, index) => (
              <motion.div
                key={storie._id || index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: 'easeOut'
                }}
                className="group"
              >
                <SuccesssStoryCard storie={storie} />
              </motion.div>
            ))
          )}

        </div>

      </div>
    </section>
  )
}