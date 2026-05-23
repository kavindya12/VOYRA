import { motion } from 'framer-motion'
import InquiryFormHome from '@/components/ui/contact-form'
import SectionHeader from './ui/SectionHeader'

export default function ContactSection() {
  return (
    <section
      id="inquiry"
      className="section-block section-block-separated bg-gradient-to-b from-voyra-sky/50 to-white"
    >
      <div className="section-container">
        <SectionHeader
          badge="Inquiry"
          title="Send your inquiry"
          description="Fill out the form below and our team will contact you within 24 hours."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
          className="section-content-gap"
        >
          <div className="card-surface mx-auto max-w-4xl p-6 sm:p-8">
            <InquiryFormHome />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
