import { useState } from "react";
import { motion } from "motion/react";
import { Award, Star, User, GraduationCap, CheckCircle2 } from "lucide-react";
import { InstructorStat } from "../types";

interface InstructorComparisonProps {
  instructors: InstructorStat[];
}

export function InstructorComparison({ instructors }: InstructorComparisonProps) {
  const [selectedInstructor, setSelectedInstructor] = useState<string>(instructors[2]?.name || "");

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">강사별 만족도 상세 비교</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            본 교육 과정에 투입된 강사진들의 주요 강의 설문 세부 점수(1~5점)입니다.
          </p>
        </div>
        <div className="flex space-x-1">
          {instructors.map((ins) => (
            <button
              key={ins.name}
              onClick={() => setSelectedInstructor(ins.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedInstructor === ins.name
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              {ins.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-side or detailed active selector display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Instructor Quick Profile Card */}
        <div className="lg:col-span-5 space-y-4">
          {instructors.map((ins) => {
            if (ins.name !== selectedInstructor) return null;
            return (
              <motion.div
                key={ins.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute right-3 top-3 opacity-10">
                  <GraduationCap className="w-24 h-24 text-slate-900" />
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-white">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-800">{ins.name}</h4>
                    <p className="text-xs text-slate-400 font-medium font-sans">{ins.title}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-1 bg-white border border-slate-100 rounded-xl p-4">
                  <span className="text-[10px] text-slate-400 uppercase font-sans tracking-wide">강사 종합 평점</span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-black text-slate-800">{ins.overallAverage.toFixed(2)}</span>
                    <span className="text-xs text-slate-400">/ 5.0 만점</span>
                  </div>
                  <div className="flex text-amber-400 space-x-0.5 pt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(ins.overallAverage) ? "fill-current" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Side: Visual Criteria Metrics comparison block */}
        <div className="lg:col-span-7 space-y-5">
          {instructors.map((ins) => {
            if (ins.name !== selectedInstructor) return null;
            return (
              <motion.div
                key={ins.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-4"
              >
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                  설문 문항별 상세지표 점수
                </h4>

                <div className="space-y-3.5">
                  {ins.questions.map((q) => {
                    const pct = (q.average / 5) * 100;
                    return (
                      <div key={q.qId} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs font-semibold">
                          <span className="text-slate-600 pl-1">{q.text}</span>
                          <span className="text-slate-800 font-bold font-mono">{q.average.toFixed(1)} / 5.0</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute left-0 top-0 bottom-0 bg-slate-800 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-start space-x-2 text-slate-500">
                    <Award className="w-4 h-4 text-slate-800 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[11px] leading-relaxed text-slate-400">
                        {ins.name} 강사는 <span className="font-bold text-slate-700">전문성 부문(4.8)</span>에서 최고 수준의 찬사를 받았으며, 유창하고 매끄러운 진행 방식이 주관식 원문에서도 반복 확인되었습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
