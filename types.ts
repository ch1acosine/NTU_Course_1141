
export interface Course {
  id: string; // 流水號
  courseId: string; // 課號
  name: string; // 課名
  credits: number; // 學分
  teacher: string; // 老師
  time: string; // 時間原始字串
  parsedTime: { day: number; slots: string[] }[]; // 解析後的時間
  departmentOnly: boolean; // 限本系
  noInitialSelection: boolean; // 初選不開放
  category?: string; // 備註/領域
  isPE: boolean; // 體育課
}

export type ViewMode = 'ranking' | 'schedule';

export interface RankedCourse extends Course {
  rank: number;
}
