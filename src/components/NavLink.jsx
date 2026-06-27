'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function NavLink({ href, children }) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link href={href} className="relative">
            <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`
                    relative flex items-center justify-center
                    px-5 py-2.5 rounded-full
                    text-sm font-semibold
                    transition-all duration-300
                    border backdrop-blur-md
                    overflow-hidden
                    ${isActive
                        ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white border-orange-500 shadow-lg shadow-orange-200/50'
                        : 'bg-white/70 border-orange-100 text-gray-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-500 hover:shadow-md'
                    }
                `}
            >
                {/* Shine Effect */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 hover:translate-x-full" />

                {/* Active Indicator */}
                {isActive && (
                    <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full"
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                        }}
                    />
                )}

                <span className="relative z-10">
                    {children}
                </span>
            </motion.span>
        </Link>
    )
}