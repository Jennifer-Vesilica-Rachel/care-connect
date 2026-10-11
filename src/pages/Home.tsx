import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Calendar,
  ShieldCheck,
  Clock,
  Video,
  Award,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, FAQS, MOCK_REVIEWS } from '../data/mockData';
import { DoctorCard } from '../components/common/DoctorCard';
import { DepartmentCard } from '../components/common/DepartmentCard';
import { StarRating } from '../components/common/StarRating';
import { CareConnectLogo } from '../components/common/CareConnectLogo';
import heroConsultationImg from '../assets/images/careconnect_hero_consultation_1791732420482.jpg';
import medicalTeamImg from '../assets/images/careconnect_medical_team_1791732432419.jpg';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchDoctor, setSearchDoctor] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchDoctor.trim()) params.set('search', searchDoctor.trim());
    if (selectedDept) params.set('department', selectedDept);
    navigate(`/doctors?${params.toString()}`);
  };

  const featuredDoctors = DOCTORS.slice(0, 3);
  const popularDepartments = DEPARTMENTS.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline, Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Natural editorial kicker */}
              <div className="text-xs font-semibold text-[#56B7AD] tracking-wide uppercase">
                Modern Hospital Appointment Booking
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172B46] tracking-tight leading-[1.1] text-balance">
                Healthcare Made Easier.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Connect directly with certified hospital specialists, explore clinical departments, and schedule in-person or video consultations without long telephone queues or waiting room delays.
              </p>

              {/* Interactive Search Bar Box */}
              <form
                onSubmit={handleHeroSearch}
                className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-200/90 max-w-2xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-6 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Doctor name or condition..."
                      value={searchDoctor}
                      onChange={(e) => setSearchDoctor(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <select
                      value={selectedDept}
                      onChange={(e) => setSelectedDept(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                    >
                      <option value="">All Departments</option>
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-[#172B46] hover:bg-[#203a5e] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </form>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/doctors"
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#172B46] hover:bg-[#223d60] shadow-sm transition-colors inline-flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-[#56B7AD]" />
                  <span>Find a Doctor</span>
                </Link>

                <Link
                  to="/appointments"
                  className="px-6 py-3.5 rounded-xl text-sm font-semibold text-[#172B46] bg-white border border-slate-200 hover:bg-slate-50 transition-colors inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#56B7AD]" />
                  <span>Book an Appointment</span>
                </Link>
              </div>

              {/* Trust proof inline */}
              <div className="pt-4 flex items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#56B7AD]" />
                  <span>100% Board Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#56B7AD]" />
                  <span>Instant Slot Confirmation</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero High-Fidelity Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-white">
                <img
                  src={heroConsultationImg}
                  alt="Doctor consulting with a patient in modern hospital clinic"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] sm:h-[480px] object-cover"
                />
                {/* Floating proof card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CareConnectLogo iconOnly size="md" />
                      <div>
                        <p className="text-xs font-bold text-[#172B46]">CareConnect Direct Desk</p>
                        <p className="text-[11px] text-slate-500">45,000+ Appointments Scheduled</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#172B46] tabular-nums">4.9 ★ Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE STEP HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-[#172B46] tracking-tight mt-1">
              How CareConnect Works
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              Booking your hospital appointment takes less than two minutes from search to confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#F7F4ED] rounded-2xl p-7 border border-slate-200/60 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#172B46] text-white flex items-center justify-center font-bold text-sm mb-5">
                  01
                </div>
                <h3 className="text-lg font-bold text-[#172B46] mb-2">Find Doctor or Specialty</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Browse by medical department, clinical condition, doctor experience, or consultation mode (in-person vs telehealth).
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/50">
                <Link to="/doctors" className="text-xs font-semibold text-[#172B46] hover:text-[#56B7AD] inline-flex items-center gap-1">
                  Explore Specialists <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F7F4ED] rounded-2xl p-7 border border-slate-200/60 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#172B46] text-white flex items-center justify-center font-bold text-sm mb-5">
                  02
                </div>
                <h3 className="text-lg font-bold text-[#172B46] mb-2">Select Date & Time Slot</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  View verified real-time schedule openings. Choose convenient morning, afternoon, or evening slots that fit your day.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/50">
                <Link to="/appointments" className="text-xs font-semibold text-[#172B46] hover:text-[#56B7AD] inline-flex items-center gap-1">
                  View Availability <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F7F4ED] rounded-2xl p-7 border border-slate-200/60 relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#172B46] text-white flex items-center justify-center font-bold text-sm mb-5">
                  03
                </div>
                <h3 className="text-lg font-bold text-[#172B46] mb-2">Instant Confirmation</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Receive an instant reference code and calendar invite. Arrive at the hospital without telephone wait-times or paper forms.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/50">
                <span className="text-xs text-slate-500 font-medium">No upfront booking charge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR MEDICAL DEPARTMENTS */}
      <section className="py-16 sm:py-20 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
                Clinical Excellence
              </span>
              <h2 className="text-3xl font-extrabold text-[#172B46] tracking-tight mt-1">
                Popular Medical Departments
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Specialized hospital wings staffed by certified experts equipped with modern diagnostic facilities.
              </p>
            </div>
            <Link
              to="/departments"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#172B46] hover:text-[#56B7AD] transition-colors"
            >
              <span>View All 8 Departments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDepartments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DOCTORS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
                Certified Specialists
              </span>
              <h2 className="text-3xl font-extrabold text-[#172B46] tracking-tight mt-1">
                Featured Hospital Doctors
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Experienced practitioners across internal medicine, cardiology, dermatology, and pediatrics.
              </p>
            </div>
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#172B46] hover:text-[#56B7AD] transition-colors"
            >
              <span>Explore All Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE CARECONNECT */}
      <section className="py-16 sm:py-20 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual banner */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative">
                <img
                  src={medicalTeamImg}
                  alt="CareConnect healthcare team"
                  referrerPolicy="no-referrer"
                  className="w-full h-[440px] object-cover"
                />
              </div>
            </div>

            {/* Content & Value Props */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
                Patient-Centered Standard
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172B46] tracking-tight">
                Why Choose CareConnect?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We believe accessing high-quality medical care should be as frictionless as modern digital services. No endless holding lines, confusion about fees, or double-booked slots.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#172B46]">
                    <ShieldCheck className="w-4 h-4 text-[#56B7AD]" />
                    <span>Verified Board Certification</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every physician is thoroughly vetted with accredited clinical credentials and active hospital privileges.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#172B46]">
                    <Clock className="w-4 h-4 text-[#56B7AD]" />
                    <span>Zero Waiting Room Guesswork</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Real-time slot allocation ensures priority check-in at the hospital clinic reception desk.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#172B46]">
                    <Video className="w-4 h-4 text-[#56B7AD]" />
                    <span>In-Person & Telehealth Options</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Choose between face-to-face appointments at our modern pavilion or secure video consultations from home.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#172B46]">
                    <Award className="w-4 h-4 text-[#56B7AD]" />
                    <span>Transparent Pricing</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Consultation fees are shown upfront with zero platform booking surcharges.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#172B46] hover:text-[#56B7AD] transition-colors"
                >
                  <span>Learn more about our mission and vision</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PATIENT TESTIMONIALS (Clearly identified as sample content) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
              Patient Voices
            </span>
            <h2 className="text-3xl font-extrabold text-[#172B46] tracking-tight mt-1">
              Sample Patient Feedback
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              (Representative sample feedback from demonstration patient evaluations)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-[#F7F4ED] rounded-2xl p-6 border border-slate-200/70 flex flex-col justify-between"
              >
                <div>
                  <StarRating rating={review.rating} size="sm" />
                  <p className="text-xs text-slate-700 leading-relaxed mt-4 italic">
                    "{review.comment}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#172B46]">{review.patientName}</p>
                    <p className="text-[11px] text-slate-500">CareConnect Patient</p>
                  </div>
                  <span className="text-[11px] text-slate-400">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-20 border-b border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
              Common Inquiries
            </span>
            <h2 className="text-3xl font-extrabold text-[#172B46] tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Find quick answers regarding our hospital appointment scheduling platform.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#172B46] hover:text-[#56B7AD] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180 text-[#56B7AD]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <p className="text-xs text-slate-500">
              Have another question? Reach our team anytime via the{' '}
              <Link to="/contact" className="text-[#56B7AD] font-semibold hover:underline">
                Contact Page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-16 bg-[#172B46] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Schedule Your Visit?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Experience modern, calm healthcare with CareConnect. Select your doctor and book your appointment in seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/appointments"
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-[#172B46] bg-white hover:bg-slate-100 transition-colors inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#56B7AD]" />
              <span>Book Appointment Now</span>
            </Link>
            <Link
              to="/doctors"
              className="px-6 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white border border-slate-600 hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-[#56B7AD]" />
              <span>Browse All Specialists</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
