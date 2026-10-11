import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { CareConnectLogo } from '../common/CareConnectLogo';
import { DEPARTMENTS } from '../../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#172B46] text-slate-300 border-t border-slate-800">
      {/* Upper footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <CareConnectLogo size="lg" variant="light" />
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed">
              CareConnect is a modern hospital appointment booking platform designed to connect patients directly with certified clinical specialists, streamline scheduling, and eliminate waiting times.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#56B7AD]" />
                <span>Verified Hospital Specialists & Accredited Departments</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#56B7AD]" />
                <span>Online Booking Open 24 Hours / 7 Days a Week</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">Quick Navigation</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">Find a Doctor</Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors">Medical Departments</Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:text-white transition-colors">Book Appointment</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About CareConnect</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

          {/* Clinical Departments */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">Departments</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {DEPARTMENTS.slice(0, 6).map((dept) => (
                <li key={dept.id}>
                  <Link
                    to={`/doctors?department=${dept.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {dept.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">Hospital Contact</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#56B7AD] shrink-0 mt-0.5" />
                <span>CareConnect Medical Pavilion, 742 Evergreen Healthcare Way, Metropolis, NY</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#56B7AD] shrink-0" />
                <span>1-800-555-CARE (Demo Line)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#56B7AD] shrink-0" />
                <span>appointments@careconnect-demo.org</span>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                Clinic Hours: Mon – Fri: 08:00 AM – 08:00 PM<br />
                Weekend Consultations: 09:00 AM – 04:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Prototype notice banner */}
        <div className="mt-12 pt-6 border-t border-slate-800 bg-slate-900/40 rounded-xl p-4 text-xs text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">
            ⚠️ Demonstration Notice & Medical Disclaimer:
          </p>
          <p>
            CareConnect is a technology demonstration application. All doctor schedules, appointment slots, and credentials shown are mock data for evaluation purposes. In the event of an urgent medical emergency, do not wait for an online booking—dial 911 or visit your nearest emergency emergency room immediately.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} CareConnect Health Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Patient Rights</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
