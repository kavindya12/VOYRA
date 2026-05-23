import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiCheckCircle, HiArrowRight } from 'react-icons/hi'

export default function Success() {
  return (
    <div className="page-shell flex min-h-[70vh] items-center section-padding-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="section-container w-full"
      >
        <div className="card-glass mx-auto max-w-lg px-8 py-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-voyra-sky"
          >
            <HiCheckCircle className="text-voyra-orange" size={48} />
          </motion.div>

          <span className="badge-label mt-6">Success</span>
          <h1 className="mt-3 text-2xl font-extrabold text-voyra-navy sm:text-3xl">
            Inquiry submitted successfully
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-voyra-muted">
            Thank you for choosing Voyra. Our travel experts will contact you shortly to plan
            your adventure.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/" className="btn-primary inline-flex">
              Back to Home
            </Link>
            <Link to="/tours" className="btn-outline inline-flex items-center gap-1">
              Browse tours
              <HiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
