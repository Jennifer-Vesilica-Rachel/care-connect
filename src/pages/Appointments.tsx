import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  User as UserIcon,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Video,
  Building,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  Printer,
  Trash2,
  CalendarCheck
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS } from '../data/mockData';
import { Doctor, Department, Appointment } from '../types';
import { useApp } from '../context/AppContext';
import { IconRenderer } from '../components/common/IconRenderer';

export const Appointments: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, appointments, addAppointment, cancelAppointment } = useApp();

  // Tab: 'book' or 'my-appointments'
  const activeTab = searchParams.get('tab') === 'my-appointments' ? 'my-appointments' : 'book';

  const setTab = (tab: 'book' | 'my-appointments') => {
    const next = new URLSearchParams(searchParams);
    if (tab === 'my-appointments') next.set('tab', 'my-appointments');
    else next.delete('tab');
    setSearchParams(next);
  };

  // Step state: 1 to 7
  // 1: Select Department
  // 2: Select Doctor
  // 3: Select Date
  // 4: Select Time Slot
  // 5: Enter Patient Details
  // 6: Review Booking Details
  // 7: Confirmation Screen
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form selections
  const [selectedDeptId, setSelectedDeptId] = useState<string>('');
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [consultationType, setConsultationType] = useState<'In-Person' | 'Video Consultation'>('In-Person');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // Patient form fields
  const [patientName, setPatientName] = useState(user?.name || '');
  const [patientEmail, setPatientEmail] = useState(user?.email || '');
  const [patientPhone, setPatientPhone] = useState(user?.phone || '');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Confirmation result
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  // Handle URL params prefill (e.g. ?doctorId=doc-sarah-wilson&department=general-medicine)
  useEffect(() => {
    const preDocId = searchParams.get('doctorId');
    const preDeptId = searchParams.get('department');

    if (preDocId) {
      const doc = DOCTORS.find((d) => d.id === preDocId);
      if (doc) {
        setSelectedDocId(doc.id);
        setSelectedDeptId(doc.departmentId);
        setCurrentStep(3); // jump directly to Date selection!
        return;
      }
    }

    if (preDeptId) {
      const dept = DEPARTMENTS.find((d) => d.id === preDeptId);
      if (dept) {
        setSelectedDeptId(dept.id);
        setCurrentStep(2); // jump directly to Doctor selection!
      }
    }
  }, [searchParams]);

  // Sync user info when logged in
  useEffect(() => {
    if (user) {
      if (!patientName) setPatientName(user.name);
      if (!patientEmail) setPatientEmail(user.email);
      if (!patientPhone) setPatientPhone(user.phone);
    }
  }, [user]);

  // Selected Entities
  const currentDept = DEPARTMENTS.find((d) => d.id === selectedDeptId);
  const currentDoc = DOCTORS.find((d) => d.id === selectedDocId);

  // Filter doctors by selected department
  const availableDoctorsInDept = selectedDeptId
    ? DOCTORS.filter((d) => d.departmentId === selectedDeptId)
    : DOCTORS;

  // Generate next 14 days sample availability dates
  const nextDays = React.useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
      // Skip Sundays
      if (d.getDay() !== 0) {
        days.push({
          dateString: d.toISOString().split('T')[0],
          dayName,
          formatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }),
          dayNum: d.getDate(),
          monthShort: d.toLocaleDateString('en-US', { month: 'short' })
        });
      }
    }
    return days;
  }, []);

  // Validation
  const validatePatientStep = () => {
    const errors: Record<string, string> = {};
    if (!patientName.trim()) errors.patientName = 'Full name is required';
    if (!patientEmail.trim() || !patientEmail.includes('@')) errors.patientEmail = 'Valid email is required';
    if (!patientPhone.trim() || patientPhone.length < 7) errors.patientPhone = 'Valid phone number is required';
    if (!reasonForVisit.trim()) errors.reasonForVisit = 'Reason for visit is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedDeptId) return;
    if (currentStep === 2 && !selectedDocId) return;
    if (currentStep === 3 && !selectedDate) return;
    if (currentStep === 4 && !selectedSlot) return;
    if (currentStep === 5) {
      if (!validatePatientStep()) return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmBooking = () => {
    if (!currentDoc || !currentDept) return;

    const newAppt = addAppointment({
      doctorId: currentDoc.id,
      doctorName: currentDoc.name,
      doctorSpecialization: currentDoc.specialization,
      doctorDepartment: currentDept.name,
      patientName,
      patientEmail,
      patientPhone,
      consultationType,
      date: selectedDate,
      timeSlot: selectedSlot,
      reasonForVisit,
      notes: additionalNotes,
      consultationFee: currentDoc.consultationFee
    });

    setConfirmedAppt(newAppt);
    setCurrentStep(7);
  };

  const handleResetWizard = () => {
    setCurrentStep(1);
    setSelectedDeptId('');
    setSelectedDocId('');
    setSelectedDate('');
    setSelectedSlot('');
    setConfirmedAppt(null);
  };

  const stepsList = [
    'Department',
    'Doctor',
    'Date',
    'Time Slot',
    'Patient Info',
    'Review'
  ];

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider mb-1">
              CareConnect Scheduling
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172B46] tracking-tight">
              Hospital Appointment Booking
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              (Demonstration Prototype · Browser Local Storage Persistence)
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-200/80 p-1 rounded-xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setTab('book')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'book'
                  ? 'bg-white text-[#172B46] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => setTab('my-appointments')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'my-appointments'
                  ? 'bg-white text-[#172B46] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5 text-[#56B7AD]" />
              <span>My Appointments</span>
              <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                ({appointments.length})
              </span>
            </button>
          </div>
        </div>

        {/* TAB 1: SCHEDULE FLOW */}
        {activeTab === 'book' ? (
          <div>
            {currentStep < 7 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Area: Step Form (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Step Progress Bar */}
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-3">
                      <span>
                        Step {currentStep} of {stepsList.length}:{' '}
                        <strong className="text-[#172B46]">{stepsList[currentStep - 1]}</strong>
                      </span>
                      <span className="tabular-nums font-semibold text-[#56B7AD]">
                        {Math.round((currentStep / stepsList.length) * 100)}% Complete
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#56B7AD] h-full transition-all duration-300"
                        style={{ width: `${(currentStep / stepsList.length) * 100}%` }}
                      />
                    </div>

                    {/* Step pills */}
                    <div className="hidden sm:flex items-center justify-between mt-3 text-[11px] text-slate-400">
                      {stepsList.map((stepName, idx) => (
                        <span
                          key={idx}
                          className={`${
                            currentStep === idx + 1
                              ? 'font-bold text-[#172B46]'
                              : currentStep > idx + 1
                              ? 'text-[#56B7AD]'
                              : ''
                          }`}
                        >
                          {idx + 1}. {stepName}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* STEP 1: SELECT DEPARTMENT */}
                  {currentStep === 1 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                      <h2 className="text-xl font-bold text-[#172B46] mb-1">
                        1. Select Clinical Department
                      </h2>
                      <p className="text-xs text-slate-500 mb-6">
                        Choose the department matching your medical symptom or condition.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {DEPARTMENTS.map((dept) => {
                          const isSelected = selectedDeptId === dept.id;
                          return (
                            <div
                              key={dept.id}
                              onClick={() => {
                                setSelectedDeptId(dept.id);
                                setSelectedDocId(''); // reset doctor if dept changes
                              }}
                              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                                isSelected
                                  ? 'border-[#56B7AD] bg-teal-50/40 ring-2 ring-[#56B7AD]/20'
                                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                              }`}
                            >
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'bg-[#56B7AD] text-white'
                                    : 'bg-white text-[#172B46] border border-slate-200'
                                }`}
                              >
                                <IconRenderer name={dept.iconName} className="w-5 h-5" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold text-[#172B46]">{dept.name}</h3>
                                <p className="text-xs text-slate-500 line-clamp-1">{dept.tagline}</p>
                                <span className="text-[11px] text-slate-400 mt-1 inline-block">
                                  {dept.doctorCount} Doctors Available
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: SELECT DOCTOR */}
                  {currentStep === 2 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between mb-1">
                        <h2 className="text-xl font-bold text-[#172B46]">2. Choose Your Doctor</h2>
                        {currentDept && (
                          <span className="text-xs font-semibold text-[#56B7AD]">
                            {currentDept.name}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-6">
                        Select a specialist based on their clinical background and available consultation formats.
                      </p>

                      <div className="space-y-4">
                        {availableDoctorsInDept.map((doc) => {
                          const isSelected = selectedDocId === doc.id;
                          return (
                            <div
                              key={doc.id}
                              onClick={() => setSelectedDocId(doc.id)}
                              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                                isSelected
                                  ? 'border-[#56B7AD] bg-teal-50/40 ring-2 ring-[#56B7AD]/20'
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                                  {doc.imageUrl ? (
                                    <img
                                      src={doc.imageUrl}
                                      alt={doc.name}
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center font-bold text-[#172B46] bg-slate-100">
                                      {doc.name.charAt(4)}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <h3 className="text-base font-bold text-[#172B46]">{doc.name}</h3>
                                  <p className="text-xs text-slate-600">{doc.specialization}</p>
                                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                                    <span>{doc.experienceYears} yrs exp</span>
                                    <span>·</span>
                                    <span>★ {doc.rating} ({doc.reviewCount})</span>
                                    <span>·</span>
                                    <span>{doc.hospitalLocation.split(',')[0]}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 shrink-0">
                                <div className="text-xs text-slate-500">
                                  Fee: <strong className="text-sm font-bold text-[#172B46]">${doc.consultationFee}</strong>
                                </div>
                                <span className="text-[11px] font-medium text-[#56B7AD] mt-1">
                                  {isSelected ? 'Selected ✓' : 'Click to Select'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: SELECT CONSULTATION TYPE & DATE */}
                  {currentStep === 3 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
                      <div>
                        <h2 className="text-xl font-bold text-[#172B46] mb-1">
                          3. Consultation Mode & Appointment Date
                        </h2>
                        <p className="text-xs text-slate-500">
                          Consultation with {currentDoc?.name || 'Selected Doctor'}.
                        </p>
                      </div>

                      {/* Consultation Type Selector */}
                      <div>
                        <label className="block text-xs font-bold text-[#172B46] uppercase tracking-wider mb-2">
                          Select Consultation Mode:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setConsultationType('In-Person')}
                            className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                              consultationType === 'In-Person'
                                ? 'border-[#56B7AD] bg-teal-50/40 text-[#172B46] ring-2 ring-[#56B7AD]/20'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <Building className="w-5 h-5 text-[#56B7AD]" />
                            <div>
                              <div className="text-xs font-bold">In-Person Hospital Visit</div>
                              <div className="text-[11px] text-slate-500">
                                {currentDoc?.hospitalLocation || 'Hospital Pavilion'}
                              </div>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setConsultationType('Video Consultation')}
                            className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                              consultationType === 'Video Consultation'
                                ? 'border-[#56B7AD] bg-teal-50/40 text-[#172B46] ring-2 ring-[#56B7AD]/20'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <Video className="w-5 h-5 text-[#56B7AD]" />
                            <div>
                              <div className="text-xs font-bold">Encrypted Video Call</div>
                              <div className="text-[11px] text-slate-500">
                                Join from smartphone or computer browser
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Date Selection Grid */}
                      <div>
                        <label className="block text-xs font-bold text-[#172B46] uppercase tracking-wider mb-2">
                          Available Dates (Sample Schedule):
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                          {nextDays.slice(0, 12).map((item) => {
                            const isSelected = selectedDate === item.dateString;
                            return (
                              <button
                                key={item.dateString}
                                type="button"
                                onClick={() => setSelectedDate(item.dateString)}
                                className={`p-3 rounded-xl border text-center transition-all ${
                                  isSelected
                                    ? 'border-[#56B7AD] bg-[#172B46] text-white shadow-xs'
                                    : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                                }`}
                              >
                                <div className="text-[11px] font-medium opacity-80">{item.monthShort}</div>
                                <div className="text-lg font-extrabold tabular-nums my-0.5">{item.dayNum}</div>
                                <div className="text-[10px] uppercase font-semibold tracking-wider">
                                  {item.dayName.slice(0, 3)}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: SELECT TIME SLOT */}
                  {currentStep === 4 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
                      <div>
                        <h2 className="text-xl font-bold text-[#172B46] mb-1">
                          4. Select a Convenient Time Slot
                        </h2>
                        <p className="text-xs text-slate-500">
                          Date:{' '}
                          <strong className="text-slate-800">
                            {selectedDate
                              ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : ''}
                          </strong>
                        </p>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#56B7AD]" />
                          <span>Clinic Consult Slots (Sample Availability):</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {(currentDoc?.availableSlots || [
                            '09:00 AM',
                            '10:30 AM',
                            '01:30 PM',
                            '03:00 PM',
                            '04:30 PM'
                          ]).map((slot) => {
                            const isSelected = selectedSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={`p-3.5 rounded-xl border text-center transition-all ${
                                  isSelected
                                    ? 'border-[#56B7AD] bg-[#56B7AD] text-white font-bold shadow-xs'
                                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium'
                                }`}
                              >
                                <span className="text-xs tabular-nums">{slot}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-800">
                        Notice: Slots are preserved locally for your demo testing session and do not trigger medical billing.
                      </div>
                    </div>
                  )}

                  {/* STEP 5: ENTER PATIENT DETAILS */}
                  {currentStep === 5 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-5">
                      <div>
                        <h2 className="text-xl font-bold text-[#172B46] mb-1">
                          5. Patient Information
                        </h2>
                        <p className="text-xs text-slate-500">
                          Enter the details of the individual receiving medical care.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Full Legal Name *
                          </label>
                          <input
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder="e.g. Alex Morgan"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                          />
                          {validationErrors.patientName && (
                            <p className="text-xs text-rose-500 mt-1">{validationErrors.patientName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                            placeholder="alex@example.com"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                          />
                          {validationErrors.patientEmail && (
                            <p className="text-xs text-rose-500 mt-1">{validationErrors.patientEmail}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Contact Phone Number *
                          </label>
                          <input
                            type="tel"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                          />
                          {validationErrors.patientPhone && (
                            <p className="text-xs text-rose-500 mt-1">{validationErrors.patientPhone}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Reason for Visit *
                          </label>
                          <input
                            type="text"
                            value={reasonForVisit}
                            onChange={(e) => setReasonForVisit(e.target.value)}
                            placeholder="e.g. Annual health check, recurring headache, rash"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                          />
                          {validationErrors.reasonForVisit && (
                            <p className="text-xs text-rose-500 mt-1">{validationErrors.reasonForVisit}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Medical History / Notes (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={additionalNotes}
                          onChange={(e) => setAdditionalNotes(e.target.value)}
                          placeholder="List any ongoing medications, allergies, or prior diagnosis notes..."
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 6: REVIEW BOOKING DETAILS */}
                  {currentStep === 6 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
                      <div>
                        <h2 className="text-xl font-bold text-[#172B46] mb-1">
                          6. Review Booking Details
                        </h2>
                        <p className="text-xs text-slate-500">
                          Please verify your schedule details before generating your appointment reference.
                        </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
                          <div>
                            <span className="text-[11px] font-semibold text-[#56B7AD] uppercase tracking-wider">
                              Specialist
                            </span>
                            <h3 className="text-base font-bold text-[#172B46]">{currentDoc?.name}</h3>
                            <p className="text-xs text-slate-600">
                              {currentDoc?.specialization} · {currentDept?.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {consultationType === 'In-Person' ? (
                                <span className="inline-flex items-center gap-1">
                                  <Building className="w-3.5 h-3.5 text-[#56B7AD]" />
                                  {currentDoc?.hospitalLocation} ({currentDoc?.roomNumber})
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  <Video className="w-3.5 h-3.5 text-[#56B7AD]" />
                                  Telehealth Video Link (Issued Upon Confirmation)
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] text-slate-500">Consultation Fee</span>
                            <p className="text-lg font-bold text-[#172B46] tabular-nums">
                              ${currentDoc?.consultationFee}
                            </p>
                            <span className="text-[10px] text-slate-400">Pay at Hospital / Clinic</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-slate-400">Date & Slot:</span>
                            <p className="font-semibold text-slate-800">
                              {selectedDate} at {selectedSlot}
                            </p>
                          </div>
                          <div>
                            <span className="text-slate-400">Consultation Format:</span>
                            <p className="font-semibold text-slate-800">{consultationType}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Patient:</span>
                            <p className="font-semibold text-slate-800">{patientName}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Contact:</span>
                            <p className="font-semibold text-slate-800">
                              {patientEmail} · {patientPhone}
                            </p>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-slate-400">Reason for Visit:</span>
                            <p className="font-semibold text-slate-800">{reasonForVisit}</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 bg-teal-50/50 p-4 rounded-xl border border-teal-200/60">
                        By clicking "Confirm Appointment", you acknowledge that this is an interactive demonstration prototype. Your booking details are stored in your browser session.
                      </div>
                    </div>
                  )}

                  {/* Previous & Next Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                      className={`px-5 py-2.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                        currentStep === 1
                          ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
                          : 'text-[#172B46] bg-white border border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    {currentStep < 6 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={
                          (currentStep === 1 && !selectedDeptId) ||
                          (currentStep === 2 && !selectedDocId) ||
                          (currentStep === 3 && !selectedDate) ||
                          (currentStep === 4 && !selectedSlot)
                        }
                        className="px-6 py-2.5 bg-[#172B46] hover:bg-[#203a5e] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>Continue</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleConfirmBooking}
                        className="px-6 py-2.5 bg-[#56B7AD] hover:bg-[#48a298] text-white text-xs font-bold rounded-xl inline-flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Appointment</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Area: Dynamic Booking Summary Card (4 cols) */}
                <div className="lg:col-span-4">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs sticky top-28 space-y-5">
                    <h3 className="text-sm font-bold text-[#172B46] uppercase tracking-wider pb-3 border-b border-slate-100">
                      Booking Summary
                    </h3>

                    {/* Department summary */}
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">
                        Department
                      </span>
                      <p className="text-xs font-bold text-slate-800">
                        {currentDept ? currentDept.name : 'Not selected yet'}
                      </p>
                    </div>

                    {/* Doctor summary */}
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">
                        Specialist
                      </span>
                      <p className="text-xs font-bold text-slate-800">
                        {currentDoc ? currentDoc.name : 'Not selected yet'}
                      </p>
                      {currentDoc && (
                        <p className="text-[11px] text-slate-500">{currentDoc.specialization}</p>
                      )}
                    </div>

                    {/* Schedule */}
                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">
                        Schedule
                      </span>
                      <p className="text-xs font-medium text-slate-800">
                        {selectedDate ? selectedDate : 'Select date'}
                        {selectedSlot ? ` · ${selectedSlot}` : ''}
                      </p>
                      <p className="text-[11px] text-[#56B7AD] font-medium mt-0.5">
                        {consultationType}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-600">Consultation Fee</span>
                      <span className="text-sm font-bold text-[#172B46] tabular-nums">
                        {currentDoc ? `$${currentDoc.consultationFee}` : '$0'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 leading-relaxed pt-2">
                      Zero upfront payment required. Bring your confirmation code to the hospital check-in counter.
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* STEP 7: CONFIRMATION SCREEN */
              <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-teal-50 text-[#56B7AD] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold text-[#56B7AD] uppercase tracking-wider">
                    Appointment Confirmed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172B46] tracking-tight mt-1">
                    Your Visit Is Scheduled!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">
                    A confirmation record has been generated and saved to your browser session.
                  </p>
                </div>

                {/* Reference Code Card */}
                {confirmedAppt && (
                  <div className="bg-[#F7F4ED] rounded-2xl p-6 border border-slate-200/80 text-left space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          Appointment Reference
                        </span>
                        <p className="text-xl font-mono font-bold text-[#172B46]">
                          {confirmedAppt.referenceNumber}
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-[#56B7AD] text-white rounded-md">
                        {confirmedAppt.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400">Doctor:</span>
                        <p className="font-semibold text-slate-800">{confirmedAppt.doctorName}</p>
                        <p className="text-slate-500 text-[11px]">{confirmedAppt.doctorSpecialization}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Department:</span>
                        <p className="font-semibold text-slate-800">{confirmedAppt.doctorDepartment}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Date & Slot:</span>
                        <p className="font-semibold text-slate-800">
                          {confirmedAppt.date} · {confirmedAppt.timeSlot}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-400">Consultation Type:</span>
                        <p className="font-semibold text-slate-800">{confirmedAppt.consultationType}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Patient:</span>
                        <p className="font-semibold text-slate-800">{confirmedAppt.patientName}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Contact:</span>
                        <p className="font-semibold text-slate-800">{confirmedAppt.patientPhone}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4 text-slate-500" />
                    <span>Print Receipt</span>
                  </button>

                  <button
                    onClick={() => setTab('my-appointments')}
                    className="px-4 py-2.5 rounded-xl bg-[#172B46] text-white text-xs font-semibold hover:bg-[#203a5e] inline-flex items-center gap-1.5"
                  >
                    <CalendarCheck className="w-4 h-4 text-[#56B7AD]" />
                    <span>View in My Appointments</span>
                  </button>

                  <button
                    onClick={handleResetWizard}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#56B7AD] hover:underline"
                  >
                    Book Another Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* TAB 2: MY APPOINTMENTS (BROWSER STORAGE LIST) */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#172B46]">My Scheduled Appointments</h2>
                  <p className="text-xs text-slate-500">
                    Appointments stored in your current browser session.
                  </p>
                </div>
                <button
                  onClick={() => setTab('book')}
                  className="px-4 py-2 bg-[#172B46] text-white text-xs font-semibold rounded-xl hover:bg-[#203a5e] inline-flex items-center gap-1.5"
                >
                  <span>Book New</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="p-5 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#172B46] bg-slate-200/80 px-2 py-0.5 rounded">
                            {appt.referenceNumber}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                              appt.status === 'Confirmed'
                                ? 'bg-teal-100 text-teal-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {appt.status}
                          </span>
                          <span className="text-xs text-slate-400">·</span>
                          <span className="text-xs text-slate-500">{appt.consultationType}</span>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-[#172B46]">{appt.doctorName}</h3>
                          <p className="text-xs text-slate-600">
                            {appt.doctorSpecialization} · {appt.doctorDepartment}
                          </p>
                        </div>

                        <div className="text-xs text-slate-500 flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="w-3.5 h-3.5 text-[#56B7AD]" />
                            {appt.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#56B7AD]" />
                            {appt.timeSlot}
                          </span>
                          <span>Patient: {appt.patientName}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                        {appt.status === 'Confirmed' && (
                          <button
                            onClick={() => cancelAppointment(appt.id)}
                            className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Cancel Booking</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <p className="text-sm">You have no appointments scheduled yet.</p>
                  <button
                    onClick={() => setTab('book')}
                    className="mt-4 px-4 py-2 bg-[#172B46] text-white text-xs font-semibold rounded-xl"
                  >
                    Schedule an Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
