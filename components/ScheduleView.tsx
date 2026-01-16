
import React from 'react';
import { RankedCourse } from '../types';
import { ALL_SLOTS } from '../constants';

interface Props {
  rankedCourses: RankedCourse[];
}

const ScheduleView: React.FC<Props> = ({ rankedCourses }) => {
  const days = ['週一', '週二', '週三', '週四', '週五'];
  
  // Organize courses by day and slot
  const scheduleData: Record<string, RankedCourse[]> = {};

  rankedCourses.forEach(course => {
    course.parsedTime.forEach(time => {
      if (time.day >= 1 && time.day <= 5) {
        time.slots.forEach(slot => {
          const key = `${time.day}-${slot}`;
          if (!scheduleData[key]) scheduleData[key] = [];
          scheduleData[key].push(course);
        });
      }
    });
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-r border-slate-200 w-20">節次</th>
              {days.map((day, i) => (
                <th key={i} className="p-4 text-sm font-bold text-slate-700 uppercase tracking-wider min-w-[160px]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_SLOTS.map((slot, sIdx) => (
              <tr key={slot} className={sIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}>
                <td className="p-4 text-center border-r border-slate-200 bg-slate-50/50">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-slate-800">{slot}</span>
                    <span className="text-[10px] text-slate-400 font-medium">節</span>
                  </div>
                </td>
                {[1, 2, 3, 4, 5].map(dayNum => {
                  const cellCourses = scheduleData[`${dayNum}-${slot}`] || [];
                  // Sort by rank
                  const sortedCellCourses = [...cellCourses].sort((a, b) => a.rank - b.rank);

                  return (
                    <td key={dayNum} className="p-2 border-r border-b border-slate-100 align-top min-h-[100px]">
                      <div className="space-y-1.5">
                        {sortedCellCourses.map((c, idx) => (
                          <div 
                            key={`${c.id}-${idx}`}
                            className={`p-2 rounded-lg border text-[11px] transition-all hover:ring-2 hover:ring-blue-200 ${idx === 0 ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-white border-slate-200 text-slate-500'}`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold opacity-70">#{c.rank}</span>
                              <span className="font-mono bg-white/50 px-1 rounded border border-current opacity-60 scale-75 origin-right">{c.id}</span>
                            </div>
                            <div className="font-bold line-clamp-2 leading-tight mb-1">{c.name}</div>
                            <div className="text-[9px] font-medium opacity-80">{c.teacher}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduleView;
