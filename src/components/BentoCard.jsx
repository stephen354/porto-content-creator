import { motion } from 'framer-motion'

const cardVariants = {
  hidden: (custom) => ({
    opacity: 0,
    y: custom?.direction === 'left' ? 0 : custom?.direction === 'right' ? 0 : 25,
    x: custom?.direction === 'left' ? -25 : custom?.direction === 'right' ? 25 : 0,
    scale: custom?.direction === 'scale' ? 0.95 : 1,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function BentoCard({
  children,
  className = '',
  direction,
  delay = 0,
  enableTilt = false,
  onClick,
  ...props
}) {
  const isClickable = typeof onClick === 'function';

  return (
    <motion.div
      custom={{ direction }}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px', amount: 0.1 }}
      transition={{ delay }}
      whileHover={
        isClickable
          ? {
              y: -6,
              scale: 1.015,
              boxShadow: '0 12px 48px rgba(201, 107, 122, 0.15)',
              borderColor: 'rgba(201, 107, 122, 0.35)',
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }
          : enableTilt
          ? {
              y: -4,
              rotateX: 0,
              rotateY: 0,
              boxShadow: '0 10px 40px rgba(180, 150, 150, 0.15)',
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }
          : {
              y: -4,
              boxShadow: '0 10px 40px rgba(180, 150, 150, 0.15)',
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            }
      }
      whileTap={isClickable ? { scale: 0.985, y: -2 } : undefined}
      onClick={onClick}
      className={`bg-brand-card rounded-[var(--radius-bento-sm)] sm:rounded-[var(--radius-bento)] shadow-card relative overflow-hidden border border-transparent transition-all duration-300 ${
        isClickable ? 'cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-brand-accent/50' : ''
      } ${className}`}
      style={{ perspective: enableTilt ? 1000 : undefined }}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

