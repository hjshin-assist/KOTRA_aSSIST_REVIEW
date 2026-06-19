export interface CompanyDistribution {
  size: {
    중소기업: number;
    중견기업: number;
    대기업: number;
    정부유관: number;
    학생: number;
    기타: number;
  };
  industry: {
    [key: string]: number;
  };
}

export interface QuestionStat {
  qId: string;
  question: string;
  average: number;
  ratingsDistribution: {
    [score: number]: number;
  };
}

export interface InstructorStat {
  name: string;
  title: string;
  questions: {
    qId: string;
    text: string;
    average: number;
  }[];
  overallAverage: number;
}

export interface TopOpinion {
  rank: number;
  text: string;
  count: number;
}

export interface RiskSignal {
  level: "danger" | "warning" | "info";
  text: string;
  description?: string;
}

export interface CourseData {
  courseName: string;
  date: string;
  participants: number;
  evaluators: number;
  overallSatisfaction: number; // For 10 point scale (out of 10)
  satisfactionProgress: number; // out of 5
  companyDist: CompanyDistribution;
  stats: QuestionStat[];
  instructors: InstructorStat[];
  positiveOpinions: TopOpinion[];
  improvementOpinions: TopOpinion[];
  riskSignals: RiskSignal[];
  verbatims: string[];
  aiSummary?: string[];
}

export interface KeywordVerbatimMapping {
  [keyword: string]: {
    keyword: string;
    verbatims: string[];
    description: string;
  };
}

export interface CourseCatalogItem {
  id: string;
  courseName: string;
  date: string;
  participants: number;
  evaluators: number;
  overallSatisfaction: number;
  status: "완료" | "진행중" | "대기";
  description: string;
  category: string;
}
