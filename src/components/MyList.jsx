"use client";

import { authClient } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  MdOutlinePets,
  MdCheckCircle,
} from "react-icons/md";

import { FaPaw } from "react-icons/fa";

import Mypet from "./cardComponents/Mypet";

export default function MyList() {
  const { data: session } = authClient.useSession();

  const [pets, setPets] = useState([]);

  const adoptedCount = pets.filter(
    (pet) => pet.adopted === true
  ).length;

  const availableCount = pets.length - adoptedCount;

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchPets = async () => {
      try {
        const { data: tokenData } =
          await authClient.token();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}pets?ownerId=${session.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData?.token}`,
            },
          }
        );

        const data = await res.json();

        setPets(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPets();
  }, [session]);

  const handleAdopted = (petId) => {
    setPets((prev) =>
      prev.map((pet) =>
        pet._id === petId
          ? { ...pet, adopted: true }
          : pet
      )
    );
  };

  const stats = [
    {
      title: "Total Listings",
      value: pets.length,
      icon: <MdOutlinePets />,
      color:
        "from-orange-500 to-amber-500",
    },
    {
      title: "Available",
      value: availableCount,
      icon: <FaPaw />,
      color:
        "from-emerald-500 to-green-500",
    },
    {
      title: "Adopted",
      value: adoptedCount,
      icon: <MdCheckCircle />,
      color:
        "from-sky-500 to-cyan-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20">

      {/* Blur */}

      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl"></div>

      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl"></div>

      <div className="container relative mx-auto px-5">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .6,
          }}
          className="mb-14 text-center"
        >

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-2 shadow-lg">

            <MdOutlinePets className="text-orange-500" />

            <span className="text-sm font-semibold text-gray-700">
              My Pet Dashboard
            </span>

          </div>

          <h1 className="text-4xl font-black text-gray-800 md:text-5xl">

            Your

            <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">

              {" "}Pet Listings

            </span>

          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-gray-500 leading-8">

            Manage all your listed pets, track
            adoptions and update their details
            whenever needed.

          </p>

        </motion.div>

        {/* Stats */}

        <div className="mb-16 grid gap-6 md:grid-cols-3">

          {stats.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * .15,
              }}
              whileHover={{
                y: -8,
              }}
              className="overflow-hidden rounded-3xl bg-white shadow-xl"
            >

              <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>

              <div className="flex items-center justify-between p-7">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-gray-800">
                    {item.value}
                  </h2>

                </div>

                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-3xl text-white shadow-lg`}>

                  {item.icon}

                </div>

              </div>

            </motion.div>

          ))}

        </div>

                {/* ================= Pet Grid ================= */}

        {pets.length > 0 ? (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .5 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >

            {pets.map((pet, index) => (

              <motion.div
                key={pet._id || index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: .45,
                  delay: index * .08,
                }}
                whileHover={{
                  y: -8,
                }}
              >

                <Mypet
                  pet={pet}
                  onAdopted={() =>
                    handleAdopted(pet._id)
                  }
                />

              </motion.div>

            ))}

          </motion.div>

        ) : (

          /* ================= Empty State ================= */

          <motion.div
            initial={{
              opacity: 0,
              scale: .95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: .5,
            }}
            className="mx-auto flex max-w-xl flex-col items-center rounded-[32px] border border-orange-100 bg-white p-12 text-center shadow-xl"
          >

            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 shadow-xl">

              <MdOutlinePets className="text-5xl text-white" />

            </div>

            <h2 className="mb-3 text-3xl font-black text-gray-800">

              No Pets Yet

            </h2>

            <p className="max-w-md leading-8 text-gray-500">

              You haven't added any pet listings yet.
              Once you create your first listing,
              it will appear here and you can manage,
              edit or mark it as adopted anytime.

            </p>

            <div className="mt-8 flex items-center gap-3 rounded-full bg-orange-50 px-6 py-3">

              <FaPaw className="text-orange-500" />

              <span className="text-sm font-semibold text-orange-500">

                Start by adding your first pet

              </span>

            </div>

          </motion.div>

        )}

      </div>

    </section>
  );
}