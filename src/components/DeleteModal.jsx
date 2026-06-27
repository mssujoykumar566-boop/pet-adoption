"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

import { MdDeleteOutline } from "react-icons/md";
import { FiAlertTriangle } from "react-icons/fi";

export default function DeleteModal({ pet }) {
  const { _id, ownerName, petName } = pet;

  const petId = _id?.toString();

  const [loading, setLoading] = useState(false);

  const modalId = `delete_modal_${petId}`;

  const openModal = () => {
    document.getElementById(modalId)?.showModal();
  };

  const closeModal = () => {
    document.getElementById(modalId)?.close();
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}pets/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Delete Failed");
      }

      toast.success("Pet deleted successfully");

      closeModal();

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete pet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Trigger Button */}

      <button
        onClick={openModal}
        className="group relative flex h-11 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 via-red-500 to-rose-500 px-5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-red-300/50 hover:from-red-600 hover:to-rose-600 active:scale-95"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <span className="relative flex items-center gap-2">
          <MdDeleteOutline className="text-lg" />
          Delete Pet
        </span>
      </button>

      {/* Modal */}

      <dialog id={modalId} className="modal">

        <div className="modal-box max-w-md overflow-hidden rounded-[30px] border border-red-100 bg-white p-0 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">

          {/* Header */}

          <div className="bg-gradient-to-r from-red-500 to-rose-500 px-8 py-7 text-white">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

                <FiAlertTriangle className="text-3xl" />

              </div>

              <div>

                <h2 className="text-xl font-extrabold">
                  Delete Pet
                </h2>

                <p className="text-sm text-red-100">
                  This action is permanent
                </p>

              </div>

            </div>

          </div>

          {/* Body */}

          <div className="space-y-5 px-8 py-7">

            <p className="text-gray-600 leading-7">

              Hello

              <span className="font-bold text-gray-900">
                {" "}
                {ownerName}
              </span>

              ,

            </p>

            <p className="leading-7 text-gray-500">

              You're about to permanently delete

              <span className="font-bold text-red-500">
                {" "}
                {petName}
              </span>

              .

              Once deleted, this pet listing cannot be recovered and will disappear from your adoption platform forever.

            </p>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">

              <div className="flex items-center gap-3">

                <FiAlertTriangle className="text-xl text-red-500" />

                <p className="text-sm font-medium text-red-600">

                  Please confirm before deleting this pet.

                </p>

              </div>

            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-red-200 to-transparent"></div>

                        {/* Footer */}

            <div className="flex gap-4">

              {/* Cancel Button */}

              <button
                onClick={closeModal}
                disabled={loading}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-100 py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              {/* Delete Button */}

              <button
                onClick={handleDelete}
                disabled={loading}
                className="group relative flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-red-500 to-rose-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-red-300/50 hover:from-red-600 hover:to-rose-600 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {loading ? (
                  <span className="relative flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />

                      <path
                        fill="currentColor"
                        className="opacity-75"
                        d="M12 2a10 10 0 00-10 10h3a7 7 0 017-7V2z"
                      />
                    </svg>

                    Deleting...
                  </span>
                ) : (
                  <span className="relative flex items-center gap-2">
                    <MdDeleteOutline className="text-lg" />

                    Yes, Delete
                  </span>
                )}
              </button>

            </div>

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