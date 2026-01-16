
import React from 'react';
import { RankedCourse } from '../types';
import { ClockIcon, UserIcon, BookmarkIcon, ExclamationTriangleIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface Props {
  course: RankedCourse;
  onTimeClick: () => void;
  isActiveFilter?: boolean;
}

const CourseCard: React.FC<Props> = ({ course, onTimeClick, isActiveFilter }) => {
  return (
    <div className={`group bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-grab active:cursor-grabbing select-none ${isActiveFilter ? 'border-blue-500 ring-8 ring-blue-50' : 'border-slate-200'}`}>
      {/* Rank Badge */}
      <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all transform group-hover:scale-110 ${isActiveFilter ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 border-slate-100 text-slate-400 font-black'}`}>
        <span className="text-xl">{course.rank}</span>
      </div>

      {/* Course Info */}
      <div className="flex-grow min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[11px] font-black font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 tracking-wider">
            {course.id}
          </span>
          <h3 className="text-lg font-extrabold text-slate-900 truncate">{course.name}</h3>
          {course.isPE && (
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 uppercase tracking-tighter">體育課程</span>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <UserIcon className="w-4 h-4 text-slate-400" />
            <span>{course.teacher}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onTimeClick();
            }}
            className={`flex items-center gap-1.5 hover:text-blue-600 transition-all px-2 py-1 -mx-2 rounded-lg ${isActiveFilter ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-50'}`}
            title="點擊依衝堂時段排序"
          >
            <ClockIcon className="w-4 h-4 text-blue-500" />
            <span className="font-bold border-b-2 border-slate-200 group-hover:border-blue-300">{course.time}</span>
          </button>
          <div className="flex items-center gap-1.5">
            <BookmarkIcon className="w-4 h-4 text-slate-400" />
            <span>{course.credits} 學分</span>
          </div>
        </div>

        {/* Warnings - Highlighted in Red as requested */}
        {(course.departmentOnly || course.noInitialSelection) && (
          <div className="mt-3.5 flex flex-wrap gap-2.5">
            {course.departmentOnly && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-white bg-rose-500 px-3 py-1 rounded-lg shadow-sm animate-pulse">
                <ExclamationTriangleIcon className="w-3.5 h-3.5" />
                限本系所學生
              </span>
            )}
            {course.noInitialSelection && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-rose-600 bg-rose-50 border-2 border-rose-100 px-3 py-1 rounded-lg shadow-sm">
                <ExclamationTriangleIcon className="w-3.5 h-3.5" />
                初選不開放
              </span>
            )}
          </div>
        )}
      </div>

      {/* Reorder Icon */}
      <div className="flex-shrink-0 text-slate-300 group-hover:text-slate-500 transition-colors">
        <ChevronUpDownIcon className="w-6 h-6" />
      </div>
    </div>
  );
};

export default CourseCard;
