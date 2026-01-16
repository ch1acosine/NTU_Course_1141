
import React, { useState, useMemo, useCallback } from 'react';
import { RankedCourse, ViewMode, Course } from './types';
import { INITIAL_COURSES, checkOverlap, ALL_SLOTS } from './constants';
import CourseCard from './components/CourseCard';
import ScheduleView from './components/ScheduleView';
import { ArrowDownTrayIcon, ListBulletIcon, CalendarDaysIcon, FunnelIcon } from '@heroicons/react/24/outline';

const App: React.FC = () => {
  const [courses, setCourses] = useState<RankedCourse[]>(
    INITIAL_COURSES.map((c, i) => ({ ...c, rank: i + 1 }))
  );
  const [viewMode, setViewMode] = useState<ViewMode>('ranking');
  const [activeFilterId, setActiveFilterId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'conflict' | 'pe' | null>(null);

  // 拖曳狀態
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const updateRanks = (list: RankedCourse[]) => {
    return list.map((c, i) => ({ ...c, rank: i + 1 }));
  };

  const handleExportCSV = () => {
    const headers = ['志願序', '流水號', '課號', '課名', '老師', '時間', '學分'];
    const rows = courses.map(c => [
      c.rank,
      c.id,
      c.courseId,
      c.name,
      c.teacher,
      `"${c.time}"`,
      c.credits
    ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `選課志願序_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCourses = useMemo(() => {
    if (!filterType) return courses;
    if (filterType === 'pe') {
      return courses.filter(c => c.isPE);
    }
    if (filterType === 'conflict' && activeFilterId) {
      const target = courses.find(c => c.id === activeFilterId);
      if (!target) return courses;
      return courses.filter(c => c.id === activeFilterId || checkOverlap(c, target));
    }
    return courses;
  }, [courses, filterType, activeFilterId]);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    // 使用函數式更新以避免閉包陷阱
    setCourses(prev => {
      const newList = [...prev];
      const sourceIdx = newList.findIndex(c => c.id === draggedId);
      const targetIdx = newList.findIndex(c => c.id === targetId);

      if (sourceIdx === -1 || targetIdx === -1) return prev;
      if (sourceIdx === targetIdx) return prev;

      const [movedItem] = newList.splice(sourceIdx, 1);
      newList.splice(targetIdx, 0, movedItem);
      return updateRanks(newList);
    });
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  const toggleConflictFilter = (id: string) => {
    if (filterType === 'conflict' && activeFilterId === id) {
      setFilterType(null);
      setActiveFilterId(null);
    } else {
      setFilterType('conflict');
      setActiveFilterId(id);
    }
  };

  const togglePEFilter = () => {
    if (filterType === 'pe') {
      setFilterType(null);
    } else {
      setFilterType('pe');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
               <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <span className="text-white font-black text-xl">N</span>
               </div>
               <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">志願序管家</h1>
            </div>
            <nav className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setViewMode('ranking')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'ranking' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <ListBulletIcon className="w-4 h-4" />
                <span>志願排序</span>
              </button>
              <button 
                onClick={() => setViewMode('schedule')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'schedule' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <CalendarDaysIcon className="w-4 h-4" />
                <span>課表總覽</span>
              </button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleExportCSV}
              className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>匯出志願序 CSV</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {viewMode === 'ranking' ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900">排序您的課程</h2>
                <p className="text-slate-500 text-base mt-2 font-medium">拖曳卡片即可變更志願序順序。點擊「時間」可專注排序衝堂群組。</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={togglePEFilter}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${filterType === 'pe' ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400 hover:text-emerald-600'}`}
                >
                  <FunnelIcon className="w-4 h-4" />
                  <span>體育課群組排序</span>
                </button>
                {filterType && (
                  <button 
                    onClick={() => { setFilterType(null); setActiveFilterId(null); }}
                    className="text-sm text-rose-600 hover:text-rose-700 font-bold px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    取消篩選
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto pb-32">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  draggable
                  onDragStart={() => handleDragStart(course.id)}
                  onDragOver={(e) => handleDragOver(e, course.id)}
                  onDragEnd={handleDragEnd}
                  className={`transition-all duration-300 ${draggedId === course.id ? 'opacity-20 scale-95' : 'opacity-100'}`}
                >
                  <CourseCard 
                    course={course} 
                    onTimeClick={() => toggleConflictFilter(course.id)}
                    isActiveFilter={activeFilterId === course.id}
                  />
                </div>
              ))}
              {filteredCourses.length === 0 && (
                <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-inner">
                  <div className="text-slate-200 mb-4 flex justify-center">
                    <ListBulletIcon className="w-20 h-20" />
                  </div>
                  <p className="text-slate-400 font-bold text-xl">找不到符合條件的課程</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-slate-900">課表全圖總覽</h2>
              <p className="text-slate-500 text-base mt-2 font-medium">一覽各時段的所有志願備選。彩色背景代表您的第一志願。</p>
            </div>
            <ScheduleView rankedCourses={courses} />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-4 sticky bottom-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-bold">
          <div className="flex items-center gap-4 text-slate-600">
            <span className="bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">已完整匯入 {courses.length} / 100 門課程</span>
            <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full border border-blue-100 tracking-tight">志願範圍：1 ~ {courses.length}</span>
          </div>
          <div className="text-slate-400 font-mono tracking-tighter">
            NTU SELECTION HELPER 2024
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
