import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToInquiry } from '../utils/scrollToInquiry'

export default function InquiryLink({ className, children }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()

    if (location.pathname === '/') {
      scrollToInquiry()
      window.history.replaceState(null, '', '/#inquiry')
      return
    }

    navigate('/#inquiry')
    requestAnimationFrame(() => {
      setTimeout(scrollToInquiry, 150)
    })
  }

  return (
    <a href="/#inquiry" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
