"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  FaFacebookF,
  FaInstagram,
  FaPaw,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdArrowOutward,
} from "react-icons/md";

import { FaHome } from "react-icons/fa";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { MdPrivacyTip } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF4E8] pt-20">

      {/* Background Blur */}

      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl"></div>

      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl"></div>

      <div className="container relative mx-auto px-6">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* ================= Brand ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
          >

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 shadow-xl">

                <FaPaw className="text-2xl text-white" />

              </div>

              <div>

                <h2 className="text-2xl font-black text-gray-800">
                  PetNest
                </h2>

                <p className="text-sm text-orange-500">
                  Adopt • Love • Care
                </p>

              </div>

            </div>

            <p className="leading-8 text-gray-500">

              Connecting loving families with adorable pets.
              Every adoption gives a second chance to an
              innocent life and fills a home with happiness.

            </p>

            {/* Social */}

            <div className="mt-8 flex gap-4">

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:text-white"
              >
                <FaFacebookF />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-pink-500 hover:text-white"
              >
                <FaInstagram />
              </Link>

              <Link
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-900 hover:text-white"
              >
                <FaXTwitter />
              </Link>

            </div>

          </motion.div>

          {/* ================= Contact ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: .1 }}
          >

            <h3 className="mb-6 text-lg font-bold text-gray-800">
              Contact Us
            </h3>

            <div className="space-y-5">

              <a
                href="mailto:support@petnest.com"
                className="group flex items-start gap-3"
              >

                <div className="rounded-xl bg-orange-100 p-3 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">

                  <MdEmail />

                </div>

                <div>

                  <p className="text-sm font-semibold text-gray-800">
                    Email
                  </p>

                  <p className="text-sm text-gray-500">
                   support@petnest.com
                  </p>

                </div>

              </a>

              <a
                href="tel:+880 1234-567890"
                className="group flex items-start gap-3"
              >

                <div className="rounded-xl bg-orange-100 p-3 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">

                  <MdPhone />

                </div>

                <div>

                  <p className="text-sm font-semibold text-gray-800">
                    Phone
                  </p>

                  <p className="text-sm text-gray-500">
                   +880 1234-567890
                  </p>

                </div>

              </a>

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-orange-100 p-3 text-orange-500">

                  <MdLocationOn />

                </div>

                <div>

                  <p className="text-sm font-semibold text-gray-800">
                    Address
                  </p>

                  <p className="text-sm text-gray-500">
                    Dhaka, Bangladesh
                  </p>

                </div>

              </div>

            </div>

          </motion.div>
                    {/* ================= Quick Links ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: .2 }}
          >

            <h3 className="mb-6 text-lg font-bold text-gray-800">
              Quick Links
            </h3>

            <div className="space-y-4">

              {[
                {
                  name: "Home",
                  href: "/",
                  icon: <FaHome />,
                },
                {
                  name: "All Pets",
                  href: "/all-pets",
                  icon: <HiMiniSquares2X2 />,
                },
                {
                  name: "Privacy Policy",
                  href: "/privacy-policy",
                  icon: <MdPrivacyTip />,
                },
              ].map((item) => (

                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 hover:bg-orange-50"
                >

                  <div className="flex items-center gap-3">

                    <span className="text-orange-500">
                      {item.icon}
                    </span>

                    <span className="text-gray-600 group-hover:text-orange-500">
                      {item.name}
                    </span>

                  </div>

                  <MdArrowOutward className="text-gray-400 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-orange-500" />

                </Link>

              ))}

            </div>

          </motion.div>

          {/* ================= Newsletter ================= */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: .3 }}
          >

            <h3 className="mb-6 text-lg font-bold text-gray-800">
              Newsletter
            </h3>

            <p className="mb-6 text-sm leading-7 text-gray-500">
              Subscribe to receive adoption stories,
              pet care tips and updates about newly
              available pets.
            </p>

            <form className="space-y-4">

              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 w-full rounded-2xl border border-orange-200 bg-white px-4 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-200/40"
              />

              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-orange-300/50"
              >

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">
                  Subscribe Now
                </span>

              </button>

            </form>

          </motion.div>

        </div>

        {/* Divider */}

        <div className="my-14 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>

        {/* Bottom Footer */}

        <div className="flex flex-col items-center justify-between gap-5 pb-8 text-center md:flex-row">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-orange-500">
              PetNest
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500">

            Made with

            <FaPaw className="animate-pulse text-orange-500" />

            for every furry friend 🧡

          </div>

        </div>

      </div>

    </footer>
  );
}