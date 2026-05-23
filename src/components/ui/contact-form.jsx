import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { submitInquiry } from '@/supabase/inquiryService'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const labelClass = 'mb-1 block text-sm font-medium text-voyra-navy'
const inputClass = 'input-field mt-0 py-2.5'

export default function InquiryFormHome() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    tourName: '',
    date: '',
    people: 1,
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'people' ? parseInt(value, 10) || 1 : value,
    }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required'
    if (!form.lastName.trim()) next.lastName = 'Last name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!EMAIL_REGEX.test(form.email)) next.email = 'Enter a valid email'
    if (!form.phone.trim()) next.phone = 'Phone is required'
    if (!form.date) next.date = 'Preferred travel date is required'
    if (!form.people || form.people < 1) next.people = 'At least 1 traveler'
    if (!form.message.trim()) next.message = 'Message is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fix the highlighted fields.')
      return
    }

    setLoading(true)
    try {
      await submitInquiry({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        tour_name: form.tourName.trim() || 'General Inquiry',
        date: form.date,
        people: form.people,
        message: form.message.trim(),
      })
      toast.success('Inquiry submitted successfully!')
      navigate('/success')
    } catch (err) {
      toast.error(err.message || 'Failed to submit inquiry. Check Supabase setup and try again.')
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (field) =>
    cn(inputClass, errors[field] && 'border-red-400 bg-red-50')

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
        <div>
            <label htmlFor="firstName" className={labelClass}>
              First name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              className={fieldClass('firstName')}
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              className={fieldClass('lastName')}
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
          </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={fieldClass('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={form.phone}
            onChange={handleChange}
            className={fieldClass('phone')}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="tourName" className={labelClass}>
            Tour or destination <span className="font-normal text-voyra-muted">(optional)</span>
          </label>
          <input
            id="tourName"
            name="tourName"
            type="text"
            placeholder="e.g. Bali Escape, Kyoto Heritage"
            value={form.tourName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

          <div>
            <label htmlFor="date" className={labelClass}>
              Travel date <span className="text-red-500">*</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={form.date}
              onChange={handleChange}
              className={fieldClass('date')}
            />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
          </div>
          <div>
            <label htmlFor="people" className={labelClass}>
              Travelers <span className="text-red-500">*</span>
            </label>
            <input
              id="people"
              name="people"
              type="number"
              min={1}
              max={50}
              value={form.people}
              onChange={handleChange}
              className={fieldClass('people')}
            />
            {errors.people && <p className="mt-1 text-xs text-red-500">{errors.people}</p>}
          </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your travel plans..."
            className={cn(fieldClass('message'), 'min-h-[5.5rem] resize-none')}
          />
          {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[200px]"
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </div>
      </form>
  )
}
