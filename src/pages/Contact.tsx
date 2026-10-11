import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { FAQS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const Contact: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Appointment Inquiry');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please provide your name';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please provide a valid email';
    if (!phone.trim()) newErrors.phone = 'Please provide a phone number';
    if (!message.trim() || message.trim().length < 10) newErrors.message = 'Please provide a message (at least 10 characters)';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
    showToast('Your message has been sent to our demo patient support team!', 'success');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
            Patient Support Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172B46] tracking-tight mt-1">
            We’re Here to Help
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Have questions about finding a specialist, rescheduling an existing appointment, or visiting our hospital facilities? Reach out to our dedicated scheduling coordinator team.
          </p>
        </div>

        {/* Emergency Callout Box */}
        <div className="mb-10 bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-200/90 flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold">Medical Emergency Notice:</strong> This contact form and the CareConnect portal are for non-urgent hospital consultation scheduling only. If you or a loved one are experiencing acute symptoms (chest pain, severe shortness of breath, sudden numbness, or heavy trauma), please call <strong>911</strong> or visit the nearest hospital emergency department immediately.
          </div>
        </div>

        {/* Main Grid: Contact Form + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
            <h2 className="text-xl font-bold text-[#172B46] mb-1">Send a Message</h2>
            <p className="text-xs text-slate-500 mb-6">
              Our clinical administration staff typically responds within 1 business day.
            </p>

            {isSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-teal-50 text-[#56B7AD] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#172B46]">Message Received!</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. In this demo prototype, your inquiry has been simulated and logged. A coordinator would normally follow up at {email}.
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-[#172B46] text-white text-xs font-semibold rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                    />
                    {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="eleanor@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                    />
                    {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                    />
                    {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                    >
                      <option value="General Appointment Inquiry">General Appointment Inquiry</option>
                      <option value="Reschedule / Cancel Existing Booking">
                        Reschedule / Cancel Existing Booking
                      </option>
                      <option value="Department Specialization Query">
                        Department Specialization Query
                      </option>
                      <option value="Insurance & Billing Assistance">
                        Insurance & Billing Assistance
                      </option>
                      <option value="Technical Website Support">Technical Website Support</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can assist with your hospital appointment scheduling..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                  />
                  {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#172B46] hover:bg-[#203a5e] text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Support Info Placeholders (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
              <h3 className="text-base font-bold text-[#172B46] pb-3 border-b border-slate-100">
                Hospital Contact Placeholders
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#56B7AD] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Hospital Medical Campus</h4>
                    <p className="text-slate-600">CareConnect Medical Center, Wing 4</p>
                    <p className="text-slate-500">742 Evergreen Healthcare Way, Metropolis</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#56B7AD] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Appointment Phone Line</h4>
                    <p className="text-slate-600">1-800-555-CARE (Demo line)</p>
                    <p className="text-[11px] text-slate-400">Available Mon–Fri, 8am–8pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#56B7AD] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Email Inquiries</h4>
                    <p className="text-slate-600">appointments@careconnect-demo.org</p>
                    <p className="text-[11px] text-slate-400">Representative demo email</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#56B7AD] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Hospital Clinic Hours</h4>
                    <p className="text-slate-600">Mon - Fri: 08:00 AM – 08:00 PM</p>
                    <p className="text-slate-600">Saturday: 09:00 AM – 04:00 PM</p>
                    <p className="text-slate-500">Sunday: Closed for Routine Clinics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto border-t border-slate-200/80 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#172B46]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-3.5 text-left flex items-center justify-between text-xs font-bold text-[#172B46]"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-[#56B7AD]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
