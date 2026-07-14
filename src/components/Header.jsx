import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-brand-bg/80 border-b border-brand-accent-light/50"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between">
        <h1 className="font-display font-bold text-lg sm:text-xl tracking-tight">
          Aesthetic <span className="text-brand-accent">Creator</span>
        </h1>
        <motion.a
          href="#inquiry"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="bg-brand-cta text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-brand-cta-hover transition-colors duration-300 hover:shadow-lg hover:shadow-brand-cta/25"
        >
          <span className="hidden sm:inline">Let's Collaborate</span>
          <span className="sm:hidden">Collab</span> ✨
        </motion.a>
      </div>
    </motion.header>
  )
}
