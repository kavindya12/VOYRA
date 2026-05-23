import { useEffect } from 'react'
import Hero from '../components/Hero'
import PopularTours from '../components/PopularTours'
import Features from '../components/Features'
import ContactSection from '../components/ContactSection'
import { scrollToInquiry } from '../utils/scrollToInquiry'

export default function Home() {
  useEffect(() => {
    if (window.location.hash === '#inquiry') {
      setTimeout(scrollToInquiry, 100)
    }
  }, [])

  return (
    <>
      <Hero />
      <PopularTours />
      <Features />
      <ContactSection />
    </>
  )
}
