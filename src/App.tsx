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
  FileImage,
  X,
  ExternalLink
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

  // Export Modal Preview elements
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<"pdf" | "png" | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

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
      
      // Clean up previous blob URL to avoid leaks
      if (pdfBlobUrl) {
        URL.revokeObjectURL(pdfBlobUrl);
      }

      // Extremely robust manual Blob anchor download trigger
      const pdfBlob = pdf.output("blob");
      const blobUrl = URL.createObjectURL(pdfBlob);
      setPdfBlobUrl(blobUrl);

      const pdfDownloadLink = document.createElement("a");
      pdfDownloadLink.href = blobUrl;
      pdfDownloadLink.download = `EduInsight_${safeName}_만족도_분석_보고서.pdf`;
      document.body.appendChild(pdfDownloadLink);
      pdfDownloadLink.click();
      document.body.removeChild(pdfDownloadLink);

      // Open fail-safe Preview window for iframe environments
      setPreviewImg(imgData);
      setPreviewMode("pdf");
      setShowPreviewModal(true);

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

      // Open fail-safe Preview window for iframe environments
      setPreviewImg(imgData);
      setPreviewMode("png");
      setShowPreviewModal(true);

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

              {/* Robust Export Actions Area (PNG Image) */}
              <section className="max-w-md mx-auto pt-6 space-y-4">
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

                <div className="flex justify-center">
                  {/* PNG Image Download Button */}
                  <button
                    onClick={handleDownloadPNG}
                    disabled={isExportingPng}
                    className={`w-full py-4 px-6 font-bold text-xs text-white rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 border cursor-pointer active:scale-98 ${
                      isExportingPng
                        ? "bg-indigo-500/80 border-indigo-400 cursor-wait shadow-indigo-200/30"
                        : exportPngSuccess
                          ? "bg-emerald-600 border-emerald-500 hover:bg-emerald-500 shadow-emerald-100"
                          : "bg-indigo-600 border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 shadow-indigo-200/50"
                    }`}
                  >
                    {isExportingPng ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>보고서 이미지(PNG) 파일용 렌더링 중...</span>
                      </>
                    ) : exportPngSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                        <span>보고서 이미지 저장 완료!</span>
                      </>
                    ) : (
                      <>
                        <FileImage className="w-4 h-4 text-indigo-200" />
                        <span>전체 분석 보고서 저장하기 (고화질 이미지)</span>
                      </>
                    )}
                  </button>
                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Fail-safe Preview Guidance Modal */}
        <AnimatePresence>
          {showPreviewModal && previewImg && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPreviewModal(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm shadow-2xl"
              />

              {/* Modal Body */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col z-10 max-h-[85vh]"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center space-x-2">
                    <div className="bg-emerald-500 p-1.5 rounded-lg text-white">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-800">
                        {previewMode === "pdf" ? "PDF 분석 보고서 생성 최적화 완료" : "다운로드 이미지 변환 완료"}
                      </h3>
                      <p className="text-[10px] text-slate-500">Iframe 호환용 안전 다운로드 환경 안내</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="p-1.5 hover:bg-slate-200/60 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-5">
                  {/* Instructions Callout */}
                  <div className="p-4 bg-indigo-50 border border-indigo-100/85 rounded-xl space-y-3">
                    <h4 className="font-bold text-xs text-indigo-900 flex items-center gap-1.5">
                      <AlertCircle className="w-4.5 h-4.5 text-indigo-600 flex-shrink-0" />
                      중요: 브라우저 보안 및 프레임 제한 안내
                    </h4>
                    <p className="text-xs text-indigo-950 leading-relaxed font-normal">
                      현재 회원님이 보고 계신 곳은 <strong>AI Studio 개발자 미리보기용 창(iframe)</strong>입니다. 
                      크롬 및 에지 브라우저의 전용 보안 규칙 상, iframe 보호막 내부에서는 프로그램적 전송 호출(자동 다운로드)이 차단되므로 UI가 "다운로드 완료"로 실행되어도 파일 저장이 차단될 수 있습니다. 
                      상황에 맞춰 <strong>아래의 2가지 초간단 수동 및 정식 저장 방식</strong>을 활용해 저장해 보세요!
                    </p>
                    
                    <div className="space-y-3 mt-2.5 pt-2.5 border-t border-indigo-100/60">
                      {/* Way 1 */}
                      <div className="text-xs text-indigo-950 flex items-start gap-2.5">
                        <span className="bg-indigo-200/80 text-indigo-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">방법 1</span>
                        <p className="leading-relaxed">
                          <strong>마우스 오른쪽 클릭으로 저장 (가장 빠름)</strong><br />
                          하단 미리보기 박스의 이미지 영역에서 <span className="underline decoration-indigo-400 font-semibold text-indigo-900">마우스 우클릭 -&gt; [이미지를 다른 이름으로 저장...]</span>을 클릭하시면 최고의 초고화질 캡처본이 단 1초 만에 로컬 드라이브에 저장됩니다!
                        </p>
                      </div>
                      
                      {/* Way 2 */}
                      <div className="text-xs text-indigo-950 flex items-start gap-2.5">
                        <span className="bg-indigo-200/80 text-indigo-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">방법 2</span>
                        <p className="leading-relaxed">
                          <strong>새 탭(원래 웹 브라우저)에서 열어서 자동 다운로드 받기</strong><br />
                          아래 <span className="font-semibold text-indigo-900">[새 창에서 앱 실행하기]</span> 버튼을 클릭하여 완전한 새 브라우저 창에서 대시보드를 열어주세요. 
                          그곳은 iframe 제한이 없는 일반 주소이기 때문에 보고서 다운로드 클릭 시 즉시 PDF 및 PNG 파일이 드라이브에 자동으로 받아집니다!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions in Modal */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-1 font-sans">
                    <a
                      href={window.location.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md shadow-indigo-150 active:scale-98"
                    >
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      <span>새 창(탭)에서 앱 실행하기</span>
                    </a>
                    
                    {previewMode === "pdf" && pdfBlobUrl ? (
                      <button
                        onClick={() => {
                          const link = document.createElement("a");
                          link.download = `EduInsight_${currentData.courseName.replace(/\s+/g, "_")}_만족도_분석_보고서.pdf`;
                          link.href = pdfBlobUrl;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer active:scale-98"
                      >
                        <Download className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                        <span>PDF 수동 저장 (100% 안전방식)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const link = document.createElement("a");
                          link.download = `EduInsight_${currentData.courseName.replace(/\s+/g, "_")}_만족도_분석_보고서.png`;
                          link.href = previewImg;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all border border-slate-200 cursor-pointer active:scale-98"
                      >
                        <Download className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <span>PNG 이미지로 저장하기</span>
                      </button>
                    )}
                  </div>

                  {/* Report Capture Preview Frame */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] text-slate-500 font-semibold px-1">
                      <span>대시보드 실시간 분석 보고서 (고화질 캡처 영역 - 우클릭 가능)</span>
                      <span className="text-indigo-600">마우스 오른쪽 버튼 클릭 지원</span>
                    </div>
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-100 p-2.5 max-h-[300px] overflow-y-auto shadow-inner">
                      <img
                        src={previewImg}
                        alt="EduInsight Report Preview"
                        className="w-full h-auto rounded-lg shadow-sm border border-slate-200 select-all"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer of modal */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="py-2 px-5 bg-slate-800 hover:bg-slate-950 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    확인 후 닫기
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>

      <footer className="max-w-7xl mx-auto mt-20 text-center border-t border-slate-100 pt-8 text-xs text-slate-400">
        <p>© 2026 aSSIST-KOTRA Academy satisfaction Intelligence Platform. Developed by Google AI Studio.</p>
      </footer>
    </div>
  );
}
