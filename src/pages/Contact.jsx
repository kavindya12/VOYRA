import { motion } from 'framer-motion'
import InquiryLink from '../components/InquiryLink'
import ContactDetails, { ContactDetailsSkeleton } from '../components/ContactDetails'
import SectionHeader from '../components/ui/SectionHeader'
import { useContactInfo } from '../hooks/useContactInfo'
import { HiArrowRight } from 'react-icons/hi'

export default function Contact() {
  const { contact, loading } = useContactInfo()

  return (
    <div className="page-shell relative overflow-hidden pb-20 pt-12 lg:pb-28 lg:pt-16">
      <div
        className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full bg-voyra-orange/10 blur-3xl"
        aria-hidden
      />

      <div className="section-container relative">
        <SectionHeader
          badge="Contact"
          title="Contact Us"
          description="Reach out for bookings, custom trips, or any questions. Our travel team typically replies within 24 hours."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          className="mt-10"
        >
          {loading ? (
            <ContactDetailsSkeleton />
          ) : (
            <ContactDetails contact={contact} />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-surface mt-10 bg-gradient-to-br from-voyra-sky/80 to-white p-8 text-center sm:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-voyra-orange">
            Ready to travel?
          </p>
          <h3 className="mt-2 text-xl font-bold text-voyra-navy">Send a travel inquiry</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-voyra-muted">
            Tell us your dates and destination on our home page - no account required.
          </p>
          <InquiryLink className="btn-primary mt-6 inline-flex items-center gap-1">
            Send Inquiry
            <HiArrowRight size={16} />
          </InquiryLink>
        </motion.div>
      </div>
    </div>
  )
}
