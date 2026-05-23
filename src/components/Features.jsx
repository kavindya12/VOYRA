import { motion } from 'framer-motion'
import { HiBadgeCheck, HiShieldCheck, HiSupport, HiClipboardList } from 'react-icons/hi'
import SectionHeader from './ui/SectionHeader'

const features = [
  {
    icon: HiBadgeCheck,
    title: 'Best Travel Deals',
    description: 'Exclusive packages and competitive pricing on handpicked destinations worldwide.',
  },
  {
    icon: HiShieldCheck,
    title: 'Verified Destinations',
    description: 'Every tour is vetted for quality, safety, and authentic local experiences.',
  },
  {
    icon: HiSupport,
    title: '24/7 Support',
    description: 'Our travel experts are available around the clock to assist your journey.',
  },
  {
    icon: HiClipboardList,
    title: 'Easy Booking Inquiry',
    description: 'Submit a simple inquiry form - no account needed. We handle the rest.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function Features() {
  return (
    <section className="section-block section-block-separated bg-white">
      <div className="section-container">
        <SectionHeader
          badge="Why Voyra"
          title="Travel with confidence"
          description="Travel smarter with a platform built for explorers who want more from every trip."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="section-content-gap grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={item}
              className="card-hover card-surface group p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-voyra-sky text-voyra-orange transition-colors group-hover:bg-voyra-orange group-hover:text-white">
                <Icon size={24} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-voyra-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-voyra-muted">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
