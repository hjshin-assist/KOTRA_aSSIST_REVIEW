import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Quote, Search, HelpCircle } from "lucide-react";
import { KeywordVerbatimMapping } from "../types";

interface VerbatimViewerProps {
  verbatimMapping: KeywordVerbatimMapping;
}

export function VerbatimViewer({ verbatimMapping }: VerbatimViewerProps) {
  const keywords = Object.keys(verbatimMapping);
  const [selectedKeyword, setSelectedKeyword] = useState<string>("시간 부족");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const activeMapping = verbatimMapping[selectedKeyword];

  // Optional: local filter search across all verbatims in active key
  const filteredVerbatims = activeMapping?.verbatims.filter((v) =>
    v.toLowerCase().includes(searchFilter.toLowerCase())
  ) || [];

  return (
    <div className="bg-slate-900 border border-slate-950 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-slate-950/20">
      
      {/* Decorative ambient quote background graphic */}
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-white pointer-events-none">
        <Quote className="w-56 h-56" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-base font-extrabold text-white tracking-tight flex items-center space-x-2">
            <span className="bg-slate-705 border border-slate-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider text-slate-300">KEYWORD</span>
            <span>수강생 답변 원문 드릴다운: "{selectedKeyword}"</span>
          </h3>
          <p className="text-[11px] text-slate-400 mt-1">
            수강생들이 주관식 설문으로 직접 제출한 로우 데이터 원문과 해당 피드백을 확인합니다.
          </p>
        </div>

        {/* Search Input Filter for Verbatims */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="답변 원문 실시간 필터링..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700/60 pl-10 pr-4 py-2 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-slate-850 text-slate-100 placeholder:text-slate-500 transition-all duration-300"
          />
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* Interactive Keyword tags */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-5">
        {keywords.map((kw) => {
          const isActive = selectedKeyword === kw;
          return (
            <button
              key={kw}
              onClick={() => {
                setSelectedKeyword(kw);
                setSearchFilter("");
              }}
              className={`p-2 py-1.5 px-3.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10 border border-indigo-500"
                  : "bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              <span>{verbatimMapping[kw]?.keyword || kw}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse ml-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Description space */}
      {activeMapping && (
        <div className="relative z-10 bg-slate-800/60 border border-slate-700/40 p-3.5 px-5 rounded-xl mb-6 flex items-start space-x-3">
          <HelpCircle className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">학습 분석가 코멘트</span>
            <p className="text-[11px] leading-relaxed text-slate-300">{activeMapping.description}</p>
          </div>
        </div>
      )}

      {/* Verbatim quotes display with slide-up motion */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredVerbatims.length > 0 ? (
            filteredVerbatims.map((verb, idx) => (
              <motion.div
                key={`${selectedKeyword}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-4.5 hover:border-slate-500 transition-all duration-300 relative group overflow-hidden"
              >
                <p className="text-xs italic text-slate-200 leading-relaxed font-normal tracking-wide pl-2 border-l-2 border-slate-700 group-hover:border-indigo-500 transition-colors">
                  "{verb}"
                </p>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-1 md:col-span-2 py-10 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-800 rounded-2xl"
            >
              <Search className="w-6 h-6 opacity-40 mb-2 text-slate-600" />
              <p className="text-xs font-semibold">조건에 부합하는 수강생 답변 원문이 부족합니다.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Descriptive Footer section */}
      <div className="mt-5 pt-4 border-t border-slate-800 text-right">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          실제 설문지 주관식 답변 원문에 기반한 분류 데이터
        </span>
      </div>
    </div>
  );
}
