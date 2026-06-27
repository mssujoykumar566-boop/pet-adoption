"use client";

import React from "react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import { MdOutlinePets } from "react-icons/md";

import { FaHome,   } from "react-icons/fa";

import { FaBowlFood, FaHospital, FaShieldHeart } from "react-icons/fa6";

import { IoLogoOctocat } from "react-icons/io5";

import "swiper/css";
import "swiper/css/pagination";

const cards = [
  {
    icon: <FaBowlFood />,
    title: "Nutrition & Hydration",
    desc: "Feed high-quality food suitable for your pet's age and breed. Always provide fresh water and avoid harmful foods.",
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-100",
  },
  {
    icon: <FaHospital />,
    title: "Routine Vet Care",
    desc: "Schedule regular health checkups, vaccinations and parasite prevention to keep your companion healthy.",
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-100",
  },
  {
    icon: <IoLogoOctocat />,
    title: "Exercise & Play",
    desc: "Daily walks, toys and fun activities help maintain physical health while reducing stress and boredom.",
    color: "from-sky-500 to-cyan-500",
    bg: "bg-sky-100",
  },
  {
    icon: <FaHome />,
    title: "Safe Environment",
    desc: "Create a secure home, keep dangerous objects away and make sure your pet always wears identification.",
    color: "from-violet-500 to-fuchsia-500",
    bg: "bg-violet-100",
  },
  {
    icon: <FaShieldHeart />,
    title: "Love & Care",
    desc: "Spend quality time every day. Love, patience and positive training create lifelong trust.",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-100",
  },
];

export default function PetCare() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-24">
      {/* Background */}

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-orange-200/30 blur-3xl" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-yellow-200/30 blur-3xl" />

      <div className="container relative mx-auto px-5">
        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-2 shadow-lg">
            <MdOutlinePets className="text-orange-500" />

            <span className="text-sm font-semibold text-gray-700">
              Pet Care Guide
            </span>
          </div>

          <h2 className="text-4xl font-black text-gray-800 md:text-5xl">
            Keep Your
            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              {" "}
              Best Friend Healthy
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-500">
            Every pet deserves a safe, healthy and happy life. Follow these
            essential care tips to ensure your furry companion enjoys every
            moment with you.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-orange-200"></div>

            <MdOutlinePets className="text-2xl text-orange-500" />

            <div className="h-px w-20 bg-orange-200"></div>
          </div>
        </motion.div>

        {/* Swiper */}

        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          spaceBetween={28}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} className="pb-12">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  y: -12,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                }}
                className="group relative h-full overflow-hidden rounded-[30px] border border-orange-100 bg-white p-7 shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                {/* Gradient Top */}

                <div
                  className={`absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r ${card.color}`}
                ></div>

                {/* Glow */}

                <div
                  className={`absolute -right-12 -top-12 h-40 w-40 rounded-full ${card.bg} blur-3xl opacity-40 transition duration-500 group-hover:scale-125`}
                ></div>

                {/* Icon */}

                <div
                  className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${card.bg}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${card.color} text-2xl text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                  >
                    {card.icon}
                  </div>
                </div>

                {/* Title */}

                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  {card.title}
                </h3>

                {/* Divider */}

                <div className="mb-4 h-px w-full bg-gradient-to-r from-orange-200 via-orange-100 to-transparent"></div>

                {/* Description */}

                <p className="leading-7 text-gray-500">{card.desc}</p>

                {/* Bottom Badge */}

                <div className="mt-8 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full bg-gradient-to-r ${card.color}`}
                  ></span>

                  <span className="text-sm font-medium text-gray-400">
                    Pet Care Tip
                  </span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
