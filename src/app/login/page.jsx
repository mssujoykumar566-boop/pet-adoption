'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { createAuthClient } from 'better-auth/react'
import { FaGoogle, FaRegEye, FaRegEyeSlash, FaPaw } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function Login() {
  const authClient = createAuthClient()
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const googleButton = async () => {
    await authClient.signIn.social({
      provider: 'google'
    })
  }

  const loginButton = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value

    if (!email || !password) {
      return toast.error('All fields are required')
    }

    try {
      setLoading(true)

      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: '/'
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Login successful')
      router.push('/')

    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FFF8EE] to-[#FDF6EC] px-4 overflow-hidden">

      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F2C4A0]/25 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C8DFC9]/25 blur-3xl rounded-full" />

      <form
        onSubmit={loginButton}
        className="relative w-full max-w-md"
      >

        <div className="bg-white border border-[#F2C4A0]/40 shadow-xl rounded-3xl p-8 md:p-10">

          {/* HEADER */}
          <div className="text-center mb-8">

            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-[#C4844A] text-white shadow-lg">
              <FaPaw className="text-2xl" />
            </div>

            <h1 className="mt-4 text-3xl font-black text-[#3D2B1F]">
              Welcome Back
            </h1>

            <p className="text-sm text-[#9E7E6A] mt-1">
              Login to your PetNest account 🐾
            </p>

          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full h-11 px-4 rounded-xl bg-[#F6F1E8] border border-[#E2D8C5] text-[#3D2B1F] placeholder:text-[#9E7E6A] focus:ring-2 focus:ring-[#C4844A] outline-none transition"
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="w-full h-11 px-4 pr-10 rounded-xl bg-[#F6F1E8] border border-[#E2D8C5] text-[#3D2B1F] placeholder:text-[#9E7E6A] focus:ring-2 focus:ring-[#C4844A] outline-none transition"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#9E7E6A] hover:text-[#C4844A] transition"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            type="submit"
            className="w-full h-12 rounded-xl bg-[#3D2B1F] hover:bg-[#C4844A] text-white font-semibold transition active:scale-[0.98]"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* REGISTER LINK */}
          <p className="text-sm text-center text-[#9E7E6A] mt-5">
            Don’t have an account?{' '}
            <Link href="/register" className="text-[#C4844A] font-semibold">
              Register
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

        </div>

      </form>
    </section>
  )
}