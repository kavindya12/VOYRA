import { motion } from 'framer-motion'
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter } from 'react-icons/fa'

const cardMotion = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
}

const contactCardClass =
  'card-hover card-surface flex flex-col items-center bg-gradient-to-b from-white to-voyra-sky/40 p-6 text-center transition-all'

const SOCIAL_ICONS = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
}

function SocialIcon({ platform }) {
  const Icon = SOCIAL_ICONS[platform?.toLowerCase()] ?? FaFacebook
  return <Icon size={18} />
}

export function ContactDetailsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-40 animate-pulse rounded-[1.25rem] bg-voyra-sky/80" />
      ))}
    </div>
  )
}

export default function ContactDetails({ contact, className = '' }) {
  if (!contact) return null

  const emailHref = `mailto:${contact.email}`
  const phoneHref = `tel:${contact.phone.replace(/\s/g, '')}`

  return (
    <div className={className}>
      <motion.div
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-3"
      >
        <motion.a
          custom={0}
          variants={cardMotion}
          href={emailHref}
          className={`${contactCardClass} group hover:border-voyra-orange/40`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-voyra-sky text-voyra-orange shadow-sm ring-4 ring-voyra-sky transition-all group-hover:bg-voyra-orange group-hover:text-white group-hover:ring-voyra-orange/20">
            <FaEnvelope size={24} />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-voyra-navy">Email</h3>
          <p className="mt-2 text-sm font-medium text-voyra-orange group-hover:underline">{contact.email}</p>
        </motion.a>

        <motion.a
          custom={1}
          variants={cardMotion}
          href={phoneHref}
          className={`${contactCardClass} group hover:border-voyra-orange/40`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-voyra-sky text-voyra-orange shadow-sm ring-4 ring-voyra-sky transition-all group-hover:bg-voyra-orange group-hover:text-white group-hover:ring-voyra-orange/20">
            <FaPhone size={24} />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-voyra-navy">Phone</h3>
          <p className="mt-2 text-sm font-medium text-voyra-orange group-hover:underline">{contact.phone}</p>
        </motion.a>

        <motion.div custom={2} variants={cardMotion} className={contactCardClass}>
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-voyra-sky text-voyra-orange shadow-sm ring-4 ring-voyra-sky">
            <FaMapMarkerAlt size={24} />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-voyra-navy">Address</h3>
          <p className="mt-2 text-sm leading-relaxed text-voyra-muted">{contact.address}</p>
        </motion.div>
      </motion.div>

      {contact.socialLinks?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10 rounded-2xl border border-voyra-sky bg-voyra-sky/50 px-6 py-8 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-voyra-orange">Stay connected</p>
          <h3 className="mt-1 text-lg font-bold text-voyra-navy">Follow Us</h3>
          <div className="mt-5 flex justify-center gap-3">
            {contact.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-voyra-navy text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-voyra-orange hover:shadow-soft-lg"
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
