import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RotateCcw, AlertCircle, ArrowUpDown } from 'lucide-react';
import { DOCTORS, DEPARTMENTS } from '../data/mockData';
import { DoctorCard } from '../components/common/DoctorCard';

export const FindDoctor: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query Sync
  const initialSearch = searchParams.get('search') || '';
  const initialDept = searchParams.get('department') || 'all';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedDept, setSelectedDept] = useState(initialDept);
  const [selectedConsultType, setSelectedConsultType] = useState<'all' | 'In-Person' | 'Video Consultation'>('all');
  const [minExperience, setMinExperience] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee-asc' | 'fee-desc'>('rating');

  // Keep state synced if URL parameters change
  useEffect(() => {
    if (searchParams.get('search') !== null) {
      setSearchTerm(searchParams.get('search') || '');
    }
    if (searchParams.get('department') !== null) {
      setSelectedDept(searchParams.get('department') || 'all');
    }
  }, [searchParams]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDept('all');
    setSelectedConsultType('all');
    setMinExperience(0);
    setSelectedDay('all');
    setSortBy('rating');
    setSearchParams({});
  };

  // Filtered and Sorted Doctors
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // Search text match (name, specialization, expertise, department)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesSpec = doc.specialization.toLowerCase().includes(query);
        const matchesDept = doc.departmentName.toLowerCase().includes(query);
        const matchesExpertise = doc.expertise.some((exp) => exp.toLowerCase().includes(query));
        if (!matchesName && !matchesSpec && !matchesDept && !matchesExpertise) {
          return false;
        }
      }

      // Department filter
      if (selectedDept !== 'all' && doc.departmentId !== selectedDept) {
        return false;
      }

      // Consultation Type filter
      if (selectedConsultType !== 'all' && !doc.consultationTypes.includes(selectedConsultType)) {
        return false;
      }

      // Experience filter
      if (minExperience > 0 && doc.experienceYears < minExperience) {
        return false;
      }

      // Day Availability
      if (selectedDay !== 'all' && !doc.availableDays.includes(selectedDay)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'fee-asc') return a.consultationFee - b.consultationFee;
      if (sortBy === 'fee-desc') return b.consultationFee - a.consultationFee;
      return 0;
    });
  }, [searchTerm, selectedDept, selectedConsultType, minExperience, selectedDay, sortBy]);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider mb-1">
            CareConnect Specialists
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172B46] tracking-tight">
            Find the Right Doctor for You
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Search our directory of certified hospital physicians, filter by specialty and availability, and schedule your appointment online.
          </p>
        </div>

        {/* Filter & Search Bar Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by doctor name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
              />
            </div>

            {/* Department Dropdown */}
            <div className="md:col-span-4">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
              >
                <option value="all">All Departments</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} ({dept.doctorCount} doctors)
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3 flex items-center gap-2">
              <div className="w-full relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD]"
                >
                  <option value="rating">Sort: Highest Rated</option>
                  <option value="experience">Sort: Experience (High to Low)</option>
                  <option value="fee-asc">Sort: Fee (Lowest First)</option>
                  <option value="fee-desc">Sort: Fee (Highest First)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Secondary Filter Controls Row */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              {/* Consultation Type segmented buttons */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Type:</span>
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
                  <button
                    onClick={() => setSelectedConsultType('all')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      selectedConsultType === 'all'
                        ? 'bg-white text-[#172B46] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    onClick={() => setSelectedConsultType('In-Person')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      selectedConsultType === 'In-Person'
                        ? 'bg-white text-[#172B46] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    In-Person
                  </button>
                  <button
                    onClick={() => setSelectedConsultType('Video Consultation')}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                      selectedConsultType === 'Video Consultation'
                        ? 'bg-white text-[#172B46] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Video
                  </button>
                </div>
              </div>

              {/* Experience Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Experience:</span>
                <select
                  value={minExperience}
                  onChange={(e) => setMinExperience(Number(e.target.value))}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700"
                >
                  <option value={0}>Any Experience</option>
                  <option value={10}>10+ Years</option>
                  <option value={15}>15+ Years</option>
                </select>
              </div>

              {/* Availability Day */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Available On:</span>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700"
                >
                  <option value="all">Any Day</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm || selectedDept !== 'all' || selectedConsultType !== 'all' || minExperience > 0 || selectedDay !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-800 tabular-nums">{filteredDoctors.length}</span> verified specialists
          </p>
        </div>

        {/* Doctors Grid or Empty State */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#172B46] mb-2">No doctors match your criteria</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              We couldn't find any specialists matching your exact search terms or filter combinations. Try loosening the filters or search for another condition.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-[#172B46] text-white text-xs font-semibold rounded-xl hover:bg-[#203a5e] transition-colors"
            >
              Reset Filters & Show All Doctors
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
