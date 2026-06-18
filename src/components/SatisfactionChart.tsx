import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Award, BookOpen, Settings, Home } from "lucide-react";
import { CourseData } from "../types";

interface SatisfactionChartProps {
  courseData: CourseData;
}

export function SatisfactionChart({ courseData }: SatisfactionChartProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Determine dynamic averages based on active CourseData
  // 1. Instructors overall average
  const totalInstructorsAvg = courseData.instructors.reduce((acc, ins) => acc + ins.overallAverage, 0) / courseData.instructors.length;
  
  // 2. Content average (Q1, Q2, Q3)
  const q1 = courseData.stats.find(q => q.qId === "Q1")?.average || 4.6;
  const q2 = courseData.stats.find(q => q.qId === "Q2")?.average || 4.7;
  const q3 = courseData.stats.find(q => q.qId === "Q3")?.average || 4.8;
  const contentAvg = (q1 + q2 + q3) / 3;

  // 3. Operations average (Q5, Q6)
  const q5 = courseData.stats.find(q => q.qId === "Q5")?.average || 4.4;
  const q6 = courseData.stats.find(q => q.qId === "Q6")?.average || 4.7;
  const operationsAvg = (q5 + q6) / 2;

  // 4. Facilities average (Q4)
  const facilitiesAvg = courseData.stats.find(q => q.qId === "Q4")?.average || 4.8;

  const categories = [
    {
      id: "instructor",
      label: "강사",
      score: totalInstructorsAvg,
      max: 5,
      strokeColor: "#4f46e5",
      icon: <Award className="w-4 h-4 text-indigo-600" />,
      desc: "지식 수준, 질의응답 대응력, 강사의 열정 및 열성적인 교구재 활용도",
      items: courseData.instructors.map(ins => ({
        name: ins.name,
        score: ins.overallAverage
      }))
    },
    {
      id: "content",
      label: "교육 내용",
      score: contentAvg,
      max: 5,
      strokeColor: "#059669",
      icon: <BookOpen className="w-4 h-4 text-emerald-600" />,
      desc: "교과 구성 및 부합성, 난이도 조절, 실무 현업 유용성 및 카테고리 실용성",
      items: [
        { name: "목적 부합도", score: q1 },
        { name: "교육 구성", score: q2 },
        { name: "내용 난이도", score: q3 },
      ]
    },
    {
      id: "operations",
      label: "교육 운영",
      score: operationsAvg,
      max: 5,
      strokeColor: "#f59e0b",
      icon: <Settings className="w-4 h-4 text-amber-500" />,
      desc: "수업 시간 배정의 적절성, 리드타임 관리와 원활한 행정 절차",
      items: [
        { name: "강의 시간 배분", score: q5 },
        { name: "교육 운영 만족", score: q6 },
      ]
    },
    {
      id: "facilities",
      label: "시설 및 환경",
      score: facilitiesAvg,
      max: 5,
      strokeColor: "#f43f5e",
      icon: <Home className="w-4 h-4 text-rose-500" />,
      desc: "강의 강의실 환경 청결함, 소음 및 환기, 멀티미디어 기자재 설비",
      items: [
        { name: "교육장 환경 및 위생", score: facilitiesAvg },
      ]
    }
  ];

  // Tailored recommendation message
  const getSummaryMessage = () => {
    if (courseData.courseName.includes("전시")) {
      return (
        <p className="text-[11px] text-slate-500 leading-normal mt-1 pl-6">
          이형주 대표님(<span className="font-bold text-indigo-600">4.83</span>) 등 강사진 전문 호응도는 극대화되었으나, 노후 기자재 불만으로 인한 <span className="font-medium text-rose-500">강의실 환경 만정도(4.0)</span> 개선 및 대기업 수강생을 위한 <span className="font-medium text-amber-500">네트워킹 실습 공간/시간 버퍼</span> 수반 보완책 설계가 요구되는 상태입니다.
        </p>
      );
    }
    return (
      <p className="text-[11px] text-slate-500 leading-normal mt-1 pl-6">
        <span className="font-medium text-rose-500">시설(4.8)</span>과 <span className="font-medium text-indigo-600">강사 전문성(4.78)</span> 항목이 최상위를 달성했으나, 상대적으로 수강생 시간 조절 애로로 인해 <span className="font-medium text-amber-500">교육별 강의 시간 배분(4.4)</span>에 대한 고도화 조정이 요구됩니다.
      </p>
    );
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 font-sans tracking-tight">
              만족도 영역별 지표 현황
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              각 교육과정의 주요 분석 카테고리별 평점 분포 정보입니다 (5점 만점)
            </p>
          </div>
          <div className="flex space-x-1.5 bg-slate-50 border border-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex-shrink-0 cursor-pointer ${
                activeCategory === "all"
                  ? "bg-white text-slate-800 shadow-sm border border-slate-100"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              전체 보기
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex-shrink-0 cursor-pointer ${
                  activeCategory === c.id
                    ? "bg-white text-slate-800 shadow-sm border border-slate-100"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          {categories
            .filter((c) => activeCategory === "all" || activeCategory === c.id)
            .map((cat) => {
              const radius = 34;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = circumference - (cat.score / cat.max) * circumference;

              return (
                <div
                  key={cat.id}
                  className="border border-slate-100 bg-slate-50/50 hover:bg-slate-50 rounded-2xl p-5 flex items-start space-x-4 transition-all duration-300"
                >
                  <div className="relative flex-shrink-0">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        className="stroke-slate-100"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke={cat.strokeColor}
                        strokeWidth="6"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                      <span className="text-sm font-black text-slate-800 tracking-tight">
                        {cat.score.toFixed(2)}
                      </span>
                      <span className="text-[9px] text-slate-400">/ 5.0</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center space-x-1.5 font-sans">
                      {cat.icon}
                      <h4 className="font-bold text-slate-700 text-sm">{cat.label}</h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-400 line-clamp-2">
                      {cat.desc}
                    </p>

                    {/* Show mini sub-breakdowns */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {cat.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="inline-flex items-center space-x-1 px-2 py-0.5 bg-white border border-slate-100 rounded-md"
                        >
                          <span className="text-[9px] font-medium text-slate-500 truncate max-w-[120px]">{it.name}</span>
                          <span className="text-[9px] font-bold text-slate-705">{it.score.toFixed(1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Progress guide footer */}
      <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-xl mt-4">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
          <span className="text-xs font-semibold text-slate-700">모니터링 평가 요약:</span>
        </div>
        {getSummaryMessage()}
      </div>
    </div>
  );
}
