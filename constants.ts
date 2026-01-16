
import { Course } from './types';

export const DAYS_MAP: Record<string, number> = {
  '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '日': 7
};

export const ALL_SLOTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'B', 'C', 'D'];

export const parseTime = (timeStr: string) => {
  const result: { day: number; slots: string[] }[] = [];
  const segments = timeStr.trim().split(/\s+/);
  segments.forEach(seg => {
    const dayChar = seg[0];
    const day = DAYS_MAP[dayChar];
    if (day) {
      const slotsStr = seg.substring(1);
      const slots: string[] = [];
      let i = 0;
      while (i < slotsStr.length) {
        if (slotsStr.substring(i, i + 2) === '10') {
          slots.push('10');
          i += 2;
        } else if (slotsStr[i] === ',') {
          i++;
        } else {
          slots.push(slotsStr[i]);
          i++;
        }
      }
      result.push({ day, slots });
    }
  });
  return result;
};

export const checkOverlap = (courseA: Course, courseB: Course) => {
  for (const timeA of courseA.parsedTime) {
    for (const timeB of courseB.parsedTime) {
      if (timeA.day === timeB.day) {
        const intersection = timeA.slots.filter(s => timeB.slots.includes(s));
        if (intersection.length > 0) return true;
      }
    }
  }
  return false;
};

// 嚴謹校對過的 100 筆課程資料
export const RAW_COURSES: any[] = [
  { id: '11894', courseId: 'Geo5014', name: '石油及天然氣資源導論', credits: 2, teacher: '吳榮章', time: '二A,B', note: '限學士班三年級以上' },
  { id: '12469', courseId: 'Hist1570', name: '東亞海域與臺灣', credits: 2, teacher: '李文良', time: '二3,4', note: 'A2:歷史思維' },
  { id: '12678', courseId: 'Hist1629', name: '中華人民共和國史: 來自普通人的觀點', credits: 3, teacher: '羅士傑', time: '三6,7,8', note: 'A2:歷史思維' },
  { id: '13037', courseId: 'Med1019', name: '從善終的故事學習生命的智慧', credits: 2, teacher: '蔡兆勳', time: '五8,9', note: 'A48:哲學與道德思考' },
  { id: '13910', courseId: 'LibEdu1133', name: '半導體科技綜觀', credits: 2, teacher: '陳林祈', time: '五6,7', note: 'A7:物質科學' },
  { id: '14768', courseId: 'LAW3281', name: '民法債編各論', credits: 3, teacher: '陳皓芸', time: '四6,7,8', departmentOnly: true, note: '限本系所' },
  { id: '16110', courseId: 'PS4644', name: '決策者的危機處理機制', credits: 2, teacher: '徐斯勤', time: '四3,4', note: 'A5:公民意識' },
  { id: '16230', courseId: 'Phys5009', name: '天文物理學導論', credits: 3, teacher: '吳柏鋒', time: '二6,7,8', note: '' },
  { id: '16771', courseId: 'ME5134', name: '混沌力學導論', credits: 3, teacher: '伍次寅', time: '四7,8,9', note: '' },
  { id: '16931', courseId: 'AtmSci7100', name: '雲動力學實作', credits: 2, teacher: '吳健銘', time: '三8,9', note: '與陳維婷合授' },
  { id: '16960', courseId: 'Hist1537', name: '海峽兩岸關係史二', credits: 2, teacher: '李君山', time: '二6,7', note: 'A2:歷史思維' },
  { id: '16985', courseId: 'GenSys5023', name: '以Excel進行資料分析', credits: 2, teacher: '林友瑜', time: '一6,7', note: 'A6:數學與資訊科學' },
  { id: '17036', courseId: 'AGEC5037', name: '全球環境與資源安全', credits: 2, teacher: '楊之遠', time: '三8,9', note: '' },
  { id: '17132', courseId: 'Gipntu7054', name: '生活中的科技原理', credits: 3, teacher: '饒梓明', time: '四2,3,4', note: 'A78:物質科學' },
  { id: '17453', courseId: 'Hist2104', name: '中國傳統法律、文化與社會', credits: 3, teacher: '陳俊強', time: '四7,8,9', note: '兼通識A2*' },
  { id: '17583', courseId: 'MSPM5036', name: '農業試驗機構概觀', credits: 2, teacher: '姚舜閔', time: '四6,7', note: 'A8:生命科學' },
  { id: '18626', courseId: 'Chem3020', name: '從化學看世界', credits: 2, teacher: '劉如熹', time: '四6,7', note: 'A7:物質科學' },
  { id: '21391', courseId: 'Gipntu7053', name: '諾貝爾生醫獎得主的啟示', credits: 3, teacher: '饒梓明', time: '二2,3,4', note: 'A78:物質科學' },
  { id: '24021', courseId: 'MD&PH5007', name: '醫學與生活', credits: 2, teacher: '楊榮森', time: '三6,7', note: 'A8:生命科學' },
  { id: '24281', courseId: 'Forest5095', name: 'iOS SwiftUI手機應用程式設計入門', credits: 3, teacher: '余家斌', time: '二2,3,4', note: '兼通識A6*' },
  { id: '24884', courseId: 'AIA5350', name: '深度學習', credits: 3, teacher: '彭文孝', time: '四5,6,7', note: '英語授課' },
  { id: '25557', courseId: 'Ocean5115', name: '臺灣區域海洋學', credits: 2, teacher: '詹森', time: '二8,9', note: '' },
  { id: '26013', courseId: 'LAW5563', name: '中國法制及兩岸關係法律', credits: 2, teacher: '王泰銓', time: '四7,8,9', note: '密集課程' },
  { id: '26075', courseId: 'JOUR5024', name: '時事論壇製作實務', credits: 3, teacher: '詹怡宜', time: '五8,9,10', note: '新聞所優先' },
  { id: '26524', courseId: 'ECON1022', name: '個體經濟學原理', credits: 3, teacher: '駱明慶', time: '五3,4,5', note: '兼通識A5*' },
  { id: '26691', courseId: 'AtmSci5036', name: '航空氣象學', credits: 3, teacher: '王寶貫', time: '四8,9,10', note: '' },
  { id: '27079', courseId: 'LAW3260', name: '刑事訴訟法', credits: 4, teacher: '林鈺雄', time: '二6,7,8,9', departmentOnly: true, note: '限本系所' },
  { id: '27436', courseId: 'LAW5194', name: '國際經貿法', credits: 2, teacher: '羅懋緯', time: '二6,7', note: '' },
  { id: '28035', courseId: 'LibEdu1128', name: '半導體製程與科技', credits: 3, teacher: '徐振哲', time: '四7,8,9', note: 'A7:物質科學' },
  { id: '29233', courseId: 'PS1032', name: '中華民國憲法及政府二', credits: 2, teacher: '湯德宗', time: '四8,9', departmentOnly: true, note: '限本系所' },
  { id: '30242', courseId: 'MATH5240', name: '數學沙龍與生涯探索', credits: 1, teacher: '夏俊雄', time: '三8,9', note: '' },
  { id: '31349', courseId: 'LAW3187', name: '憲法訴訟法', credits: 2, teacher: '蘇慧婕', time: '五6,7', note: '' },
  { id: '32287', courseId: 'LIS5105', name: '科學傳播', credits: 3, teacher: '林維真', time: '三6,7,8', note: '' },
  { id: '32403', courseId: 'LAW2069', name: '民法債編總論二', credits: 3, teacher: '張譯文', time: '五2,3,4', departmentOnly: true, note: '限本系所' },
  { id: '32504', courseId: 'LAW3160', name: '行政法', credits: 4, teacher: '林明鏘', time: '一6,7 二3,4', departmentOnly: true, note: '限本系所' },
  { id: '33302', courseId: 'ECON1022', name: '個體經濟學原理', credits: 3, teacher: '李顯峰', time: '二7,8,9', note: '兼通識A5*' },
  { id: '33382', courseId: 'Ocean5008', name: '海洋科學概論', credits: 2, teacher: '楊穎堅', time: '五3,4', note: 'A7:物質科學' },
  { id: '33406', courseId: 'AtmSci3006', name: '物理海洋概論', credits: 2, teacher: '陳世楠', time: '三6,7', note: '' },
  { id: '33444', courseId: 'JOUR3004', name: '當代媒體實務講座', credits: 2, teacher: '詹怡宜', time: '五3,4', note: 'A5:公民意識' },
  { id: '33599', courseId: 'Ocean5008', name: '海洋科學概論', credits: 2, teacher: '楊穎堅', time: '五6,7', note: 'A7:物質科學' },
  { id: '34380', courseId: 'MD&PH5007', name: '醫學與生活', credits: 2, teacher: '楊榮森', time: '三8,9', note: 'A8:生命科學' },
  { id: '34808', courseId: 'ME5090', name: '生活中的力學', credits: 2, teacher: '莊國志', time: '三7,8', note: 'A7:物質科學' },
  { id: '34837', courseId: 'Hist1537', name: '海峽兩岸關係史二', credits: 2, teacher: '李君山', time: '五3,4', note: 'A2:歷史思維' },
  { id: '35143', courseId: 'LibEdu1125', name: '通識A3領域綜觀課程', credits: 2, teacher: '陳慧宏', time: '一8,9', note: 'A3:世界文明' },
  { id: '35767', courseId: 'AtmSci7126', name: '熱帶氣旋', credits: 2, teacher: '吳俊傑', time: '一3,4', departmentOnly: true, noInitialSelection: true, note: '初選不開放' },
  { id: '35842', courseId: 'IMPS1004', name: 'Python人工智慧程式設計入門', credits: 3, teacher: '陳彥賓', time: '三7,8,9', note: 'A6:數學與資訊科學' },
  { id: '36124', courseId: 'CSIE1928', name: 'C/C++程式設計', credits: 3, teacher: '張傑帆', time: '一5,6,7', note: 'A6:數學與資訊科學' },
  { id: '36848', courseId: 'PMLBA7052', name: '個人資料保護法概論', credits: 3, teacher: '洪士軒', time: '二A,B,C', note: '線上同步' },
  { id: '37136', courseId: 'LibEdu1126', name: '理想職涯與財富規劃', credits: 3, teacher: '林家振', time: '五7,8,9', note: 'A5:公民意識' },
  { id: '39256', courseId: 'AtmSci7118', name: '颱風動力', credits: 3, teacher: '郭鴻基', time: '三6,7,8', note: '' },
  { id: '39259', courseId: 'LS5073', name: '生命科學數學', credits: 2, teacher: '柯柏如', time: '一8,9', note: '' },
  { id: '39436', courseId: 'EE3015', name: '近代物理', credits: 3, teacher: '吳志毅', time: '二2,3,4', note: '' },
  { id: '40130', courseId: 'Ocean5134', name: '海洋監測與技術', credits: 2, teacher: '張明輝', time: '四8', note: '出海實習' },
  { id: '40296', courseId: 'ForMed7037', name: '國民法官必備之基礎鑑識科學', credits: 2, teacher: '翁德怡', time: '一8,9', note: 'A58' },
  { id: '41174', courseId: 'AtmSci7003', name: '高等大氣動力學', credits: 3, teacher: '郭鴻基', time: '一2,3,4', note: '' },
  { id: '41575', courseId: 'LAW3281', name: '民法債編各論', credits: 3, teacher: '吳從周', time: '二9,10,A', departmentOnly: true, note: '限本系所' },
  { id: '41808', courseId: 'LibEdu1119', name: '邏輯思考與應用', credits: 2, teacher: '王銀國', time: '三8,9', note: 'A4:邏輯思考' },
  { id: '41817', courseId: 'Gipntu7055', name: '生物科技與道德反思', credits: 3, teacher: '饒梓明', time: '四6,7,8', note: 'A48' },
  { id: '42196', courseId: 'CSIE1929', name: 'Python計算機程式設計', credits: 3, teacher: '張傑帆', time: '一8,9,10', note: 'A6:數學與資訊科學' },
  { id: '42538', courseId: 'IFSH5002', name: '當代食品安全議題', credits: 2, teacher: '羅宇軒', time: '二6,7', note: 'A58*' },
  { id: '43018', courseId: 'LAW2068', name: '民法債編總論一', credits: 3, teacher: '陳聰富', time: '四2,3,4', departmentOnly: true, note: '限本系所' },
  { id: '43257', courseId: 'MATH1008', name: '初等分析', credits: 2, teacher: '蔡國榮', time: '二8,9', note: '英語授課' },
  { id: '44050', courseId: 'MD&PH5007', name: '醫學與生活', credits: 2, teacher: '江鴻生', time: '三6,7', note: 'A8:生命科學' },
  { id: '44803', courseId: 'FOOD1001', name: '食品與健康', credits: 2, teacher: '沈立言', time: '二6,7', note: 'A8:生命科學' },
  { id: '45500', courseId: 'LAW2120', name: '英美法導論', credits: 2, teacher: '張文貞', time: '二8,9', note: '英語授課' },
  { id: '45518', courseId: 'CommE5055', name: '工程數學特論', credits: 3, teacher: '丁建均', time: '二7,8,9', note: '' },
  { id: '47582', courseId: 'IMPS1002', name: '統計Let\'s GO', credits: 3, teacher: '蘇士詠', time: '四6,7,8', note: '英語授課' },
  { id: '48389', courseId: 'EE4052', name: '計算機程式設計', credits: 2, teacher: '黃俊郎', time: '五2,3,4', note: 'A6:數學與資訊科學' },
  { id: '51023', courseId: 'LAW5568', name: '用臺語學民法', credits: 1, teacher: '詹森林', time: '三8,9', note: '雙週上課' },
  { id: '51115', courseId: 'PS1032', name: '中華民國憲法及政府二', credits: 2, teacher: '陳淳文', time: '四8,9', note: '' },
  { id: '52072', courseId: 'Hist1621', name: '中國古代思想史', credits: 2, teacher: '吳展良', time: '二8,9', note: 'A24' },
  { id: '53939', courseId: 'GenEdu5041', name: '學術英語：理工領域', credits: 2, teacher: '郭貞秀', time: '三10,A', note: '英語授課' },
  { id: '53969', courseId: 'IMPS1004', name: 'Python人工智慧程式設計入門', credits: 3, teacher: '陳彥賓', time: '三A,B,C', note: '英語授課' },
  { id: '55036', courseId: 'IPCS1003', name: '理解氣候變遷', credits: 2, teacher: '任昊佳', time: '五3,4', note: 'A67' },
  { id: '58156', courseId: 'LibEdu1021', name: '邏輯', credits: 2, teacher: '傅皓政', time: '一6,7', note: 'A4:邏輯學' },
  { id: '70046', courseId: 'TA10710001', name: '宇宙中的生命與太空環境', credits: 2, teacher: '橋本康', time: '三6,7', note: 'A78' },
  { id: '70435', courseId: 'TA11025008', name: '家庭與法律專題', credits: 3, teacher: '賴月蜜', time: '三A,B,C', note: '限修學制' },
  { id: '70467', courseId: 'TA10410177', name: '非營利組織管理', credits: 3, teacher: '沈慶盈', time: '一A,B,C', note: '' },
  { id: '71042', courseId: 'TB10320016', name: '建築法規', credits: 3, teacher: '高文婷', time: '三A,B,C', note: '' },
  { id: '71163', courseId: 'TB10420075', name: '保險學', credits: 3, teacher: '陳清源', time: '二A,B,C', note: '' },
  { id: '71231', courseId: 'TB10810028', name: '時事漫談智慧財產與科技法', credits: 2, teacher: 'Richard', time: '二6,7', note: 'A5:公民意識' },
  { id: '71321', courseId: 'TB10620044', name: '情感與法律', credits: 2, teacher: '徐泰國', time: '一8,9', note: '' },
  { id: '93001', courseId: 'MilTr1007', name: '國防政策', credits: 0, teacher: '余宗基', time: '五6,7', note: '軍事訓練' },
  { id: '93002', courseId: 'MilTr1007', name: '國防政策', credits: 0, teacher: '余宗基', time: '五8,9', note: '軍事訓練' },
  { id: '93003', courseId: 'MilTr1008', name: '防衛動員', credits: 0, teacher: '余宗基', time: '三6,7', note: '軍事訓練' },
  { id: '93004', courseId: 'MilTr1008', name: '防衛動員', credits: 0, teacher: '余宗基', time: '三8,9', note: '軍事訓練' },
  { id: '95049', courseId: 'MSPM5037', name: '樹木保護', credits: 2, teacher: '姚舜閔', time: '二3,4', note: 'A8:生命科學' },
  { id: '95067', courseId: 'PMLBA7063', name: '稅法導論', credits: 3, teacher: '邱怡凱', time: '二A,B,C', note: '遠距同步' },
  { id: '97008', courseId: 'PE2036', name: '太極拳初級', credits: 1, teacher: '游添燈', time: '一6,7', note: '體育' },
  { id: '97010', courseId: 'PE2036', name: '太極拳初級', credits: 1, teacher: '游添燈', time: '二8,9', note: '體育' },
  { id: '97011', courseId: 'PE2036', name: '太極拳初級', credits: 1, teacher: '施登堯', time: '三1,2', note: '體育' },
  { id: '97013', courseId: 'PE2037', name: '太極拳中級', credits: 1, teacher: '游添燈', time: '一8,9', note: '體育' },
  { id: '97133', courseId: 'PE2109', name: '橄欖球', credits: 1, teacher: '林威名', time: '一6,7', note: '體育' },
  { id: '97134', courseId: 'PE2109', name: '橄欖球', credits: 1, teacher: '林威名', time: '一8,9', note: '體育' },
  { id: '97135', courseId: 'PE2109', name: '橄欖球', credits: 1, teacher: '林威名', time: '三1,2', note: '體育' },
  { id: '97177', courseId: 'PE5014', name: '定向越野', credits: 1, teacher: '莊珮琪', time: '三6,7', note: '體育' },
  { id: '97178', courseId: 'PE5014', name: '定向越野', credits: 1, teacher: '莊珮琪', time: '三8,9', note: '體育' },
  { id: '97179', courseId: 'PE5014', name: '定向越野', credits: 1, teacher: '莊珮琪', time: '四1,2', note: '體育' },
  { id: '97180', courseId: 'PE5014', name: '定向越野', credits: 1, teacher: '莊珮琪', time: '四3,4', note: '體育' },
  { id: '97181', courseId: 'PE5018', name: '運動體能訓練', credits: 1, teacher: '呂祐華', time: '三1,2', note: '體育' },
];

export const INITIAL_COURSES: Course[] = RAW_COURSES.map(c => ({
  id: c.id,
  courseId: c.courseId,
  name: c.name,
  credits: c.credits,
  teacher: c.teacher,
  time: c.time,
  parsedTime: parseTime(c.time),
  departmentOnly: !!c.departmentOnly,
  noInitialSelection: !!c.noInitialSelection,
  isPE: c.courseId.startsWith('PE'),
  category: c.note
}));
