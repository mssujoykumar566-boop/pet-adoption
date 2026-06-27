"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MdOutlinePets } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

import hero from "../../public/hero.png";

export default function Banner() {
  const stats = [
    {
      number: "12K+",
      title: "Happy Pets",
    },
    {
      number: "850+",
      title: "Verified Homes",
    },
    {
      number: "98%",
      title: "Success Rate",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white">

      {/* Blur Background */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-10">

        <div className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
            className="max-w-xl text-center lg:text-left"
          >

            {/* Badge */}

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2 }}
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2 shadow-lg"
            >
              <MdOutlinePets className="text-orange-500 text-lg" />

              <span className="font-semibold text-sm text-gray-700">
                Find Your Perfect Pet
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .3 }}
              className="mt-6 text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
            >
              Give A Pet

              <br />

              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Forever Home
              </span>
            </motion.h1>

            {/* Description */}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .5 }}
              className="mt-6 text-gray-600 text-lg leading-8"
            >
              Every pet deserves love, care and a safe home.
              Browse thousands of adorable pets waiting for
              their forever family and start changing a life today.
            </motion.p>

            {/* Buttons */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >

              <Link href="/all-pets">

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{
                    scale: .95,
                  }}
                  className="group rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 font-semibold text-white shadow-xl transition"
                >
                  <span className="flex items-center gap-2">

                    <MdOutlinePets />

                    Adopt Now

                    <FaArrowRight className="group-hover:translate-x-1 transition" />

                  </span>

                </motion.button>

              </Link>

              <Link href="/all-pets">

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: .95,
                  }}
                  className="rounded-full border-2 border-orange-300 bg-white px-8 py-4 font-semibold text-gray-700 shadow-lg hover:bg-orange-50 transition"
                >
                  Browse Pets
                </motion.button>

              </Link>

            </motion.div>

            {/* Stats */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .8 }}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              {stats.map((item, index) => (

                <motion.div
                  whileHover={{
                    y: -6,
                  }}
                  key={index}
                  className="rounded-2xl bg-white/80 backdrop-blur-lg border border-orange-100 shadow-lg p-5"
                >

                  <h2 className="text-3xl font-black text-orange-500">
                    {item.number}
                  </h2>

                  <p className="mt-1 text-gray-600 text-sm">
                    {item.title}
                  </p>

                </motion.div>

              ))}
            </motion.div>

          </motion.div>
                    {/* RIGHT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-[520px] aspect-square"
          >
            {/* Rotating Ring */}

            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-orange-300"
            />

            {/* Glow */}

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute inset-6 rounded-full bg-orange-200/30 blur-3xl"
            />

            {/* Image */}

            <motion.div
              whileHover={{
                scale: 1.04,
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="relative h-full w-full overflow-hidden rounded-full border-[10px] border-white shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
            >
              <Image
                src={hero}
                alt="Hero"
                fill
                priority
                className="object-cover"
              />
            </motion.div>

            {/* Card 1 */}

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                delay: 1,
                duration: 0.4,
                y: {
                  duration: 3,
                  repeat: Infinity,
                },
              }}
              className="absolute bottom-6 left-0 rounded-2xl border border-orange-100 bg-white/90 backdrop-blur-xl px-5 py-4 shadow-xl"
            >
              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-2xl">
                  🏡
                </div>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Safe Adoption
                  </h3>

                  <p className="text-sm text-gray-500">
                    Verified Families
                  </p>
                </div>

              </div>
            </motion.div>

            {/* Card 2 */}

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              transition={{
                delay: 1.2,
                duration: 0.4,
                y: {
                  duration: 3.5,
                  repeat: Infinity,
                },
              }}
              className="absolute right-0 top-8 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-4 text-white shadow-2xl"
            >
              <div className="flex items-center gap-3">

                <MdOutlinePets className="text-3xl" />

                <div>
                  <h3 className="font-bold">
                    12K+
                  </h3>

                  <p className="text-sm text-orange-100">
                    Pets Adopted
                  </p>
                </div>

              </div>
            </motion.div>

            {/* Floating Circle */}

            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -right-8 bottom-24 h-16 w-16 rounded-full bg-gradient-to-r from-orange-300 to-yellow-300 blur-md opacity-70"
            />

            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="absolute -left-10 top-20 h-12 w-12 rounded-full bg-orange-200 blur-sm"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}