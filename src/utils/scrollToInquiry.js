export function scrollToInquiry() {
  const el = document.getElementById('inquiry')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return true
  }
  return false
}
