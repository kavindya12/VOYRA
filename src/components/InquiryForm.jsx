import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { submitInquiry } from '../supabase/inquiryService'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function InquiryForm({ tourName }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    tour_name: tourName || '',
    date: '',
    people: 1,
    message: '',
  })

  useEffect(() => {
    if (tourName) {
      setForm((prev) => ({ ...prev, tour_name: tourName }))
    }
  }, [tourName])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'people' ? parseInt(value, 10) || 1 : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Full name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!EMAIL_REGEX.test(form.email)) next.email = 'Enter a valid email'
    if (!form.phone.trim()) next.phone = 'Phone is required'
    if (!form.tour_name.trim()) next.tour_name = 'Tour is required'
    if (!form.date) next.date = 'Travel date is required'
    if (!form.people || form.people < 1) next.people = 'At least 1 person required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await submitInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        tour_name: form.tour_name.trim(),
        date: form.date,
        people: form.people,
        message: form.message.trim() || null,
      })
      toast.success('Inquiry submitted successfully!')
      navigate('/success')
    } catch (err) {
      toast.error(err.message || 'Failed to submit inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field) =>
    `input-field ${errors[field] ? 'input-field-error bg-red-50' : ''}`

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-voyra-navy">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={inputClass('name')}
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-voyra-navy">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-voyra-navy">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className={inputClass('phone')}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="tour_name" className="mb-1.5 block text-sm font-medium text-voyra-navy">
            Selected Tour <span className="text-red-500">*</span>
          </label>
          <input
            id="tour_name"
            name="tour_name"
            type="text"
            value={form.tour_name}
            readOnly
            className="input-field cursor-not-allowed bg-voyra-sky/50 text-voyra-muted"
          />
        </div>

        <div>
          <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-voyra-navy">
            Travel Date <span className="text-red-500">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={inputClass('date')}
            aria-invalid={!!errors.date}
          />
          {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="people" className="mb-1.5 block text-sm font-medium text-voyra-navy">
            Number of People <span className="text-red-500">*</span>
          </label>
          <input
            id="people"
            name="people"
            type="number"
            min={1}
            max={50}
            value={form.people}
            onChange={handleChange}
            className={inputClass('people')}
            aria-invalid={!!errors.people}
          />
          {errors.people && <p className="mt-1 text-xs text-red-500">{errors.people}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-voyra-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your travel preferences..."
          className="input-field"
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Submitting...
          </>
        ) : (
          'Submit Inquiry'
        )}
      </button>
    </form>
  )
}
