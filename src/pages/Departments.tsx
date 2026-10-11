import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DEPARTMENTS } from '../data/mockData';
import { DepartmentCard } from '../components/common/DepartmentCard';

export const Departments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDepartments = DEPARTMENTS.filter((dept) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    const nameMatch = dept.name.toLowerCase().includes(q);
    const descMatch = dept.description.toLowerCase().includes(q);
    const conditionMatch = dept.commonConditions.some((c) => c.toLowerCase().includes(q));
    const featureMatch = dept.features.some((f) => f.toLowerCase().includes(q));
    return nameMatch || descMatch || conditionMatch || featureMatch;
  });

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="text-xs font-semibold text-[#56B7AD] uppercase tracking-wider mb-1">
            Clinical Centers of Excellence
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172B46] tracking-tight">
            Explore Our Departments
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            CareConnect brings together specialized hospital divisions staffed by certified department heads and equipped with high-precision diagnostic and surgical suites.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mb-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search department or medical condition (e.g. Asthma, Migraine, Knee)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#56B7AD]/40 focus:border-[#56B7AD] shadow-2xs"
          />
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDepartments.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
            <h3 className="text-base font-bold text-[#172B46] mb-1">No departments found</h3>
            <p className="text-xs text-slate-500 mb-4">
              No clinical divisions matched "{searchTerm}".
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-[#172B46] text-white text-xs font-semibold rounded-lg"
            >
              Show All Departments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
