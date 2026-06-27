'use client'

import { FaCat, FaHandHoldingHeart, FaStar } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const stats = [
  {
    icon: <FaCat />,
    value: "12K+",
    label: "Happy Pets",
    gradient: "from-[#C4844A] to-[#B8773F]",
    glow: "bg-[#F2C4A0]"
  },
  {
    icon: <IoHome />,
    value: "850+",
    label: "Verified Homes",
    gradient: "from-[#7A9E7E] to-[#6B8F6F]",
    glow: "bg-[#C8DFC9]"
  },
  {
    icon: <FaHandHoldingHeart />,
    value: "98%",
    label: "Customer Satisfaction",
    gradient: "from-[#E8A94F] to-[#D4963C]",
    glow: "bg-[#F5DBA8]"
  },
  {
    icon: <FaEarthAmericas />,
    value: "24+",
    label: "Cities Covered",
    gradient: "from-[#8B5E3C] to-[#7A4F30]",
    glow: "bg-[#D4B49A]"
  },
  {
    icon: <FaStar />,
    value: "4.9★",
    label: "Average Rating",
    gradient: "from-[#D4844A] to-[#C4773F]",
    glow: "bg-[#F5C4A0]"
  }
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8EE] to-[#FDF6EC] py-24">

      {/* Background Blobs */}
      <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-[#F2C4A0]/30 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#C8DFC9]/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">

          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-6 py-2 text-sm font-semibold text-[#3D2B1F] border border-[#F2C4A0]/40 shadow-sm">
            🐾 Trusted by Pet Lovers
          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl font-black tracking-tight text-[#3D2B1F]">
            Making Every Pet Feel at Home
          </h2>

          <p className="mt-5 text-lg text-[#9E7E6A] leading-7">
            PetNest connects pet parents with trusted sitters, loving homes,
            and safe care experiences for their furry companions.
          </p>

        </div>

        {/* Slider */}
        <div className="mt-20">

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={25}
            loop={true}
            autoplay={{
              delay: 2400,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-14"
          >

            {stats.map((item, index) => (
              <SwiperSlide key={index}>

                <div className="group relative rounded-3xl bg-white border border-[#F2C4A0]/40 p-8 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

                  {/* Top Accent Line */}
                  <div className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${item.gradient} rounded-t-3xl`} />

                  {/* Glow Effect */}
                  <div className={`absolute -top-10 -right-10 h-36 w-36 rounded-full ${item.glow} opacity-40 blur-3xl transition-all duration-500 group-hover:scale-150`} />

                  <div className="relative z-10">

                    {/* Icon */}
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.icon}
                    </div>

                    {/* Value */}
                    <h3 className="mt-6 text-5xl font-black text-[#3D2B1F] tracking-tight">
                      {item.value}
                    </h3>

                    {/* Label */}
                    <p className="mt-2 text-base font-medium text-[#9E7E6A]">
                      {item.label}
                    </p>

                  </div>

                </div>

              </SwiperSlide>
            ))}

          </Swiper>

        </div>

      </div>
    </section>
  );
}