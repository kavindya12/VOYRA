import { motion } from 'framer-motion'
import InquiryFormHome from '@/components/ui/contact-form'
import SectionHeader from './ui/SectionHeader'

export default function ContactSection() {
  return (
    <section
      id="inquiry"
      className="section-block-separated bg-gradient-to-b from-voyra-sky/50 to-white py-12 lg:py-14"
    >
      <div className="section-container">
        <SectionHeader
          compact
          badge="Inquiry"
          title="Send your inquiry"
          description="Fill out the form below and our team will contact you within 24 hours."
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="mt-6 lg:mt-7"
        >
          <div className="card-surface mx-auto max-w-3xl p-4 sm:p-5">
            <InquiryFormHome compact />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
