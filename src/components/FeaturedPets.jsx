"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa";
import { MdOutlinePets } from "react-icons/md";

import PetCard from "./cardComponents/PetCard";

export default function FeaturedPets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}pets`
        );

        const data = await res.json();

        setPets(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPets();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-24">

      {/* Background Blur */}

      <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-orange-200/30 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-yellow-200/30 blur-3xl"></div>

      <div className="container mx-auto px-5">

        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          {/* Badge */}

          <motion.div
            initial={{ opacity: 0, scale: .8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: .2 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-6 py-2 shadow-lg backdrop-blur"
          >

            <MdOutlinePets className="text-lg text-orange-500" />

            <span className="text-sm font-semibold text-gray-700">
              Featured Pets Collection
            </span>

          </motion.div>

          {/* Heading */}

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: .3 }}
            className="text-4xl font-black leading-tight text-gray-900 md:text-6xl"
          >

            Meet Your

            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">

              {" "}Perfect Companion

            </span>

          </motion.h2>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: .45 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500"
          >
            Browse our hand-picked adorable pets that are waiting
            for a loving family. Every adoption creates a happier
            life—for both you and your new best friend.
          </motion.p>

          {/* Divider */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: .6 }}
            className="mt-10 flex items-center justify-center gap-4"
          >

            <div className="h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent to-orange-300"></div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">

              <FaPaw className="text-orange-500 text-lg" />

            </div>

            <div className="h-[2px] w-20 rounded-full bg-gradient-to-l from-transparent to-orange-300"></div>

          </motion.div>

        </motion.div>

        {/* Pet Cards */}
                {/* Featured Pets Grid */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

          {pets.slice(0, 6).map((pet, index) => (

            <motion.div
              key={pet._id || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -10,
              }}
              className="h-full"
            >

              <PetCard pet={pet} />

            </motion.div>

          ))}

        </div>

        {/* Bottom CTA */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: .4 }}
          className="mt-20 flex flex-col items-center justify-center"
        >

          <p className="mb-6 max-w-xl text-center text-gray-500">
            Can't find your perfect companion yet? Explore our
            complete collection of lovely pets waiting for a
            forever home.
          </p>

          <Link href="/all-pets">

            <motion.button
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{
                scale: .96,
              }}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-9 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-orange-300/50"
            >

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative flex items-center gap-3">

                <MdOutlinePets className="text-xl" />

                View All Pets

              </span>

            </motion.button>

          </Link>

        </motion.div>

      </div>

    </section>
  );
}