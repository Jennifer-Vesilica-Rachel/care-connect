import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Doctor } from '../../types';
import { StarRating } from './StarRating';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const [imageError, setImageError] = useState(false);

  // Initials for avatar fallback
  const initials = doctor.name
    .replace('Dr. ', '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden">
      {/* Header section with photo & key info */}
      <div className="p-6 pb-5 flex gap-4">
        {/* Doctor Photo / Fallback */}
        <div className="shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
            {!imageError && doctor.imageUrl ? (
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#172B46] to-[#2a456c] text-white">
                <span className="text-xl font-bold tracking-tight">{initials}</span>
                <span className="text-[10px] text-teal-200">MD</span>
              </div>
            )}
          </div>
        </div>

        {/* Doctor title & meta */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-[#56B7AD] mb-0.5">
            {doctor.departmentName}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#172B46] truncate">
            <Link to={`/doctors/${doctor.id}`} className="hover:text-[#56B7AD] transition-colors">
              {doctor.name}
            </Link>
          </h3>
          <p className="text-xs text-slate-600 line-clamp-1 mb-2">
            {doctor.specialization}
          </p>

          <StarRating rating={doctor.rating} reviewsCount={doctor.reviewCount} size="sm" />

          {/* Clean unboxed metadata */}
          <div className="mt-2 text-xs text-slate-500 flex items-center flex-wrap gap-x-2 gap-y-1">
            <span>{doctor.experienceYears} yrs experience</span>
            <span aria-hidden="true">·</span>
            <span>{doctor.hospitalLocation.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* Middle details: qualifications & consultation fee */}
      <div className="px-6 py-3 bg-[#F7F4ED]/60 border-t border-b border-slate-100 text-xs text-slate-600 flex items-center justify-between">
        <div>
          <span className="text-slate-500">Fee:</span>{' '}
          <span className="font-bold text-[#172B46] text-sm tabular-nums">${doctor.consultationFee}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          {doctor.consultationTypes.includes('Video Consultation') && (
            <span className="flex items-center gap-1 text-[#172B46]">
              <Video className="w-3 h-3 text-[#56B7AD]" />
              Video available
            </span>
          )}
          <span className="flex items-center gap-1 text-slate-500">
            <MapPin className="w-3 h-3" />
            {doctor.roomNumber}
          </span>
        </div>
      </div>

      {/* Available Slots Preview */}
      <div className="px-6 py-4 flex-1">
        <div className="text-xs font-medium text-slate-700 mb-2 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Next Available Slots (Sample):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {doctor.availableSlots.slice(0, 3).map((slot, index) => (
            <span
              key={index}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium tabular-nums"
            >
              {slot}
            </span>
          ))}
          {doctor.availableSlots.length > 3 && (
            <span className="text-xs px-2 py-1 text-slate-500">
              +{doctor.availableSlots.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-6 pt-2 pb-5 flex items-center gap-2.5 mt-auto">
        <Link
          to={`/doctors/${doctor.id}`}
          className="flex-1 text-center py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-[#172B46] hover:bg-slate-50 transition-colors"
        >
          View Profile
        </Link>
        <Link
          to={`/appointments?doctorId=${doctor.id}&department=${doctor.departmentId}`}
          className="flex-1 text-center py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-[#172B46] hover:bg-[#203a5e] transition-colors inline-flex items-center justify-center gap-1.5"
        >
          <span>Book Appointment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};
