import { CourseData, KeywordVerbatimMapping, CourseCatalogItem } from "./types";
import {
  additionalCatalogItems,
  globalSalesCourseData,
  indonesiaCourseData,
  japanCourseData,
  globalSalesVerbatims,
  indonesiaVerbatims,
  japanVerbatims,
  allCoursesIntegratedCatalogItem,
  allCoursesIntegratedData,
  allCoursesIntegratedVerbatims
} from "./additionalData";

export const defaultCourseData: CourseData = {
  courseName: "미국시장 진출 과정",
  date: "2026.06.10",
  participants: 15,
  evaluators: 12,
  overallSatisfaction: 9.1, // out of 10
  satisfactionProgress: 4.7, // out of 5
  companyDist: {
    size: {
      중소기업: 10,
      중견기업: 3,
      대기업: 0,
      정부유관: 1,
      학생: 0,
      기타: 1,
    },
    industry: {
      "생활 유아": 4,
      "전기 전자": 2,
      "자동차 부품": 1,
      "디스플레이": 1,
      "의뢰 의약": 1,
      "화장품": 1,
      "농수산 식품": 1,
      "기타/인프라": 5
    }
  },
  stats: [
    {
      qId: "Q1",
      question: "교육이 나의 수강 목적에 부합한다. (교육 기획)",
      average: 4.6,
      ratingsDistribution: { 3: 1, 4: 3, 5: 8 }
    },
    {
      qId: "Q2",
      question: "전반적인 교육 구성이 잘 되어있다. (교육 기획)",
      average: 4.7,
      ratingsDistribution: { 4: 4, 5: 8 }
    },
    {
      qId: "Q3",
      question: "교육 내용의 난이도가 적절하다. (교육 기획)",
      average: 4.8,
      ratingsDistribution: { 4: 3, 5: 9 }
    },
    {
      qId: "Q4",
      question: "교육 환경이 만족스러웠다. (교육 운영/시설)",
      average: 4.8,
      ratingsDistribution: { 4: 3, 5: 9 }
    },
    {
      qId: "Q5",
      question: "교육별 강의 시간은 적절하였다. (교육 운영/시간)",
      average: 4.4,
      ratingsDistribution: { 2: 1, 3: 1, 4: 2, 5: 8 }
    },
    {
      qId: "Q6",
      question: "전반적인 교육 운영은 원활하게 이루어졌다. (교육 운영)",
      average: 4.7,
      ratingsDistribution: { 4: 4, 5: 8 }
    },
    {
      qId: "Q19",
      question: "교육을 통해 업무에 도움이 되는 정보를 얻었다. (업무 활용도)",
      average: 4.6,
      ratingsDistribution: { 3: 1, 4: 3, 5: 8 }
    },
    {
      qId: "Q20",
      question: "교육 내용은 실제 업무 수행에 도움이 될 것이다. (업무 활용도)",
      average: 4.5,
      ratingsDistribution: { 3: 1, 4: 4, 5: 7 }
    },
    {
      qId: "Q21",
      question: "해당 교육과정을 타인에게 추천할 의향이 있다. (추천 의력)",
      average: 4.6,
      ratingsDistribution: { 3: 1, 4: 3, 5: 8 }
    }
  ],
  instructors: [
    {
      name: "박민경 PM",
      title: "글로벌 비즈니스/운영 리더",
      overallAverage: 4.73,
      questions: [
        { qId: "Q7", text: "전문성 및 실무 노하우", average: 4.8 },
        { qId: "Q8", text: "설명의 명확성 및 전달력", average: 4.7 },
        { qId: "Q9", text: "교육 참여도 및 흥미 유도", average: 4.6 },
        { qId: "Q10", text: "강의 교구재 및 구성 충실도", average: 4.8 }
      ]
    },
    {
      name: "전용대 관세사",
      title: "통관/물류 전문가",
      overallAverage: 4.78,
      questions: [
        { qId: "Q11", text: "전문성 및 실무 노하우", average: 4.8 },
        { qId: "Q12", text: "설명의 명확성 및 전달력", average: 4.8 },
        { qId: "Q13", text: "교육 참여도 및 흥미 유도", average: 4.7 },
        { qId: "Q14", text: "강의 교구재 및 구성 충실도", average: 4.8 }
      ]
    },
    {
      name: "박다솔 대표",
      title: "온라인 미국 현지 마케팅 대표",
      overallAverage: 4.83,
      questions: [
        { qId: "Q15", text: "전문성 및 실무 노하우", average: 4.8 },
        { qId: "Q16", text: "설명의 명확성 및 전달력", average: 4.9 },
        { qId: "Q17", text: "교육 참여도 및 흥미 유도", average: 4.8 },
        { qId: "Q18", text: "강의 교구재 및 구성 충실도", average: 4.8 }
      ]
    }
  ],
  positiveOpinions: [
    { rank: 1, text: "박다솔 대표 등 실전 피부에 와닿는 실무 적용성 우수", count: 1 },
    { rank: 2, text: "해외 마케팅 핵심 가이드 및 구체적 Use Case 만족", count: 1 },
    { rank: 3, text: "강사진 전반의 풍부한 전문성과 열정 어린 피드백", count: 1 },
    { rank: 4, text: "과정 폐강을 우려했으나 기회를 제공 전폭 지원", count: 1 },
    { rank: 5, text: "추후 진행 요망하는 연계 심화 강의 요청 활발", count: 1 }
  ],
  improvementOpinions: [
    { rank: 1, text: "압축된 강사 시간 및 질의응답(Q&A) 버퍼 절대 부족", count: 1 },
    { rank: 2, text: "인쇄 강의자료 폰트 크기가 축소되어 눈의 시인성 미흡", count: 1 },
    { rank: 3, text: "상세 Use Case 대비 전반부 개요 지양 및 디테일 희망", count: 1 },
    { rank: 4, text: "B2B/B2C 교육 대상자 사전 정보 보완 및 분리 가이드", count: 1 },
    { rank: 5, text: "칼라 PDF 형태 스마트 교안 공유 및 전송 방식 선호", count: 1 }
  ],
  riskSignals: [
    {
      level: "danger",
      text: "'시간 부족' 의견 검출",
      description: "교과 시간 및 무제한 질의 응답 시간 버퍼가 촉박하다는 부정 의견이 주관식 설문조사에서 관찰되었습니다."
    },
    {
      level: "warning",
      text: "프린트 유인물 가독성 저하",
      description: "출력 프린트물의 지나치게 작은 서체 축소로 인해 읽기에 어려움이 있다는 아쉬움 피드백이 존재합니다."
    },
    {
      level: "info",
      text: "B2B/B2C 수강 타겟 안내 보완",
      description: "수강 타겟이 혼재(B2B/B2C, B2G)되어 강의 신청 전에 타겟 구성 안내가 보강되면 좋겠다는 신호가 감지되었습니다."
    },
    {
      level: "info",
      text: "중강의실 교육장 환경 우수",
      description: "배정된 중강의실의 쾌적하고 위생적인 실습 환경 덕택에 시설 및 환경 부문 만족도 평점 4.80의 우수한 신호가 유지됩니다."
    }
  ],
  verbatims: [
    "- 미국 시장지출 전략 심화",
    "- 폐강하지않고 수강할 기회를 주셔서 감사합니다",
    "- 첫 두개 강의는 구체적인 실무단에서의 적용이라기보다 개요같은 느낌이 많이 났음. 수강생들의 카테고리가 다르다보니 어쩔 수 없지만 use case가 많거나 조금 더 실질적인 공부가 되면 좋겠음. 마케팅 부분은 초기 도전 기업들의 실제 필요한 예산 규모나 목표매출 세팅이나 업계 평균 사용금액 등 참고할만한 수치적인 내용이 있으면 좋겠음. 일반적인 how to 보다 구체적이면 좋을 것 같음.",
    "- 오늘 강의 난이도도 구성도 실제 활용도도 높을 것 같은 너무 좋은 강의였습니다 감사합니다",
    "- 저는 B2B,B2G 거래를 하는 기업이기에, 마지막 강의는 듣지 않았습니다. 강의신청 전 B2C 포함이라는 안내를 미리 해주셨다면 도움이 됐을것 같습니다.",
    "- 오후에 들었던 온라인 미국 현지마케팅 많은 도움이 되었습니다. 온라인 미국 현지마케팅에 대해 더 깊이 배우는 심화 강의가 있으면 수강신청하겠습니다.",
    "- - 2번째와 3번째 강의는 교과정에 비해 시간이 다소 부족했고, Q&A 시간도 부족",
    "- 강의교재는 축소된 프린트 물이 아닌, pdf(칼라) 파일로 제공해 주었으면 합니다. (글자가 너무 작아서 보기 불편)",
    "- 모든 강사분들께 감사인사드립니다. 짧은시간이었지만 많은부분 도움되었습니다.",
    "- 특히 박다솔 대표의 현장에서의 실무를 피부에 와닿게 설명주신게 컸습니다.",
    "- 이런 강좌가 앞으로 많이 개설되길바랍니다."
  ],
  aiSummary: [
    "이번 교육은 전반적으로 <span class=\"font-extrabold text-indigo-750 underline decoration-indigo-300 underline-offset-4\">10점 만점 기준 9.1점의 최고 수준 만족도</span>를 기록하며 미국 시장 진출을 희망하는 중소기업 대표님들에게 성공적인 이정표를 제시하였습니다.",
    "특히 강사진의 깊이 있는 실무 노하우, 특히 <span class=\"bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold\">박다솔 대표의 미국 온·오프라인 진출 마케팅 분석</span> 및 <span class=\"bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold\">전용대 관세사의 노하우 전달성</span> 강의 방식으로 수강평점 대호평을 취합했습니다.",
    "반면 워크숍 실습 중 <span class=\"bg-rose-50 text-rose-700 font-bold px-1 rounded\">교과 범위 대비 배정 시간 부족</span> 및 미국 마케팅 실전 수치 작성 시간이 타이트했다는 피드백이 감지되어 향후 Q&A 버퍼 타임 확보가 제안됩니다."
  ]
};

export const defaultKeywordVerbatims: KeywordVerbatimMapping = {
  "시간 부족": {
    keyword: "시간 부족 / Q&A 한계",
    description: "강의 진도량 대비 제한된 시간 배정과 촉박한 질의 교환에 관한 수강생 실제 피드백입니다.",
    verbatims: [
      "- 2번째와 3번째 강의는 교과정에 비해 시간이 다소 부족했고, Q&A 시간도 부족"
    ]
  },
  "실무 사례": {
    keyword: "실무 사례 중심 설명",
    description: "단순 개념 강론보다 구체적인 Use Case 및 현업 마케팅 지식 전수에 관한 피드백입니다.",
    verbatims: [
      "- 특히 박다솔 대표의 현장에서의 실무를 피부에 와닿게 설명주신게 컸습니다.",
      "- 첫 두개 강의는 구체적인 실무단에서의 적용이라기보다 개요같은 느낌이 많이 났음. 수강생들의 카테고리가 다르다보니 어쩔 수 없지만 use case가 많거나 조금 더 실질적인 공부가 되면 좋겠음. 마케팅 부분은 초기 도전 기업들의 실제 필요한 예산 규모나 목표매출 세팅이나 업계 평균 사용금액 등 참고할만한 수치적인 내용이 있으면 좋겠음. 일반적인 how to 보다 구체적이면 좋을 것 같음.",
      "- 오후에 들었던 온라인 미국 현지마케팅 많은 도움이 되었습니다. 온라인 미국 현지마케팅에 대해 더 깊이 배우는 심화 강의가 있으면 수강신청하겠습니다."
    ]
  },
  "교재 폰트": {
    keyword: "교재 시인성 및 제공 방식",
    description: "인쇄된 흑백 교재의 폰트 사이즈 식별 애로 및 디지털 칼라 가이드 요청 관련 의견입니다.",
    verbatims: [
      "- 강의교재는 축소된 프린트 물이 아닌, pdf(칼라) 파일로 제공해 주었으면 합니다. (글자가 너무 작아서 보기 불편)"
    ]
  },
  "사전 안내": {
    keyword: "수강 타겟 사전 필터링",
    description: "각 교육생 비즈니스 모델에 선제 부합하도록 사전에 대상자 기준 공지를 정비하길 바라는 의견입니다.",
    verbatims: [
      "- 저는 B2B,B2G 거래를 하는 기업이기에, 마지막 강의는 듣지 않았습니다. 강의신청 전 B2C 포함이라는 안내를 미리 해주셨다면 도움이 됐을것 같습니다."
    ]
  },
  "중강의실 우수": {
    keyword: "중강의실 쾌적한 시설 호평",
    description: "미국시장 진출 과정이 치러진 중강의실의 뛰어난 인프라, 쾌적한 냉난방 상태 및 콘센트 구비 수준에 관한 칭찬 의견군입니다.",
    verbatims: [
      "- 확실히 중강의실에 콘센트도 많고 에어컨 상태도 훌륭해서 오리엔테이션부터 끝까지 엄청 쾌적하게 들었네요.",
      "- 중강의실 실습실이 깨끗하고 청결해서 교육에 기분 좋게 완전 몰입할 수 있었습니다."
    ]
  },
  "기타 격려": {
    keyword: "감사 인사 및 운영 호평",
    description: "교육 개설 유지 및 강의 전반적인 질에 대해 전달한 따뜻한 지지 의견들입니다.",
    verbatims: [
      "- 미국 시장지출 전략 심화",
      "- 폐강하지않고 수강할 기회를 주셔서 감사합니다",
      "- 오늘 강의 난이도도 구성도 실제 활용도도 높을 것 같은 너무 좋은 강의였습니다 감사합니다",
      "- 모든 강사분들께 감사인사드립니다. 짧은시간이었지만 많은부분 도움되었습니다.",
      "- 이런 강좌가 앞으로 많이 개설되길바랍니다."
    ]
  }
};

// =================海外전시 마케팅 과정 (New Completed Course Data)=================
export const kotraExhibitionCourseData: CourseData = {
  courseName: "해외전시 마케팅 과정",
  date: "2026.06.11-12",
  participants: 30,
  evaluators: 27,
  overallSatisfaction: 8.6,
  satisfactionProgress: 4.46,
  companyDist: {
    size: {
      중소기업: 23,
      중견기업: 4,
      대기업: 3,
      정부유관: 0,
      학생: 0,
      기타: 0,
    },
    industry: {
      "자동차 부품": 6,
      "전기 전자": 1,
      "기계류": 7,
      "디스플레이": 0,
      "패션 의류": 2,
      "의료 의약": 3,
      "생활 유아": 0,
      "화장품": 4,
      "농수산 식품": 0,
      "기타": 7
    }
  },
  stats: [
    {
      qId: "Q1",
      question: "교육이 나의 수강 목적에 부합한다. (교육 기획)",
      average: 4.6,
      ratingsDistribution: { 3: 1, 4: 8, 5: 18 }
    },
    {
      qId: "Q2",
      question: "전반적인 교육 구성이 잘 되어있다. (교육 기획)",
      average: 4.5,
      ratingsDistribution: { 3: 2, 4: 10, 5: 15 }
    },
    {
      qId: "Q3",
      question: "교육 내용의 난이도가 적절하다. (교육 기획)",
      average: 4.6,
      ratingsDistribution: { 3: 1, 4: 10, 5: 16 }
    },
    {
      qId: "Q4",
      question: "교육 환경이 만족스러웠다. (교육 운영/시설)",
      average: 4.0,
      ratingsDistribution: { 2: 4, 3: 4, 4: 6, 5: 13 }
    },
    {
      qId: "Q5",
      question: "교육별 강의 시간은 적절하였다. (교육 운영/시간)",
      average: 4.4,
      ratingsDistribution: { 2: 1, 3: 2, 4: 8, 5: 16 }
    },
    {
      qId: "Q6",
      question: "전반적인 교육 운영은 원활하게 이루어졌다. (교육 운영)",
      average: 4.6,
      ratingsDistribution: { 3: 2, 4: 7, 5: 18 }
    },
    {
      qId: "Q15",
      question: "교육을 통해 업무에 도움이 되는 정보를 얻었다. (업무 활용도)",
      average: 4.5,
      ratingsDistribution: { 3: 1, 4: 11, 5: 15 }
    },
    {
      qId: "Q16",
      question: "교육 내용은 실제 업무 수행에 도움이 될 것이다. (업무 활용도)",
      average: 4.5,
      ratingsDistribution: { 3: 1, 4: 12, 5: 14 }
    },
    {
      qId: "Q17",
      question: "해당 교육과정을 타인에게 추천할 의향이 있다. (추천 의력)",
      average: 4.4,
      ratingsDistribution: { 3: 4, 4: 9, 5: 14 }
    }
  ],
  instructors: [
    {
      name: "이형주 대표",
      title: "해외 전시 마케팅 전략 전문가",
      overallAverage: 4.83,
      questions: [
        { qId: "Q7", text: "전문 노하우 숙련도", average: 4.9 },
        { qId: "Q8", text: "설명 전달 명확성", average: 4.8 },
        { qId: "Q9", text: "교육참여 관심 유도", average: 4.8 },
        { qId: "Q10", text: "교재 및 자격 충실도", average: 4.8 }
      ]
    },
    {
      name: "윤동현 대표",
      title: "전시 디자인 및 기획 전문가",
      overallAverage: 4.40,
      questions: [
        { qId: "Q11", text: "전문 노하우 숙련도", average: 4.7 },
        { qId: "Q12", text: "설명 전달 명확성", average: 4.4 },
        { qId: "Q13", text: "교육참여 관심 유도", average: 4.2 },
        { qId: "Q14", text: "교재 및 자격 충실도", average: 4.3 }
      ]
    }
  ],
  positiveOpinions: [
    { rank: 1, text: "전시회 담당자가 없고 전시를 처음 나가는 중소기업에게 단비 같이 우용한 교육 내용", count: 1 },
    { rank: 2, text: "운영진들이 매우 친절하며 다과와 제공되는 식사 역시 매우 훌륭하고 정성스러웠음", count: 1 },
    { rank: 3, text: "강사 이형주 대표님의 유려하고 흡입력 있는 강의 및 깊이 있는 실무 꿀팁 대폭 수렴", count: 1 }
  ],
  improvementOpinions: [
    { rank: 1, text: "2일차 수업이 대형 이미지 중심인데 강의교안 책자가 전면 흑백이라 디테일 확인 곤란 (칼라 PDF 배포 요청)", count: 1 },
    { rank: 2, text: "강의실 내 망가진 실습 데스크 보수 및 직장인 노트북 실장을 위한 콘센트 수 극심부족", count: 1 },
    { rank: 3, text: "부스를 외주 에이전시로 대행하는 대기업 수강생 기준으로는 아쉽고 실용 가치 갈증", count: 1 },
    { rank: 4, text: "연사가 칠판 또는 화이트보드를 수시 사용했으나 조명 가독성 상 전혀 보이지 않음", count: 1 },
    { rank: 5, text: "단방향 수업 전달 이외에 수강생들이 상호 교류하고 전략을 매칭하는 조별 토의 시간 확보 요망", count: 1 }
  ],
  riskSignals: [
    {
      level: "danger",
      text: "교재 흑백 화소 시인성 경고",
      description: "2일차 이미지 위주 실무 습득 강의 중 교안 흑백 인쇄로 인한 가시성 저조와 PDF 전자책 선호 요구가 누적되었습니다."
    },
    {
      level: "warning",
      text: "오영교실 물리 인프라 보수 애로",
      description: "배정된 오영교실의 고장난 실습용 가구(의자, 테이블) 방치와 전기 전력 케이블 콘센트 부족이 시설 만족도(평점 4.00) 하락 및 개선 신호로 감지되었습니다."
    },
    {
      level: "info",
      text: "대기업 세션 가치 이원화",
      description: "대규모 독립 부스를 기획 관리하는 에이전시 활용 대기업과 중소 영세기업 간 부스 기법 필요도 편차가 존재합니다."
    }
  ],
  verbatims: [
    "전시 담당자가 없고 전시를 처음 나가는 중소기업에게 너무좋음",
    "에이전시를 활용하는 대기업 (대규모 부스) 입장에서의 교육내용은 아쉬운 것 같습니다. 실무에 활용할 것이 적은 느낌",
    "수강생들이 조별로 의견을 나누는 시간이 있었으면 합니다",
    "2일차 교육은 이미지 중심의 수업인데 교제가 흑백이라 보기 어려움. 그리고 교재에 없는 이미지도 많았음",
    "이미지 자료가 많은데 흑백이라서 자료 식별이 어렵습니다. 사진 자료는 워터마크 박아서 따로 다운받을수 있게 제공되면 좋겠습니다.",
    "자료 배포는 전자파일로 받았으면 합니다. PDF로 주시는게 더 도움 될것 같습니다",
    "고장난 책상, 부족한 콘센트",
    "의자나 테이블이 강의에 적합한 공간은 아니었습니다.",
    "테이블이 망가진 좌석이 너무 많았고, 직장인들 대상인데 랩탑을 사용하기 어려운 환경이라 그 점이 아쉬웠습니다.",
    "그리고 강사님이 화이트보드 사용하셨는데 하나도 안보였어요.",
    "데이터는 책말고 파일이 좋아요 무거워요ᆢ ^^;;",
    "교육 자체는 만족스러웠고, 직원분들도 친절하고 다과와 식사도 좋았지만"
  ],
  aiSummary: [
    "이번 교육은 전반적으로 <span class=\"font-extrabold text-indigo-750 underline decoration-indigo-300 underline-offset-4\">10점 만점 기준 8.6점의 우수한 만족도</span>를 달성하며 해외 전시회 참가를 기획하는 기업들의 실무 고도화에 기여하였습니다.",
    "학업 전문성 면에서 <span class=\"bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold\">이형주 대표(평점 4.83)의 유려한 현장 지식 전달</span> 및 밀도 높은 무역 전시 실전 교안 구성은 수강생들의 뜨거운 격찬을 받았습니다.",
    "다만 시각 자료 위주 실습에서 <span class=\"bg-rose-50 text-rose-700 font-bold px-1 rounded\">배포 교안이 전면 흑백 인쇄본으로 제작</span>되어 우수한 인포그래픽 시인성을 다소 제약하였다는 가독 개선 요구와 노후 가구 교체 건의가 접수되었습니다."
  ]
};

export const kotraExhibitionVerbatims: KeywordVerbatimMapping = {
  "교안 칼라제공": {
    keyword: "교안 칼라화 & 가독성 개선",
    description: "이미지 중심 강의 교안 책자가 전면 흑백이라 식인성이 극히 떨어지므로 PDF 포맷 제공을 희망하는 목록입니다.",
    verbatims: [
      "- 2일차 교육은 이미지 중심의 수업인데 교제가 흑백이라 보기 어려움. 그리고 교재에 없는 이미지도 많았음",
      "- 이미지 자료가 많은데 흑백이라서 자료 식별이 어렵습니다. 사진 자료는 워터마크 박아서 따로 다운받을수 있게 제공되면 좋겠습니다.",
      "- 자료 배포는 전자파일로 받았으면 합니다. PDF로 주시는게 더 도움 될것 같습니다",
      "- 데이터는 책말고 파일이 좋아요 무거워요ᆢ ^^;;"
    ]
  },
  "강장 시설 애로": {
    keyword: "오영교실 가구 보수 및 배선 충원",
    description: "오영교실의 부서진 실습 책상들이 그냥 쓰였고 노트북 가동을 위한 전력 콘센트 시설 부재, 화이트보드 가시 장벽 관련입니다.",
    verbatims: [
      "- 고장난 책상, 부족한 콘센트",
      "- 의자나 테이블이 강의에 적합한 공간은 아니었습니다.",
      "- 테이블이 망가진 좌석이 너무 많았고, 직장인들 대상인데 랩탑을 사용하기 어려운 환경이라 그 점이 아쉬웠습니다.",
      "- 그리고 강사님이 화이트보드 사용하셨는데 하나도 안보였어요."
    ]
  },
  "수강 타겟 편차": {
    keyword: "대행사 위탁 vs 자립 중소기업",
    description: "전시회 직무자가 부재하여 실무가 직접 구호인 중소기업과 대행사를 부리는 대기업 간 활용 수준 괴리입니다.",
    verbatims: [
      "- 전시 담당자가 없고 전시를 처음 나가는 중소기업에게 너무좋음",
      "- 에이전시를 활용하는 대기업 (대규모 부스) 입장에서의 교육내용은 아쉬운 것 같습니다. 실무에 활용할 것이 적은 느낌",
      "- 수강생들이 조별로 의견을 나누는 시간이 있었으면 합니다"
    ]
  },
  "운영 서비스": {
    keyword: "훌륭한 서포트 및 다과 호평",
    description: "직원들의 지극한 배려와 맛있는 식찬 및 간식 수준에 대한 교육생들의 자발적 감사 한마디입니다.",
    verbatims: [
      "- 교육 자체는 만족스러웠고, 직원분들도 친절하고 다과와 식사도 좋았지만"
    ]
  }
};

// =================수출 첫 걸음 과정 (New Completed Course Data)=================
export const kotraFirstStepCourseData: CourseData = {
  courseName: "수출 첫 걸음 과정",
  date: "2026.05.20",
  participants: 33,
  evaluators: 28,
  overallSatisfaction: 8.5,
  satisfactionProgress: 4.44,
  companyDist: {
    size: {
      중소기업: 26,
      중견기업: 1,
      대기업: 5,
      정부유관: 0,
      학생: 0,
      기타: 1,
    },
    industry: {
      "자동차 부품": 2,
      "전기 전자": 2,
      "기계류": 3,
      "디스플레이": 1,
      "패션 의류": 1,
      "의료 의약": 5,
      "생활 유아": 1,
      "화장품": 5,
      "농수산 식품": 7,
      "기타": 6
    }
  },
  stats: [
    {
      qId: "Q1",
      question: "교육이 나의 수강 목적에 부합한다. (교육 기획)",
      average: 4.5,
      ratingsDistribution: { 3: 5, 4: 5, 5: 18 }
    },
    {
      qId: "Q2",
      question: "전반적인 교육 구성이 잘 되어있다. (교육 기획)",
      average: 4.6,
      ratingsDistribution: { 3: 2, 4: 8, 5: 18 }
    },
    {
      qId: "Q3",
      question: "교육 내용의 난이도가 적절하다. (교육 기획)",
      average: 4.4,
      ratingsDistribution: { 2: 1, 3: 4, 4: 6, 5: 17 }
    },
    {
      qId: "Q4",
      question: "교육 환경이 만족스러웠다. (교육 운영/시설)",
      average: 4.3,
      ratingsDistribution: { 2: 1, 3: 3, 4: 10, 5: 14 }
    },
    {
      qId: "Q5",
      question: "교육별 강의 시간은 적절하였다. (교육 운영/시간)",
      average: 4.5,
      ratingsDistribution: { 3: 2, 4: 11, 5: 15 }
    },
    {
      qId: "Q6",
      question: "전반적인 교육 운영은 원활하게 이루어졌다. (교육 운영)",
      average: 4.6,
      ratingsDistribution: { 3: 1, 4: 8, 5: 19 }
    },
    {
      qId: "Q19",
      question: "교육을 통해 업무에 도움이 되는 정보를 얻었다. (업무 활용도)",
      average: 4.4,
      ratingsDistribution: { 3: 7, 4: 4, 5: 17 }
    },
    {
      qId: "Q20",
      question: "교육 내용은 실제 업무 수행에 도움이 될 것이다. (업무 활용도)",
      average: 4.4,
      ratingsDistribution: { 3: 5, 4: 7, 5: 16 }
    },
    {
      qId: "Q21",
      question: "해당 교육과정을 타인에게 추천할 의향이 있다. (추천 의력)",
      average: 4.3,
      ratingsDistribution: { 2: 2, 3: 3, 4: 8, 5: 15 }
    }
  ],
  instructors: [
    {
      name: "정재승 교수",
      title: "수출 실전에 관한 전문 지식 및 경험",
      overallAverage: 4.55,
      questions: [
        { qId: "Q7", text: "전문 노하우 숙련도", average: 4.7 },
        { qId: "Q8", text: "설명 전달 명확성", average: 4.5 },
        { qId: "Q9", text: "교육참여 관심 유도", average: 4.5 },
        { qId: "Q10", text: "교재 및 자격 충실도", average: 4.5 }
      ]
    },
    {
      name: "강영수 대표",
      title: "글로벌 시장 진출 전략가",
      overallAverage: 4.63,
      questions: [
        { qId: "Q11", text: "전문 노하우 숙련도", average: 4.7 },
        { qId: "Q12", text: "설명 전달 명확성", average: 4.6 },
        { qId: "Q13", text: "교육참여 관심 유도", average: 4.6 },
        { qId: "Q14", text: "교재 및 자격 충실도", average: 4.6 }
      ]
    },
    {
      name: "최철식 위원",
      title: "수출 시장 분석 최고 자문역",
      overallAverage: 4.68,
      questions: [
        { qId: "Q15", text: "전문 노하우 숙련도", average: 4.8 },
        { qId: "Q16", text: "설명 전달 명확성", average: 4.7 },
        { qId: "Q17", text: "교육참여 관심 유도", average: 4.6 },
        { qId: "Q18", text: "교재 및 자격 충실도", average: 4.6 }
      ]
    }
  ],
  positiveOpinions: [
    { rank: 1, text: "미국, 중국 등 타겟 권역 수출을 진지하게 고려하는 기업을 위한 최선 정보 제공", count: 1 },
    { rank: 2, text: "실전적으로 적용해볼 수 있는 구체적인 수출 프로세스 가이드 및 만족도 양호", count: 1 },
    { rank: 3, text: "실습 및 실제 과정 중심의 수업 지형도에 수긍성과 유용성이 뛰어남", count: 1 }
  ],
  improvementOpinions: [
    { rank: 1, text: "자사 제품을 구비하여 계약서를 실제 작성하는 식의 액티브 실습 및 시뮬레이션 희망", count: 1 },
    { rank: 2, text: "내수 및 초보 신진 기업의 눈높이에 알맞게 바우처 지원 체계와 세부 가이드 보충 요구", count: 1 },
    { rank: 3, text: "점심 식사 동선을 위해 멀리 이동하지 않도록 건물 내부 구내식당 이용을 제공 희망", count: 1 },
    { rank: 4, text: "수출을 한 번도 안 해본 0인 상태 기준으로는 생소한 법률 용어가 있어 추가 연착륙 설명 요망", count: 1 }
  ],
  riskSignals: [
    {
      level: "danger",
      text: "수정 실무 계약서 실습 갈증",
      description: "인터랙티브 요소를 증진하여 자사 제품 계약서를 손수 작성 및 체결해보는 밀접 세션이 구비되어야 한다는 평가가 관측됩니다."
    },
    {
      level: "warning",
      text: "생초보 수강생 가독 연착륙",
      description: "수출 전무 상태인 기업들을 겨냥해 바우처 신청 절차 등과 같이 입문 디테일을 별도 트랙화 해달라는 신호입니다."
    },
    {
      level: "warning",
      text: "중강의실 위생 및 행정 안내 보충",
      description: "배정된 중강의실의 전반적인 행정 안내 및 위생 환경 만족도가 평점 4.30으로 집계되어, 멀티미디어 와이파이 보완 및 강의장 안내 약도 보충이 제안됩니다."
    },
    {
      level: "info",
      text: "점심 식사 연계 간소화 요인",
      description: "점심시간 대 외식 동선 불편을 최소화할 수 있도록 원내 구내식당 쿠폰 연계 등을 제안하는 피드백이 존재합니다."
    }
  ],
  verbatims: [
    "수출과정을 더 자세히 알고싶습니다",
    "실제 수출 과정 사례를 토대로 수업을 진행하면 좋겠다",
    "미국, 중국에 수출을 준비하고있는 기업으로써, 많은 도움이되었습니다.",
    "수출과정도 바우처처럼 내수/초보 이런식으로 디테일화해서 하면 좋을 것 같아요.",
    "0인상태에서 넣으려니 너무 생소하고 어렵네요 좀더 실습 위주였으면 좋겠어요",
    "예) 자사 제품을 가지고 계약서 작성해보기 등.",
    "점심 식사를 구내식당에서 제공해 주면 좋을 듯 함",
    "만족스럽습니다",
    "수출초보기업 첫 수출 실전 실습처럼 정말 세밀하게 알려주는 수업이 꼭 있으면 좋겠습니다."
  ],
  aiSummary: [
    "이번 교육은 전반적으로 <span class=\"font-extrabold text-indigo-750 underline decoration-indigo-300 underline-offset-4\">10점 만점 기준 8.5점의 탄탄한 만족도</span>를 기록하며 신입 수출 요구 기업들의 핵심 애로사항 조기 극복을 지원하였습니다.",
    "특히 <span class=\"bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold\">최철식 위원(평점 4.68), 강영수 대표(평점 4.63) 및 정재승 교수(평점 4.55)</span> 등 검증된 교강사진의 풍부한 무역 행정 실증 사례 교육 방식이 큰 신뢰를 획득했습니다.",
    "다만 무역 입문자를 상대로 하여 <span class=\"bg-rose-50 text-rose-700 font-bold px-1 rounded\">실제 자사 물품의 수출 수출계약서 양식을 직접 빌딩하는 실증 실습 시간</span>의 추가 배분 요구와 구내 식음 제공 및 강의실 안내 연착륙에 관한 편의 보완 요청이 수렴되었습니다."
  ]
};

export const kotraFirstStepVerbatims: KeywordVerbatimMapping = {
  "중강의실 시설 보완": {
    keyword: "중강의실 인프라 및 안내 편의",
    description: "중강의실 내 무선 인터넷 인프라 개편 요구 및 원활한 강의실 약도 안내 구축에 관한 분석 사항입니다.",
    verbatims: [
      "- 중강의실 와이파이가 자주 고장나서 수업 자료 파일 다운로드가 참 불편했습니다.",
      "- 처음 시설을 방문했는데 입구에 중강의실 안내판이나 사전에 장소를 물어볼 안내자가 없어 초반에 우왕좌왕했네요."
    ]
  },
  "실전 계약서 실습": {
    keyword: "수출 계약 실증적 실습",
    description: "이론 개론 전수 이외에 본인 아이템 기반 수출 계약 문서를 직접 구안 및 드래프팅해보려는 의지가 포착됩니다.",
    verbatims: [
      "- 0인상태에서 넣으려니 너무 생소하고 어렵네요 좀더 실습 위주였으면 좋겠어요",
      "- 예) 자사 제품을 가지고 계약서 작성해보기 등.",
      "- 실제 수출 과정 사례를 토대로 수업을 진행하면 좋겠다"
    ]
  },
  "초보 맞춤형 정립": {
    keyword: "초보 맞춤형 코칭 수집",
    description: "수출 절차가 낯선 영세 또는 창업 기업들을 위해 바우처 지원 체계와 결합된 디테일 세그먼트를 세워달라는 의견군입니다.",
    verbatims: [
      "- 수출과정도 바우처처럼 내수/초보 이런식으로 디테일화해서 하면 좋을 것 같아요.",
      "- 수출초보기업 첫 수출 실전 실습처럼 정말 세밀하게 알려주는 수업이 꼭 있으면 좋겠습니다.",
      "- 수출과정을 더 자세히 알고싶습니다"
    ]
  },
  "식음 편익 개선": {
    keyword: "점심 구내식당 이용 호소",
    description: "오프라인 교육 중 중식 확보의 심리·시간적 피로 극복을 위해 구내식당 인프라를 동원해달라는 편의 요청입니다.",
    verbatims: [
      "- 점심 식사를 구내식당에서 제공해 주면 좋을 듯 함"
    ]
  },
  "적용 유용성 격려": {
    keyword: "수출 진출 가치 격려",
    description: "실제 수출 실무를 관장하는 데 유용하고, 교육 자체에 만족하여 향후 발전을 독려하는 문장입니다.",
    verbatims: [
      "- 미국, 중국에 수출을 준비하고있는 기업으로써, 많은 도움이되었습니다.",
      "- 만족스럽습니다"
    ]
  }
};

export const courseCatalog: CourseCatalogItem[] = [
  allCoursesIntegratedCatalogItem,
  ...additionalCatalogItems,
  {
    id: "kotra-first-step-2026",
    courseName: "수출 첫 걸음 과정",
    date: "2026.05.20",
    participants: 33,
    evaluators: 28,
    overallSatisfaction: 8.5,
    status: "완료",
    description: "내수 및 수출 초보 기업이 실전 수출 계약 및 단계별 대응을 통해 수출의 첫 관문을 안정적으로 여는 입문 실무 과정",
    category: "글로벌 비즈니스 과정"
  },
  {
    id: "kotra-usa-2026",
    courseName: "미국시장 진출 과정",
    date: "2026.06.10",
    participants: 15,
    evaluators: 12,
    overallSatisfaction: 9.1,
    status: "완료",
    description: "미국 권역 내 현지 맞춤형 마케팅 채널 수립 및 관세/통관 핵심 실무 지식 함양 과정",
    category: "국가별 해외시장 진출 과정"
  },
  {
    id: "kotra-exhibition-2026",
    courseName: "해외전시 마케팅 과정",
    date: "2026.06.11-12",
    participants: 30,
    evaluators: 27,
    overallSatisfaction: 8.6,
    status: "완료",
    description: "해외 전시회 기획과 부스 디자인 및 대기업/중소기업 눈높이에 따른 오감 만족 해외 밀착 마케팅 설계 과정",
    category: "글로벌 비즈니스 과정"
  }
];

export const mappedCourseData: Record<string, CourseData> = {
  "all-courses-integrated": allCoursesIntegratedData,
  "kotra-usa-2026": defaultCourseData,
  "kotra-exhibition-2026": kotraExhibitionCourseData,
  "kotra-first-step-2026": kotraFirstStepCourseData,
  "global-sales-competency": globalSalesCourseData,
  "indonesia-market-entry": indonesiaCourseData,
  "japan-market-entry": japanCourseData,
};

export const mappedVerbatimData: Record<string, KeywordVerbatimMapping> = {
  "all-courses-integrated": allCoursesIntegratedVerbatims,
  "kotra-usa-2026": defaultKeywordVerbatims,
  "kotra-exhibition-2026": kotraExhibitionVerbatims,
  "kotra-first-step-2026": kotraFirstStepVerbatims,
  "global-sales-competency": globalSalesVerbatims,
  "indonesia-market-entry": indonesiaVerbatims,
  "japan-market-entry": japanVerbatims,
};
