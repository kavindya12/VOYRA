import { motion } from 'framer-motion'

export default function SectionHeader({
  badge,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className={`${isCenter ? 'text-center' : 'text-left'} ${className}`}
    >
      {badge && <span className="badge-label">{badge}</span>}
      <h2
        className={`font-extrabold tracking-tight text-voyra-navy ${
          badge ? 'mt-3' : ''
        } text-3xl sm:text-4xl`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-base leading-relaxed text-voyra-muted ${
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-xl'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
