import { Link } from 'react-router-dom'
import { HiArrowRight, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import InquiryLink from './InquiryLink'
import { useContactInfo } from '../hooks/useContactInfo'

const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/tours', label: 'Tours' },
  { to: '/contact', label: 'Contact' },
]

const SOCIAL_ICONS = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
}

function SocialIcon({ platform }) {
  const Icon = SOCIAL_ICONS[platform?.toLowerCase()] ?? FaFacebook
  return <Icon size={14} />
}

function FooterContactSkeleton() {
  return (
    <div className="mt-3 space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-9 animate-pulse rounded-lg bg-white/5" />
      ))}
    </div>
  )
}

export default function Footer() {
  const { contact, loading } = useContactInfo()
  const year = new Date().getFullYear()

  const emailHref = contact ? `mailto:${contact.email}` : '#'
  const phoneHref = contact ? `tel:${contact.phone.replace(/\s/g, '')}` : '#'

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-voyra-navy via-[#0c2238] to-[#081a2b] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voyra-orange/60 to-transparent" />

      <div className="section-container relative py-8 lg:py-9">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-xl font-extrabold tracking-tight">VOYRA</span>
            </Link>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-voyra-orange">
              Explore Beyond Limits
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-white/60">
              Your trusted travel partner for unforgettable journeys around the world.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {contact?.socialLinks?.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-voyra-orange"
                >
                  <SocialIcon platform={link.platform} />
                </a>
              ))}
              <InquiryLink className="btn-primary ml-1 inline-flex rounded-full px-4 py-2 text-xs">
                Plan your trip
                <HiArrowRight size={14} />
              </InquiryLink>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/90">Quick links</h4>
            <ul className="mt-2 space-y-0.5">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="inline-block py-0.5 text-xs text-white/70 transition-colors hover:text-voyra-orange"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <InquiryLink className="inline-block py-0.5 text-xs text-white/70 transition-colors hover:text-voyra-orange">
                  Inquiry
                </InquiryLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-white/90">Get in touch</h4>

            {loading ? (
              <FooterContactSkeleton />
            ) : contact ? (
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href={emailHref}
                    className="group flex items-center gap-2.5 transition-colors hover:text-voyra-orange"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-voyra-orange/20 text-voyra-orange group-hover:bg-voyra-orange group-hover:text-white">
                      <HiMail size={15} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[9px] font-semibold uppercase tracking-wide text-white/45">
                        Email
                      </span>
                      <span className="block truncate text-xs font-medium text-white/90">{contact.email}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={phoneHref}
                    className="group flex items-center gap-2.5 transition-colors hover:text-voyra-orange"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-voyra-orange/20 text-voyra-orange group-hover:bg-voyra-orange group-hover:text-white">
                      <HiPhone size={15} />
                    </span>
                    <span>
                      <span className="block text-[9px] font-semibold uppercase tracking-wide text-white/45">
                        Phone
                      </span>
                      <span className="block text-xs font-medium text-white/90">{contact.phone}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-voyra-orange/20 text-voyra-orange">
                    <HiLocationMarker size={15} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-semibold uppercase tracking-wide text-white/45">
                      Office
                    </span>
                    <span className="block text-xs font-medium leading-snug text-white/90">{contact.address}</span>
                  </span>
                </li>
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-[11px] text-white/40 sm:flex-row">
          <p>&copy; {year} Voyra. All rights reserved.</p>
          <p className="text-center sm:text-right">Curated tours · Trusted destinations</p>
        </div>
      </div>
    </footer>
  )
}
