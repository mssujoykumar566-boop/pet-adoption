"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useRouter, usePathname } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { toast } from "react-toastify";

import { AnimatePresence, motion } from "framer-motion";

import { FaPaw } from "react-icons/fa";

import { MdDashboard, MdOutlinePets } from "react-icons/md";

import { HiMenuAlt3, HiX } from "react-icons/hi";

import { IoLogOutOutline } from "react-icons/io5";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/all-pets",
    label: "All Pets",
  },
  {
    href: "/add-pets",
    label: "Add Pet",
  },
];

export default function Navbar() {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const router = useRouter();

  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  const logOutButton = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("Logged out successfully");
        },
      },
    });
  };

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-50">
        <div className="container mx-auto px-5">
          <div className="flex h-[74px] items-center justify-between rounded-3xl border border-orange-100/70 bg-white/80 px-6 shadow-[0_12px_40px_rgba(0,0,0,.08)] backdrop-blur-xl">
            {/* Logo */}

            <Link href="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-amber-400 blur-lg opacity-40 group-hover:opacity-70 transition-all"></div>

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
                  <Image src="/logo.png" alt="PetNest" width={44} height={44} />
                </div>
              </div>

              <div className="hidden sm:block">
                <h2 className="text-xl font-black text-gray-800">PetNest</h2>

                <p className="text-xs font-medium text-orange-500">
                  Adopt • Love • Care
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}

            <nav className="hidden lg:block">
              <ul className="flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50/60 p-2">
                {navLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        pathname === item.href
                          ? "text-white"
                          : "text-gray-700 hover:text-orange-500"
                      }`}
                    >
                      {pathname === item.href && (
                        <motion.span
                          layoutId="navbar-active"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.5,
                          }}
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500"
                        />
                      )}

                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Side */}

            <div className="flex items-center gap-3">
              {session ? (
                <div className="flex items-center gap-3">
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="group cursor-pointer">
                      <div className="relative">
                        {/* Glow */}

                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 blur-md opacity-0 transition duration-300 group-hover:opacity-50"></div>

                        {/* Avatar */}

                        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-orange-200 bg-white shadow-lg transition duration-300 group-hover:border-orange-400">
                          {user?.image ? (
                            <Image
                              src={user.image}
                              alt={user.name || "User"}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-orange-500 to-amber-500 text-lg font-bold text-white">
                              {user?.name?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                    </label>

                    {/* Dropdown */}

                    <ul
                      tabIndex={0}
                      className="dropdown-content mt-5 w-80 overflow-hidden rounded-3xl border border-orange-100 bg-white p-0 shadow-[0_20px_60px_rgba(0,0,0,.12)]"
                    >
                      {/* User Card */}

                      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 text-white">
                        <div className="flex items-center gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 text-2xl font-bold backdrop-blur">
                            {user?.name?.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <h3 className="text-lg font-bold">{user?.name}</h3>

                            <p className="text-sm text-orange-100">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu */}

                      <div className="space-y-2 p-4">
                        <li>
                          <Link
                            href="/dashboard"
                            className="group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 hover:bg-orange-50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                                <MdDashboard />
                              </div>

                              <span className="font-medium text-gray-700">
                                Dashboard
                              </span>
                            </div>

                            <span className="text-orange-400 opacity-0 transition group-hover:opacity-100">
                              →
                            </span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            href="/all-pets"
                            className="group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 hover:bg-orange-50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                                <MdOutlinePets />
                              </div>

                              <span className="font-medium text-gray-700">
                                Browse Pets
                              </span>
                            </div>

                            <span className="text-orange-400 opacity-0 transition group-hover:opacity-100">
                              →
                            </span>
                          </Link>
                        </li>

                        {/* Logout */}

                        <div className="mt-3 border-t border-orange-100 pt-3">
                          <li>
                            <button
                              onClick={logOutButton}
                              className="group flex w-full items-center justify-between rounded-2xl px-4 py-3 text-red-500 transition-all duration-300 hover:bg-red-50"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                                  <IoLogOutOutline className="text-lg" />
                                </div>

                                <span className="font-medium">Sign Out</span>
                              </div>

                              <span className="opacity-0 transition group-hover:opacity-100">
                                →
                              </span>
                            </button>
                          </li>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="hidden items-center gap-3 lg:flex">
                  <Link
                    href="/login"
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:text-orange-500"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-orange-300/50"
                  >
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <span className="relative flex items-center gap-2">
                      <FaPaw />
                      Get Started
                    </span>
                  </Link>
                </div>
              )}

              {/* Mobile Toggle */}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-gray-700 transition-all duration-300 hover:bg-orange-100 lg:hidden"
              >
                {mobileOpen ? (
                  <HiX className="text-2xl" />
                ) : (
                  <HiMenuAlt3 className="text-2xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= Mobile Drawer ================= */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}

            <div
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />

            {/* Drawer */}

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="absolute right-0 top-0 flex h-full w-[320px] flex-col overflow-hidden bg-white shadow-2xl"
            >
              {/* Header */}

              <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 text-white">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                      <FaPaw className="text-xl" />
                    </div>

                    <div>
                      <h2 className="text-lg font-black">PetNest</h2>

                      <p className="text-xs text-orange-100">
                        Adopt • Love • Care
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl bg-white/20 p-2"
                  >
                    <HiX className="text-xl" />
                  </button>
                </div>

                {session && (
                  <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white">
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-orange-500">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="overflow-hidden">
                      <h3 className="truncate font-bold">{user?.name}</h3>

                      <p className="truncate text-sm text-orange-100">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}

              <div className="flex-1 overflow-y-auto p-5">
                <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-gray-400">
                  Navigation
                </p>

                <div className="space-y-2">
                  {navLinks.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: 0,
                        x: 25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-5 py-4 font-semibold transition-all duration-300 ${
                          pathname === item.href
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                            : "text-gray-700 hover:bg-orange-50"
                        }`}
                      >
                        <span>{item.label}</span>

                        {pathname === item.href && (
                          <span className="text-lg">•</span>
                        )}
                      </Link>
                    </motion.div>
                  ))}

                  {session && (
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="mt-4 flex items-center gap-4 rounded-2xl bg-orange-50 px-5 py-4 font-semibold text-orange-600 transition hover:bg-orange-100"
                    >
                      <MdDashboard className="text-xl" />
                      Dashboard
                    </Link>
                  )}
                </div>
              </div>

              {/* Bottom Section */}

              <div className="border-t border-orange-100 bg-orange-50/40 p-5">
                {session ? (
                  <button
                    onClick={() => {
                      logOutButton();
                      setMobileOpen(false);
                    }}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 px-5 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
                  >
                    <IoLogOutOutline className="text-xl transition group-hover:-translate-x-1" />
                    Sign Out
                  </button>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex w-full items-center justify-center rounded-2xl border border-orange-200 bg-white px-5 py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:border-orange-400 hover:text-orange-500"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-5 py-3.5 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-orange-300/60"
                    >
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                      <span className="relative flex items-center gap-2">
                        <FaPaw />
                        Get Started
                      </span>
                    </Link>
                  </div>
                )}

                {/* Footer */}

                <div className="mt-6 border-t border-orange-100 pt-5 text-center">
                  <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold text-orange-500">
                      PetNest
                    </span>
                  </p>

                  <p className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
                    Made with
                    <FaPaw className="text-orange-500 animate-pulse" />
                    for every pet
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
