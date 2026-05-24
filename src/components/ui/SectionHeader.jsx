import { motion } from 'framer-motion'

export default function SectionHeader({
  badge,
  title,
  description,
  align = 'center',
  compact = false,
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
      {badge && (
        <span className={compact ? 'badge-label px-3 py-0.5 text-[10px]' : 'badge-label'}>{badge}</span>
      )}
      <h2
        className={`font-extrabold tracking-tight text-voyra-navy ${
          badge ? (compact ? 'mt-2' : 'mt-3') : ''
        } ${compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`leading-relaxed text-voyra-muted ${
            compact ? 'mt-1.5 text-sm' : 'mt-3 text-base'
          } ${isCenter ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
