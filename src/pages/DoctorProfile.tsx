import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Award,
  GraduationCap,
  Languages,
  CheckCircle2,
  Building,
  Star,
  ChevronLeft,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { DOCTORS, MOCK_REVIEWS } from '../data/mockData';
import { StarRating } from '../components/common/StarRating';
import { useApp } from '../context/AppContext';

export const DoctorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useApp();

  const doctor = DOCTORS.find((d) => d.id === id);

  // Sample reviews state for this doctor
  const [reviews, setReviews] = useState(() => {
    return MOCK_REVIEWS.filter((r) => r.doctorId === id || r.doctorId === 'doc-sarah-wilson');
  });

  // Demo review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewerName, setNewReviewerName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  if (!doctor) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-slate-200 text-center space-y-4">
          <h2 className="text-xl font-bold text-[#172B46]">Doctor Not Found</h2>
          <p className="text-xs text-slate-500">
            The specialist you are looking for does not exist in our directory or has updated their hospital affiliation.
          </p>
          <Link
            to="/doctors"
            className="inline-block px-5 py-2.5 bg-[#172B46] text-white text-xs font-semibold rounded-xl"
          >
            Back to Doctor Directory
          </Link>
        </div>
      </div>
    );
  }

  const handleAddDemoReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewerName.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: 'rev-' + Date.now(),
      doctorId: doctor.id,
      patientName: newReviewerName,
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment,
      verifiedVisit: true
    };

    setReviews([newRev, ...reviews]);
    setNewReviewerName('');
    setNewReviewComment('');
    setShowReviewForm(false);
    showToast('Your sample review was posted successfully!', 'success');
  };

  const initials = doctor.name
    .replace('Dr. ', '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            to="/doctors"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#172B46] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Doctors</span>
          </Link>
        </div>

        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Doctor Photo */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
                {doctor.imageUrl ? (
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#172B46] text-white">
                    <span className="text-3xl font-bold">{initials}</span>
                    <span className="text-xs text-teal-300">Physician</span>
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Core Info */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider">
                  {doctor.departmentName}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500">{doctor.title}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B46] tracking-tight">
                {doctor.name}
              </h1>

              <p className="text-sm font-medium text-slate-700">{doctor.specialization}</p>

              <StarRating rating={doctor.rating} reviewsCount={doctor.reviewCount} size="md" />

              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#56B7AD]" />
                  <span>{doctor.experienceYears} Years Clinical Experience</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#56B7AD]" />
                  <span>{doctor.hospitalLocation.split(',')[0]}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-[#56B7AD]" />
                  <span>Languages: {doctor.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Booking Side CTA */}
            <div className="lg:col-span-3 bg-[#F7F4ED] rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs text-slate-500 font-medium">Consultation Fee</span>
                <div className="text-2xl font-extrabold text-[#172B46] tabular-nums mt-0.5">
                  ${doctor.consultationFee}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Per clinical appointment</p>
              </div>

              <div className="space-y-2">
                <Link
                  to={`/appointments?doctorId=${doctor.id}&department=${doctor.departmentId}`}
                  className="w-full py-3 px-4 bg-[#172B46] hover:bg-[#203a5e] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-[#56B7AD]" />
                  <span>Book Appointment</span>
                </Link>

                <div className="text-center">
                  <span className="text-[10px] text-slate-500">
                    Next sample slot: {doctor.availableSlots[0] || '10:00 AM'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* About */}
            <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-[#172B46]">About {doctor.name}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{doctor.about}</p>
            </section>

            {/* Areas of Expertise */}
            <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-[#172B46]">Areas of Clinical Expertise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {doctor.expertise.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-2.5 text-xs text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#56B7AD] shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Education & Fellowships */}
            <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-[#172B46] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#56B7AD]" />
                <span>Education & Fellowships</span>
              </h2>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {doctor.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#56B7AD] font-bold mt-0.5">•</span>
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Patient Reviews Section */}
            <section className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-bold text-[#172B46]">Patient Reviews</h2>
                  <p className="text-xs text-slate-500">
                    Sample reviews from demonstration hospital consultations
                  </p>
                </div>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-[#172B46] hover:bg-slate-50 inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#56B7AD]" />
                  <span>Leave Sample Review</span>
                </button>
              </div>

              {/* Add Demo Review Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleAddDemoReview}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs"
                >
                  <h4 className="font-bold text-slate-800">Write a Demo Patient Review</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={newReviewerName}
                        onChange={(e) => setNewReviewerName(e.target.value)}
                        placeholder="e.g. Jordan Smith"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">Rating</label>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                      >
                        <option value={5}>5 Stars - Excellent Care</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Average</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Comments</label>
                    <textarea
                      required
                      rows={2}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share your experience with this physician..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#172B46] text-white rounded-lg font-semibold"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{rev.patientName}</span>
                        {rev.verifiedVisit && (
                          <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-medium">
                            Verified Patient
                          </span>
                        )}
                      </div>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <StarRating rating={rev.rating} size="sm" />
                    <p className="text-xs text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar: Clinic Location & Working Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Clinic Info Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#172B46] uppercase tracking-wider pb-2 border-b border-slate-100">
                Clinic Location & Access
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#56B7AD] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Hospital Wing:</span>
                    <p>{doctor.hospitalLocation}</p>
                    <p className="text-slate-500 font-mono text-[11px] mt-0.5">
                      Room: {doctor.roomNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
                  <Clock className="w-4 h-4 text-[#56B7AD] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Available Clinic Days:</span>
                    <p>{doctor.availableDays.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2 border-t border-slate-100">
                  <Video className="w-4 h-4 text-[#56B7AD] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Consultation Modes:</span>
                    <p>{doctor.consultationTypes.join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Available Slots */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#172B46] uppercase tracking-wider pb-2 border-b border-slate-100">
                Sample Schedule Openings
              </h3>
              <p className="text-xs text-slate-500">
                Sample openings available for this physician:
              </p>
              <div className="flex flex-wrap gap-2">
                {doctor.availableSlots.map((slot, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 tabular-nums"
                  >
                    {slot}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to={`/appointments?doctorId=${doctor.id}&department=${doctor.departmentId}`}
                  className="w-full py-2.5 px-3 bg-[#172B46] hover:bg-[#203a5e] text-white text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Select Slot in Booking Flow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
