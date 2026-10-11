import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { Department } from '../../types';
import { IconRenderer } from './IconRenderer';

interface DepartmentCardProps {
  department: Department;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-[#56B7AD]/40 hover:shadow-md transition-all group">
      <div>
        {/* Department Icon & Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#F7F4ED] text-[#172B46] group-hover:bg-[#56B7AD]/10 group-hover:text-[#56B7AD] flex items-center justify-center transition-colors">
            <IconRenderer name={department.iconName} className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <Users className="w-3.5 h-3.5" />
            <span className="tabular-nums">{department.doctorCount} Doctors</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg font-bold text-[#172B46] mb-1 group-hover:text-[#56B7AD] transition-colors">
          <Link to={`/doctors?department=${department.id}`}>
            {department.name}
          </Link>
        </h3>
        <p className="text-xs font-medium text-slate-500 mb-3">{department.tagline}</p>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {department.description}
        </p>

        {/* Common conditions as unboxed clean text */}
        <div className="pt-3 border-t border-slate-100 mb-5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Focus Areas
          </div>
          <p className="text-xs text-slate-600 line-clamp-2">
            {department.commonConditions.join(' · ')}
          </p>
        </div>
      </div>

      {/* Button link */}
      <Link
        to={`/doctors?department=${department.id}`}
        className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-[#172B46] hover:bg-[#172B46] hover:text-white hover:border-[#172B46] transition-all"
      >
        <span>View Doctors</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </article>
  );
};
