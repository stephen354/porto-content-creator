import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function AnimatedCounter({ target, suffix = '', className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState('0' + suffix)
  const isFloat = target % 1 !== 0

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const start = performance.now()

    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out quart for ultra smooth
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = target * eased

      if (isFloat) {
        setDisplay(current.toFixed(2) + suffix)
      } else if (target >= 1000) {
        setDisplay((current / 1000).toFixed(1) + 'K' + suffix)
      } else {
        setDisplay(Math.round(current) + suffix)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, suffix, isFloat])

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {display}
    </motion.span>
  )
}
