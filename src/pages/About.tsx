import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Clock,
  Eye,
  Heart,
  Search,
  Building2,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';
import modernFacilityImg from '../assets/images/careconnect_modern_facility_1791732448898.jpg';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-14 sm:py-20 border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
              About CareConnect
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#172B46] tracking-tight leading-tight">
              Making Healthcare Easier for Everyone
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              CareConnect was conceived to eliminate the friction, telephone back-and-forths, and opaque scheduling processes that keep patients from getting timely clinical care. We connect patients with hospital specialists transparently and securely.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Facility Showcase */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src={modernFacilityImg}
                  alt="Modern hospital reception and consultation center"
                  className="w-full h-[400px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
                Our Mission & Vision
              </span>
              <h2 className="text-3xl font-extrabold text-[#172B46] tracking-tight">
                Rebuilding the Healthcare Entrypoint
              </h2>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>Our Mission:</strong> To democratize direct access to certified medical specialists by providing patients with real-time schedule clarity, seamless digital appointment booking, and transparent clinic pricing.
                </p>
                <p>
                  <strong>Our Vision:</strong> A healthcare ecosystem where no patient delays diagnosis due to cumbersome telephone booking, where waiting rooms are calm, and where clinical time is devoted entirely to patient well-being.
                </p>
              </div>

              {/* Numerical proof metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-2xl font-extrabold text-[#172B46] tabular-nums">250+</div>
                  <div className="text-xs text-slate-500">Board Physicians</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#172B46] tabular-nums">45k+</div>
                  <div className="text-xs text-slate-500">Appointments Booked</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#172B46] tabular-nums">4.9/5</div>
                  <div className="text-xs text-slate-500">Patient Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How the platform simplifies appointments */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
              Transformative Workflow
            </span>
            <h2 className="text-3xl font-extrabold text-[#172B46] tracking-tight mt-1">
              How CareConnect Simplifies Hospital Scheduling
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Replacing fragmented hospital call lines with verified real-time digital access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#F7F4ED] border border-slate-200/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#172B46] text-[#56B7AD] flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-base font-bold text-[#172B46]">Direct Specialist Visibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Patients can browse verified physicians across Cardiology, Neurology, Pediatrics, and more—with credentials, languages, and specialties clearly stated.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F4ED] border border-slate-200/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#172B46] text-[#56B7AD] flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-base font-bold text-[#172B46]">Verified Open Slots</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rather than submitting a vague "request a call back" form, patients select real consultation openings that lock immediately into clinic calendars.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F4ED] border border-slate-200/60 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#172B46] text-[#56B7AD] flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-base font-bold text-[#172B46]">Zero Booking Fees</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe scheduling medical care should never have administrative access tolls. The standard clinic fee is paid directly on site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-extrabold text-[#172B46] tracking-tight mt-1">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Accessibility */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#56B7AD] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172B46]">Accessibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ensuring that finding specialized care is intuitive and responsive across all devices, demographics, and technical backgrounds.
              </p>
            </div>

            {/* Convenience */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#56B7AD] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172B46]">Convenience</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eliminating phone delays and manual paperwork so scheduling an appointment is fast, dependable, and available 24/7.
              </p>
            </div>

            {/* Transparency */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#56B7AD] flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172B46]">Transparency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clearly displaying doctor qualifications, hospital wings, consultation formats, and exact pricing before booking.
              </p>
            </div>

            {/* Patient-Centered Care */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#56B7AD] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#172B46]">Patient-Centered Care</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Prioritizing patient comfort, clinical dignity, and empathetic treatment at every touchpoint of the healthcare journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#172B46] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Find the Specialist You Need Today
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Explore our board-certified clinical faculty and schedule your visit in minutes.
          </p>
          <div className="pt-2">
            <Link
              to="/doctors"
              className="px-6 py-3.5 bg-[#56B7AD] hover:bg-[#48a298] text-white text-xs font-bold rounded-xl inline-flex items-center gap-2 transition-colors shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Find a Doctor</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
