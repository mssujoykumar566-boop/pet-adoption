"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

import { MdModeEditOutline } from "react-icons/md";
import { FaPaw } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500";

const inputClass =
  "h-11 w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-200/40";

const selectClass =
  "h-11 w-full cursor-pointer appearance-none rounded-2xl border border-orange-100 bg-orange-50/60 px-4 pr-10 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-200/40";

const textareaClass =
  "min-h-[110px] w-full rounded-2xl border border-orange-100 bg-orange-50/60 px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-200/40 resize-none";

export default function EditModal({ pet }) {
  const { data: session } = authClient.useSession();

  const userEmail = session?.user?.email;

  const {
    _id,
    petName,
    species,
    breed = "",
    age,
    gender,
    healthStatus,
    vaccinationStatus,
    adoptionFee,
    location,
    imageUrl,
    description,
  } = pet || {};

  const petId = _id?.toString();

  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const { data } = await authClient.token();
      setToken(data?.token || "");
    };

    getToken();
  }, []);

  const closeModal = () => {
    document.getElementById(`edit_modal_${petId}`)?.close();
  };

  const openModal = () => {
    document.getElementById(`edit_modal_${petId}`)?.showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const updatedData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}pets/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed");
      }

      toast.success("Pet updated successfully");

      closeModal();

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update pet");
    }
  };

  return (
    <div>

      {/* Trigger Button */}

      <button
        onClick={openModal}
        className="group relative flex h-11 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-orange-300/50 hover:from-amber-600 hover:to-orange-600 active:scale-95"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <span className="relative flex items-center gap-2">
          <MdModeEditOutline className="text-lg" />
          Edit Pet
        </span>
      </button>

      {/* Modal */}

      <dialog
        id={`edit_modal_${petId}`}
        className="modal"
      >
        <div className="modal-box max-h-[92vh] max-w-3xl overflow-hidden rounded-[30px] border border-orange-100 bg-white p-0 shadow-[0_25px_80px_rgba(0,0,0,.12)]">

          {/* Header */}

          <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 px-8 py-6 text-white">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

                <MdModeEditOutline className="text-3xl" />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Edit Pet
                </h2>

                <p className="text-sm text-orange-100">
                  Update your pet information
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={closeModal}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 transition hover:bg-white hover:text-orange-500"
            >
              <FiX className="text-xl" />
            </button>

          </div>

          {/* Form */}

          <div className="max-h-[65vh] overflow-y-auto px-8 py-7">

            <form
              id={`edit_form_${petId}`}
              onSubmit={handleSubmit}
            >

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                {/* Pet Name */}

                <div className="md:col-span-2">
                  <label className={labelClass}>Pet Name</label>

                  <input
                    name="petName"
                    defaultValue={petName}
                    required
                    placeholder="Buddy"
                    className={inputClass}
                  />
                </div>

                {/* Species */}

                <div>
                  <label className={labelClass}>Species</label>

                  <div className="relative">

                    <select
                      name="species"
                      defaultValue={species}
                      required
                      className={selectClass}
                    >
                      <option value="">Select Species</option>
                      <option>Dog</option>
                      <option>Cat</option>
                      <option>Bird</option>
                      <option>Rabbit</option>
                      <option>Hamster</option>
                      <option>Fish</option>
                      <option>Turtle</option>
                      <option>Other</option>
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
                      ▾
                    </span>

                  </div>
                </div>

                {/* Breed */}

                <div>
                  <label className={labelClass}>Breed</label>

                  <input
                    name="breed"
                    defaultValue={breed}
                    placeholder="Golden Retriever"
                    className={inputClass}
                  />
                </div>

                {/* Age */}

                <div>
                  <label className={labelClass}>Age</label>

                  <input
                    name="age"
                    defaultValue={age}
                    required
                    placeholder="2 Years"
                    className={inputClass}
                  />
                </div>

                {/* Gender */}

                <div>
                  <label className={labelClass}>Gender</label>

                  <div className="relative">

                    <select
                      name="gender"
                      defaultValue={gender}
                      required
                      className={selectClass}
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
                      ▾
                    </span>

                  </div>
                </div>

                {/* Health Status */}

                <div>
                  <label className={labelClass}>Health Status</label>

                  <div className="relative">

                    <select
                      name="healthStatus"
                      defaultValue={healthStatus}
                      required
                      className={selectClass}
                    >
                      <option value="">Select Status</option>
                      <option>Healthy</option>
                      <option>Minor Issues</option>
                      <option>Under Treatment</option>
                      <option>Needs Special Care</option>
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
                      ▾
                    </span>

                  </div>
                </div>

                {/* Vaccination */}

                <div>
                  <label className={labelClass}>
                    Vaccination Status
                  </label>

                  <div className="relative">

                    <select
                      name="vaccinationStatus"
                      defaultValue={vaccinationStatus}
                      required
                      className={selectClass}
                    >
                      <option value="">Select Status</option>
                      <option>Fully Vaccinated</option>
                      <option>Partially Vaccinated</option>
                      <option>Not Vaccinated</option>
                      <option>Unknown</option>
                    </select>

                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
                      ▾
                    </span>

                  </div>
                </div>

                                {/* Adoption Fee */}

                <div>
                  <label className={labelClass}>
                    Adoption Fee ($)
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-orange-500">
                      $
                    </span>

                    <input
                      type="number"
                      name="adoptionFee"
                      defaultValue={adoptionFee}
                      min={0}
                      placeholder="0"
                      className="h-11 w-full rounded-2xl border border-orange-100 bg-orange-50/60 pl-8 pr-4 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-200/40"
                    />

                  </div>
                </div>

                {/* Location */}

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Shelter / Location
                  </label>

                  <input
                    name="location"
                    defaultValue={location}
                    required
                    placeholder="Happy Paws Shelter"
                    className={inputClass}
                  />
                </div>

                {/* Image URL */}

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Pet Image URL
                  </label>

                  <input
                    type="url"
                    name="imageUrl"
                    defaultValue={imageUrl}
                    placeholder="https://example.com/image.jpg"
                    className={inputClass}
                  />
                </div>

                {/* Description */}

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Description
                  </label>

                  <textarea
                    rows={4}
                    name="description"
                    defaultValue={description}
                    required
                    placeholder="Tell adopters about this lovely pet..."
                    className={textareaClass}
                  />
                </div>

                {/* Owner Email */}

                <div className="md:col-span-2">
                  <label className={labelClass}>
                    Owner Email
                  </label>

                  <input
                    readOnly
                    type="email"
                    name="ownerEmail"
                    value={
                      userEmail ||
                      pet?.ownerEmail ||
                      "unknown@example.com"
                    }
                    className="h-11 w-full cursor-not-allowed rounded-2xl border border-orange-100 bg-gray-100 px-4 text-sm text-gray-500"
                  />
                </div>

              </div>

            </form>

          </div>

          {/* Footer */}

          <div className="flex gap-4 border-t border-orange-100 bg-orange-50/50 px-8 py-5">

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 rounded-2xl border border-gray-200 bg-white py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 active:scale-95"
            >
              Cancel
            </button>

            <button
              type="submit"
              form={`edit_form_${petId}`}
              className="group relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-orange-300/50 hover:from-orange-600 hover:to-amber-600 active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative flex items-center justify-center gap-2">

                <FaPaw />

                Save Changes

              </span>

            </button>

          </div>

        </div>

        {/* Backdrop */}

        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close Modal">
            Close
          </button>
        </form>

      </dialog>

    </div>
  );
}