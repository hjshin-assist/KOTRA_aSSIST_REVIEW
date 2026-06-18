import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { 
  defaultCourseData, 
  defaultKeywordVerbatims, 
  courseCatalog, 
  CourseCatalogItem,
  mappedCourseData,
  mappedVerbatimData
} from "./data";
import { MetricCard } from "./components/MetricCard";
import { SatisfactionChart } from "./components/SatisfactionChart";
import { InstructorComparison } from "./components/InstructorComparison";
import { RiskSignalPanel } from "./components/RiskSignalPanel";
import { OpinionTopSection } from "./components/OpinionTopSection";
import { VerbatimViewer } from "./components/VerbatimViewer";
import { CourseData, KeywordVerbatimMapping } from "./types";
import { 
  Building, 
  Users, 
  Percent, 
  Clock, 
  CheckCircle2, 
  RefreshCw,
  FileText,
  ChevronRight,
  GraduationCap,
  TrendingUp,
  BarChart3,
  ArrowLeft,
  AlertCircle,
  Download,
  FileImage
} from "lucide-react";

export default function App() {
  // Course Selector states
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  // Alert banner for upcoming inactive courses
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Robust export state
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [isExportingPng, setIsExportingPng] = useState<boolean>(false);
  const [exportPngSuccess, setExportPngSuccess] = useState<boolean>(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Dynamic dataset selection based on chosen portal course
  const currentData: CourseData = selectedCourseId && mappedCourseData[selectedCourseId] 
    ? mappedCourseData[selectedCourseId] 
    : defaultCourseData;
    
  const currentVerbatimMapping: KeywordVerbatimMapping = selectedCourseId && mappedVerbatimData[selectedCourseId]
    ? mappedVerbatimData[selectedCourseId]
    : defaultKeywordVerbatims;

  // Handler for real sleek export action using html2canvas & jsPDF
  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    setExportError(null);
    
    // Save scroll position
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    try {
      // Find the dashboard element
      const element = document.getElementById("course-dashboard-content");
      if (!element) {
        setIsExporting(false);
        setExportError("대시보드 콘텐츠를 찾을 수 없습니다.");
        return;
      }

      // Smoothly scroll to top to ensure complete layout capture without cut-offs
      window.scrollTo(0, 0);
      
      // Brief delay to allow Recharts animations/layout to settle
      await new Promise((resolve) => setTimeout(resolve, 350));

      const canvas = await html2canvas(element, {
        scale: 1.5, // 1.5 is extremely stable, fast, and high quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#f8fafc", // matches bg-slate-50
      });

      // Restore scroll position
      window.scrollTo(scrollX, scrollY);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 size width in mm
      const pageHeight = 295; // A4 size height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pageHeight;

      // Handle multi-page generation if height exceeds single A4 page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
        heightLeft -= pageHeight;
      }

      const safeName = currentData.courseName.replace(/\s+/g, "_");
      pdf.save(`EduInsight_${safeName}_만족도_분석_보고서.pdf`);

      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error: any) {
      console.error("PDF generation failed:", error);
      // Fallback: restore scroll position and reset state
      window.scrollTo(scrollX, scrollY);
      setIsExporting(false);
      setExportError(`PDF 다운로드 도중 브라우저가 처리를 거부했거나 제한했습니다. (에러: ${error?.message || error}). 아래 '이미지(PNG) 파일로 저장' 버튼을 이용해주시면 100% 안전하게 저장됩니다!`);
    }
  };

  // Handler for high-quality PNG image download (bypass frame-blocking issues)
  const handleDownloadPNG = async () => {
    setIsExportingPng(true);
    setExportPngSuccess(false);
    setExportError(null);
    
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    try {
      const element = document.getElementById("course-dashboard-content");
      if (!element) {
        setIsExportingPng(false);
        setExportError("대시보드 콘텐츠를 찾을 수 없습니다.");
        return;
      }

      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 350));

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#f8fafc",
      });

      window.scrollTo(scrollX, scrollY);

      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const safeName = currentData.courseName.replace(/\s+/g, "_");
      link.download = `EduInsight_${safeName}_만족도_분석_보고서.png`;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExportingPng(false);
      setExportPngSuccess(true);
      setTimeout(() => setExportPngSuccess(false), 3000);
    } catch (error: any) {
      console.error("PNG generation failed:", error);
      window.scrollTo(scrollX, scrollY);
      setIsExportingPng(false);
      setExportError(`이미지 다운로드 도중 오류가 발생했습니다: ${error?.message || error}`);
    }
  };

  const handleSelectCourse = (course: CourseCatalogItem) => {
    if (course.status === "완료") {
      setSelectedCourseId(course.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setAlertMessage(`"${course.courseName}" 과정은 현재 설문지 수렴 및 대기 상태입니다. 수강생들의 실제 피드백 로우데이터가 확보되면 결과 분석 보고 대시보드가 실시간 활성화됩니다.`);
      setTimeout(() => setAlertMessage(null), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased selection:bg-slate-900 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <AnimatePresence mode="wait">
          {selectedCourseId === null ? (
            
            /* LANDING VIEW: Dynamic Course Selector Portal & Overview */
            <motion.div
              key="landing-portal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              {/* Sleek Institution Portal Header */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_2px_12px_rgba(0,0,0,0.01)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                <div className="flex items-center gap-4">
                  <div className="bg-indigo-600 p-3 rounded-2xl flex-shrink-0 text-white shadow-md shadow-indigo-600/10">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                      <span>EduInsight 인텔리전스</span>
                      <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-2 py-0.5 rounded-md">PORTAL</span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-1 font-medium">aSSIST (서울과학종합대학원) & KOTRA 교육 품질 성과 고도화 파트너십 플랫폼</p>
                  </div>
                </div>

                {/* Overall Stack Overview Stats Widget */}
                <div className="flex gap-6 border-t border-slate-100 pt-4 md:pt-0 md:border-0 w-full md:w-auto">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">총 관리 과정</p>
                    <p className="text-lg font-black text-slate-800">3개</p>
                  </div>
                  <div className="w-px bg-slate-200"></div>
                  <div className="text-left md:text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">분석 완료 수강생</p>
                    <p className="text-lg font-black text-emerald-600">12명</p>
                  </div>
                  <div className="w-px bg-slate-200"></div>
                  <div className="text-left md:text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">평균 종합 만족지수</p>
                    <p className="text-lg font-black text-indigo-600">⭐️ 9.1 / 10</p>
                  </div>
                </div>
              </div>

              {/* Alert Notification for Inactive Course Choice */}
              {alertMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-amber-50 border border-amber-200 text-amber-900 px-5 py-3.5 rounded-xl flex items-start space-x-3 text-xs font-semibold"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>{alertMessage}</span>
                </motion.div>
              )}

              {/* Course Catalog Selection Grid */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center space-x-1.5">
                    <BarChart3 className="w-4 h-4 text-slate-600" />
                    <span>만족도 분석 대상 교육과정 목록</span>
                  </h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">분석을 진행하고자 하는 특정 과정을 선택하여 원문 분석 마이크로 대시보드 구조에 진입하십시오.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {courseCatalog.map((course) => {
                    const isCompleted = course.status === "완료";
                    return (
                      <div
                        key={course.id}
                        onClick={() => handleSelectCourse(course)}
                        className={`group bg-white border border-slate-200/80 rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between ${
                          isCompleted
                            ? "cursor-pointer hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1"
                            : "opacity-75 cursor-not-allowed hover:bg-slate-100/50"
                        }`}
                      >
                        <div className="space-y-4">
                          {/* Top row categories and Status badge */}
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-md bg-slate-100 uppercase tracking-wide">
                              {course.category}
                            </span>
                            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                              isCompleted
                                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                                : "bg-slate-100 border border-slate-200 text-slate-500"
                            }`}>
                              {course.status}
                            </span>
                          </div>

                          {/* Course Name */}
                          <div>
                            <h3 className={`text-sm font-black tracking-tight leading-snug group-hover:text-indigo-600 transition-colors ${
                              isCompleted ? "text-slate-900" : "text-slate-400"
                            }`}>
                              {course.courseName}
                            </h3>
                            <p className="text-[11px] leading-relaxed text-slate-500 mt-2 font-normal">
                              {course.description}
                            </p>
                          </div>
                        </div>

                        {/* Footer details row */}
                        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                          <div className="space-y-0.5 text-left">
                            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block">교육 일정</span>
                            <span className="font-semibold text-slate-700">{course.date}</span>
                          </div>
                          
                          {isCompleted ? (
                            <div className="text-right space-y-0.5 bg-indigo-50/50 border border-indigo-100/30 p-1.5 px-3 rounded-xl">
                              <span className="text-[9px] text-indigo-600 uppercase font-black tracking-wider block">분석지수</span>
                              <span className="font-black text-indigo-700">⭐️ 9.1</span>
                            </div>
                          ) : (
                            <div className="text-right flex items-center space-x-1 text-slate-400 font-bold text-[10px]">
                              <span>설문 진행전</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        {/* Subtle interactive accent line for active catalog item */}
                        {isCompleted && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Portal Info Footer notice */}
              <div className="bg-slate-100/50 border border-slate-200/40 rounded-2xl p-5.5 flex items-start space-x-3 max-w-2xl">
                <FileText className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">EduInsight 성과 연동 안내</span>
                  <p className="text-xs leading-relaxed text-slate-600 font-medium">
                    해당 인텔리전스는 수강 학업 성실도 및 전문 평가 설문지 속 주관식 원심을 즉각 분석하여 품질 위협 신호를 추출합니다. 향후 새로운 교육 세션이 추가될 경우, 본 포털 홈 화면에 자동으로 로드되어 체계적인 교육 질 관리가 연속적으로 가능합니다.
                  </p>
                </div>
              </div>
            </motion.div>

          ) : (
            
            /* INTERATIVE VIEW: Course Dashboard Analytics View */
            <motion.div
              key="course-dashboard"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              {/* Back to Portal Catalog screen navbar button */}
              <div className="flex items-center">
                <button
                  onClick={() => setSelectedCourseId(null)}
                  className="flex items-center space-x-1.5 text-xs text-slate-500 font-bold hover:text-indigo-600 transition-colors border border-slate-200 bg-white p-2 px-3.5 rounded-xl shadow-xs cursor-pointer active:scale-98"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>과정 선택 포털 홈으로</span>
                </button>
              </div>

              {/* PDF Capture Target Container */}
              <div id="course-dashboard-content" className="space-y-8 bg-slate-50 p-4 rounded-3xl pb-10">
                {/* Top Navigation & Sleek Header */}
              <header className="bg-white border border-slate-200/80 rounded-2xl px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 p-2 rounded-lg flex-shrink-0 text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5 flex-wrap">
                      <span>EduInsight AI</span>
                      <span className="text-slate-300 font-normal">| Satisfaction Dashboard</span>
                    </h1>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">aSSIST-KOTRA Academic Analyzer</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-5 w-full md:w-auto md:justify-end">
                  <div className="text-left md:text-right min-w-[124px]">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">분석 대상 과정</p>
                    <p className="text-xs font-black text-indigo-600 truncate max-w-[180px]" title={currentData.courseName}>
                      {currentData.courseName}
                    </p>
                  </div>
                  
                  <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                  
                  <div className="flex gap-5">
                    <div className="text-center">
                      <p className="text-[9px] text-slate-400 font-bold uppercase">평가인원</p>
                      <p className="text-xs font-black text-slate-800">{currentData.evaluators} / {currentData.participants}명</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-slate-400 font-bold uppercase">응답률</p>
                      <p className="text-xs font-black text-emerald-600">
                        {((currentData.evaluators / currentData.participants) * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-slate-400 font-bold uppercase">평균 만족도</p>
                      <p className="text-xs font-black text-indigo-600">
                        {currentData.overallSatisfaction.toFixed(1)} / 10
                      </p>
                    </div>
                  </div>
                </div>
              </header>

              {/* Top KPI Box Row */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="교육 과정명"
                  value={currentData.courseName}
                  subTitle={`강의 일자: ${currentData.date}`}
                  icon={<Building className="w-4.5 h-4.5" />}
                  delay={0.05}
                />
                <MetricCard
                  title="총 응답 평가자"
                  value={`${currentData.evaluators} 명 / ${currentData.participants} 명`}
                  subTitle={`참여 총원 대비 실제 평가 비율`}
                  trend="response rate"
                  icon={<Users className="w-4.5 h-4.5" />}
                  delay={0.10}
                />
                <MetricCard
                  title="평가 응답률"
                  value={`${((currentData.evaluators / currentData.participants) * 100).toFixed(0)} %`}
                  subTitle="설문 참여 성실도 분석"
                  icon={<Percent className="w-4.5 h-4.5" />}
                  delay={0.15}
                />
                <MetricCard
                  title="평균 만족도 지수"
                  value={`⭐️ ${currentData.overallSatisfaction.toFixed(1)} / 10`}
                  subTitle={`5점 만점 기준 환산시 약 ${(currentData.satisfactionProgress).toFixed(2)}점`}
                  icon={<Clock className="w-4.5 h-4.5 text-amber-500" />}
                  delay={0.20}
                />
              </section>

              {/* Sleek Gradient AI 핵심 요약 (AI 3-Line Core Summarizer) */}
              <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-50/10 border border-indigo-100 rounded-2xl p-6.5 shadow-sm">
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                    <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-wider font-sans">
                      AI 데이터 핵심 요약 보고
                    </h2>
                  </div>

                   {/* AI 3-Line Bullet summaries with Sleek underlines & highlights */}
                  <div className="space-y-3.5 max-w-4xl pt-1">
                    {currentData.courseName.includes("전시") ? (
                      <>
                        <div className="flex items-start gap-3">
                          <span className="text-xs text-indigo-600 mt-0.5">•</span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            이번 교육은 전반적으로 <span className="font-extrabold text-indigo-750 underline decoration-indigo-300 underline-offset-4">10점 만점 기준 8.6점의 우수한 만족도</span>를 달성했으나, 노후 하드웨어 강의실 내부 환경과 관련된 개선 신호가 선연히 검출되었습니다.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-xs text-indigo-600 mt-0.5">•</span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            학업 전문성 면에서 <span className="bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold">이형주 대표(평점 4.83)의 유려한 현장 지식 전달</span>은 격찬을 받았으나, 이미지 위주 실습에서 <span className="underline decoration-indigo-300">교안이 전면 흑백 인쇄본으로 배부</span>되어 시인 장막을 유발하는 병목이 감지되었습니다.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-xs text-rose-500 mt-0.5">•</span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            특히 전시회 도맡는 <span className="bg-rose-50 text-rose-700 font-bold px-1 rounded">중소기업 기준 만족도(극상)와 전문 기획 대기업(아쉬움) 간 편차</span>가 대조적이므로, 수준별 조별 네트워킹 시간을 보강하여 교류를 장려하라는 AI 오피니언을 도출했습니다.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-start gap-3">
                          <span className="text-xs text-indigo-600 mt-0.5">•</span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            이번 교육은 전반적으로 <span className="font-extrabold text-indigo-750 underline decoration-indigo-300 underline-offset-4">매우 높은 만족도 (10점 만점 기준 9.1점)</span>를 기록하며 긍정 평가가 지배적이었습니다.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-xs text-indigo-600 mt-0.5">•</span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            특히 세부 강사진의 풍부한 실무 경험, <span className="bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold">박다솔 대표의 미국 진출 마케팅 분석</span> 및 <span className="bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold">전용대 관세사의 노하우 전달성</span> 등 실전 중심 강의 방식에 대해 아주 높은 수강생 호응을 수렴했습니다.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-xs text-rose-500 mt-0.5">•</span>
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                            반면 일부 특정 강의에서 교과 범위 대비 <span className="bg-rose-50 text-rose-700 font-bold px-1 rounded">시간 배분이 매우 부족했다는 지적</span>과 함께 원활한 질의 처리를 위한 버퍼 확보 보완 신호를 AI가 감지했습니다.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </section>

              {/* Risk Signal Area */}
              <section className="bg-white border border-slate-100 rounded-3xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <RiskSignalPanel signals={currentData.riskSignals} />
              </section>

              {/* Category satisfaction circular chart & detailed item reviews */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12">
                  <SatisfactionChart courseData={currentData} />
                </div>
              </section>

              {/* Opinion Section TOP 5 split */}
              <section>
                <OpinionTopSection
                  positiveOpinions={currentData.positiveOpinions}
                  improvementOpinions={currentData.improvementOpinions}
                />
              </section>

              {/* Instructor Specific satisfaction Comparison matrix */}
              <section>
                <InstructorComparison instructors={currentData.instructors} />
              </section>

              {/* Verbatim Click Lookup drilldown section */}
              <section>
                <VerbatimViewer verbatimMapping={currentVerbatimMapping} />
              </section>
              </div>

              {/* Robust Export Actions Area (PDF & PNG Image) */}
              <section className="max-w-xl mx-auto pt-6 space-y-4">
                {exportError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-amber-50 border border-amber-200/60 rounded-xl flex items-start gap-2.5 text-xs text-amber-800 shadow-sm"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {exportError}
                    </p>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* PDF Download Button */}
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isExporting || isExportingPng}
                    className={`py-3 px-5 font-bold text-xs text-white rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 border cursor-pointer active:scale-98 ${
                      isExporting
                        ? "bg-indigo-500/80 border-indigo-400 cursor-wait"
                        : exportSuccess
                          ? "bg-emerald-600 border-emerald-500 hover:bg-emerald-500"
                          : "bg-indigo-600 border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 shadow-indigo-250/20"
                    }`}
                  >
                    {isExporting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>PDF 생성 중...</span>
                      </>
                    ) : exportSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                        <span>PDF 다운로드 완료!</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 text-indigo-200" />
                        <span>보고서 다운로드 (PDF)</span>
                      </>
                    )}
                  </button>

                  {/* PNG Image Download Button */}
                  <button
                    onClick={handleDownloadPNG}
                    disabled={isExporting || isExportingPng}
                    className={`py-3 px-5 font-bold text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer active:scale-98 ${
                      isExportingPng
                        ? "bg-slate-100 opacity-80 cursor-wait"
                        : exportPngSuccess
                          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                          : ""
                    }`}
                  >
                    {isExportingPng ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-500" />
                        <span>PNG 이미지 생성 중...</span>
                      </>
                    ) : exportPngSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>PNG 저장 완료!</span>
                      </>
                    ) : (
                      <>
                        <FileImage className="w-4 h-4 text-slate-400" />
                        <span>전체 화면 캡처 저장 (PNG)</span>
                      </>
                    )}
                  </button>
                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <footer className="max-w-7xl mx-auto mt-20 text-center border-t border-slate-100 pt-8 text-xs text-slate-400">
        <p>© 2026 aSSIST-KOTRA Academy satisfaction Intelligence Platform. Developed by Google AI Studio.</p>
      </footer>
    </div>
  );
}
