import { motion } from 'framer-motion'

const ctaItems = [
  {
    href: 'https://tiktok.com/@yourusername',
    label: '@yourusername',
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52V6.94a4.85 4.85 0 01-1-.25z"/>
      </svg>
    ),
  },
  {
    href: 'https://instagram.com/yourusername',
    label: '@yourusername',
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    href: 'https://kolivo.ai/rc/nevbfua',
    label: 'Rate Card',
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
      </svg>
    ),
  },
  {
    href: 'mailto:hello@yourdomain.com',
    label: 'Email Me',
    icon: (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <polyline points="22,4 12,13 2,4"/>
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function CtaRow() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mt-4 sm:mt-6"
    >
      {ctaItems.map((item, i) => (
        <motion.a
          key={i}
          variants={itemVariants}
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noopener' : undefined}
          whileHover={{ y: -4, boxShadow: '0 10px 40px rgba(180, 150, 150, 0.15)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-brand-card rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 shadow-card flex flex-col justify-between h-[110px] sm:h-[130px] group text-brand-text hover:text-brand-accent"
        >
          <span className="transition-colors duration-300">{item.icon}</span>
          <p className="font-semibold text-[11px] sm:text-[13px] text-brand-muted group-hover:text-brand-text transition-colors duration-300">
            {item.label}
          </p>
        </motion.a>
      ))}

      {/* CTA: Let's Collab */}
      <motion.a
        variants={itemVariants}
        href="#inquiry"
        id="inquiry"
        whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(201, 107, 122, 0.25)' }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="cta-glow bg-gradient-to-br from-brand-cta to-brand-accent rounded-[18px] sm:rounded-[22px] p-4 sm:p-5 shadow-card flex flex-col justify-between h-[110px] sm:h-[130px] col-span-2 sm:col-span-1"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/>
        </svg>
        <div>
          <p className="font-bold text-[12px] sm:text-[14px] text-white">Let's Collab</p>
          <p className="text-white/60 text-[10px] sm:text-[11px] mt-0.5">Kirim inquiry →</p>
        </div>
      </motion.a>
    </motion.div>
  )
}
