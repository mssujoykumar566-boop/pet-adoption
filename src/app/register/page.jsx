"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createAuthClient } from "better-auth/react";
import { FaGoogle, FaRegEye, FaRegEyeSlash, FaPaw } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Register() {
  const authClient = createAuthClient();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    url: "",
    password: "",
    confirmPass: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const googleButton = async () => {
    await authClient.signIn.social({
      provider: "google",
      rememberMe: false,
      query: { prompt: "select_account" }
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, url, password, confirmPass } = formData;

    if (!name || !email || !url || !password || !confirmPass) {
      return setError("All fields are required");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters");
    }

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return setError("Password must include upper & lower case letters");
    }

    if (password !== confirmPass) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: url,
        callbackURL: "/login"
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Account created successfully");
      router.push("/login");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF8EE] to-[#FDF6EC] px-4 overflow-hidden">

      {/* background blobs */}
      <div className="absolute -top-24 -left-24 h-96 w-96 bg-[#F2C4A0]/25 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 bg-[#C8DFC9]/25 blur-3xl rounded-full" />

      <div className="relative w-full max-w-xl">

        <form
          onSubmit={onSubmit}
          className="bg-white border border-[#F2C4A0]/40 shadow-xl rounded-3xl p-8 md:p-10"
        >

          {/* HEADER */}
          <div className="text-center mb-8">

            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-[#C4844A] text-white shadow-lg">
              <FaPaw className="text-2xl" />
            </div>

            <h1 className="mt-4 text-3xl font-black text-[#3D2B1F]">
              Create Account
            </h1>

            <p className="text-sm text-[#9E7E6A] mt-1">
              Join PetNest and find your forever friend 🐾
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-5 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl">
              {error}
            </div>
          )}

          {/* INPUT */}
          {[
            { name: "name", type: "text", placeholder: "Full name" },
            { name: "url", type: "url", placeholder: "Photo URL" },
            { name: "email", type: "email", placeholder: "Email address" }
          ].map((f, i) => (
            <div key={i} className="mb-4">
              <input
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                value={formData[f.name]}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl bg-[#F6F1E8] border border-[#E2D8C5] text-[#3D2B1F] placeholder:text-[#9E7E6A] focus:ring-2 focus:ring-[#C4844A] outline-none transition"
              />
            </div>
          ))}

          {/* PASSWORD */}
          <div className="mb-4 relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-11 px-4 pr-10 rounded-xl bg-[#F6F1E8] border border-[#E2D8C5] text-[#3D2B1F] focus:ring-2 focus:ring-[#C4844A] outline-none"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#9E7E6A]"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="mb-6 relative">
            <input
              name="confirmPass"
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirmPass}
              onChange={handleChange}
              className="w-full h-11 px-4 pr-10 rounded-xl bg-[#F6F1E8] border border-[#E2D8C5] text-[#3D2B1F] focus:ring-2 focus:ring-[#C4844A] outline-none"
            />
            <span
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#9E7E6A]"
            >
              {showConfirmPass ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#3D2B1F] hover:bg-[#C4844A] text-white font-semibold transition active:scale-[0.98]"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* LOGIN */}
          <p className="text-sm text-center text-[#9E7E6A] mt-5">
            Already have an account?{" "}
            <Link className="text-[#C4844A] font-semibold" href="/login">
              Login
            </Link>
          </p>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-[#E2D8C5]" />
            <span className="text-xs text-[#9E7E6A]">OR</span>
            <div className="h-px flex-1 bg-[#E2D8C5]" />
          </div>

          {/* GOOGLE */}
          <button
            type="button"
            onClick={googleButton}
            className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-white border border-[#E2D8C5] hover:border-[#C4844A] transition"
          >
            <FaGoogle className="text-[#C4844A]" />
            Continue with Google
          </button>

        </form>

      </div>
    </section>
  );
}