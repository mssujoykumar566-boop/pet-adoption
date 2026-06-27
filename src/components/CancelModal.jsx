"use client";

import React, { useRef } from "react";
import { MdOutlinePets } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

export default function CancelModal({ req, onDelete }) {

  const dialogRef = useRef(null);

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}adoption-requests/pet/${req._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        dialogRef.current?.close();

        if (onDelete) {
          onDelete(req._id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      {/* Trigger Button */}

      <button
        onClick={openModal}
        disabled={req.status.toLowerCase() !== "pending"}
        className={`group relative flex h-11 w-full items-center justify-center overflow-hidden rounded-2xl px-5 text-sm font-semibold transition-all duration-300 active:scale-95

${
  req.status.toLowerCase() !== "pending"
    ? "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400 opacity-60"
    : "bg-gradient-to-r from-red-500 via-red-500 to-rose-500 text-white shadow-lg hover:shadow-red-300/50 hover:from-red-600 hover:to-rose-600"
}`}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        <span className="relative flex items-center gap-2">

          {req.status.toLowerCase() === "pending" && (
            <FaTrashAlt className="text-sm" />
          )}

          {req.status.toLowerCase() !== "pending"
            ? req.status
            : "Cancel Request"}

        </span>

      </button>

      <dialog
        ref={dialogRef}
        className="modal"
      >
                <div className="modal-box max-w-md rounded-[30px] border border-orange-100 bg-white p-8 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">

          {/* Icon */}

          <div className="mb-6 flex justify-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-orange-100 shadow-md">

              <MdOutlinePets className="text-4xl text-red-500" />

            </div>

          </div>

          {/* Title */}

          <h2 className="text-center text-2xl font-extrabold text-gray-800">
            Cancel Adoption?
          </h2>

          {/* Description */}

          <p className="mt-4 text-center leading-7 text-gray-500">
            Are you sure you want to cancel your adoption request for
            <span className="font-bold text-orange-500">
              {" "}
              {req.petName}
            </span>
            ?
            <br />
            <span className="mt-2 inline-block text-sm text-gray-400">
              This action cannot be undone.
            </span>
          </p>

          <div className="my-7 h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent" />

          {/* Action Buttons */}

          <div className="flex gap-4">

            <button
              type="button"
              onClick={closeModal}
              className="flex-1 rounded-xl border border-gray-200 bg-gray-100 py-3 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-200 active:scale-95"
            >
              Keep Request
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-red-500 via-red-500 to-rose-500 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-red-300/50 hover:from-red-600 hover:to-rose-600 active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative flex items-center justify-center gap-2">

                <FaTrashAlt />

                Yes, Cancel

              </span>

            </button>

          </div>

        </div>

        <form method="dialog" className="modal-backdrop">

          <button type="button" onClick={closeModal}>
            Close
          </button>

        </form>

      </dialog>

    </div>
  );
}