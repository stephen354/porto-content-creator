import { motion } from 'framer-motion'
import BentoCard from './BentoCard'

const brands = [
  { name: 'Brand A', icon: <><path d="M12 2a3 3 0 0 0-3 3c0 1.1.6 2 1.5 2.5L3 14h18l-7.5-6.5c.9-.5 1.5-1.4 1.5-2.5a3 3 0 0 0-3-3z"/><path d="M3 14v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/></> },
  { name: 'Brand B', icon: <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/> },
  { name: 'Brand C', icon: <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></> },
  { name: 'Brand D', icon: <><circle cx="12" cy="12" r="3"/><path d="M12 2c1.5 2 2 4.5 2 7s-.5 5-2 7c-1.5-2-2-4.5-2-7s.5-5 2-7z"/><path d="M2 12c2-1.5 4.5-2 7-2s5 .5 7 2c-2 1.5-4.5 2-7 2s-5-.5-7-2z"/></> },
  { name: 'Brand E', icon: <><polygon points="6 3, 18 3, 22 9, 12 22, 2 9"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="22" x2="8" y2="9"/><line x1="12" y1="22" x2="16" y2="9"/><line x1="6" y1="3" x2="8" y2="9"/><line x1="18" y1="3" x2="16" y2="9"/></> },
  { name: 'Brand F', icon: <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"/> },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function BrandsSection() {
  return (
    <BentoCard delay={0.45} className="mt-6 sm:mt-8 !bg-brand-card p-6 sm:p-8">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <span className="badge-shimmer text-brand-badge-text text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase px-3 sm:px-4 py-1 sm:py-1.5 rounded-full inline-flex w-fit">
          Brands I've Worked With
        </span>
        <p className="text-xs sm:text-sm text-brand-muted hidden sm:block">UMKM & Brand Lokal Malang</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-30px' }}
        className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6"
      >
        {brands.map((brand, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -3, filter: 'grayscale(0%)', opacity: 1 }}
            className="flex flex-col items-center gap-1.5 sm:gap-2 cursor-default"
            style={{ filter: 'grayscale(100%)', opacity: 0.5 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-brand-bg rounded-xl sm:rounded-2xl flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="#D4838F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {brand.icon}
              </svg>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-brand-muted">{brand.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </BentoCard>
  )
}
