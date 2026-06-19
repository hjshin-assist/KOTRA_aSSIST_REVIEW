import { CourseData, KeywordVerbatimMapping, CourseCatalogItem } from "./types";

export const additionalCatalogItems: CourseCatalogItem[] = [
  {
    id: "japan-market-entry",
    courseName: "일본 시장 진출 과정",
    date: "2026.03.11",
    participants: 33,
    evaluators: 22,
    overallSatisfaction: 7.5,
    status: "완료",
    description: "가깝고도 먼 일본 시장의 통상 매커니즘, 바이어 교섭 규범 대응 및 현지 이커머스 입점 프로세스 마스터 교육",
    category: "글로벌 비즈니스"
  },
  {
    id: "indonesia-market-entry",
    courseName: "인도네시아 시장 진출 과정",
    date: "2026.04.01",
    participants: 17,
    evaluators: 13,
    overallSatisfaction: 8.2,
    status: "완료",
    description: "아세안 거점 신흥 시장 인도네시아의 고유 비즈니스 문화, 유통 경로 및 실전 진출 전략을 연계 분석하는 과정",
    category: "글로벌 비즈니스"
  },
  {
    id: "global-sales-competency",
    courseName: "글로벌 세일즈 역량 향상 과정",
    date: "2026.04.08-09",
    participants: 25,
    evaluators: 17,
    overallSatisfaction: 8.8,
    status: "완료",
    description: "무역 실무 기본 소양 배양과 글로벌 바이어 설득 및 효율적인 세일즈 파이프라인 관리 역량을 확보하는 실무 집중 교육",
    category: "세일즈 실무"
  }
];

export const globalSalesCourseData: CourseData = {
  courseName: "글로벌 세일즈 역량 향상 과정",
  date: "2026.04.08-09",
  participants: 25,
  evaluators: 17,
  overallSatisfaction: 8.8,
  satisfactionProgress: 4.54,
  companyDist: {
    size: {
      중소기업: 17,
      중견기업: 6,
      대기업: 0,
      정부유관: 0,
      학생: 0,
      기타: 2,
    },
    industry: {
      "전기 전자": 1,
      "패션 의류": 1,
      "의료 의약": 2,
      "화장품": 7,
      "농수산 식품": 3,
      "기타/미지정": 11
    }
  },
  stats: [
    {
      qId: "Q1",
      question: "교육이 나의 수강 목적에 부합한다. (교육 기획)",
      average: 4.53,
      ratingsDistribution: { 3: 1, 4: 6, 5: 10 }
    },
    {
      qId: "Q2",
      question: "전반적인 교육 구성이 잘 되어있다. (교육 기획)",
      average: 4.53,
      ratingsDistribution: { 3: 1, 4: 6, 5: 10 }
    },
    {
      qId: "Q3",
      question: "교육 내용의 난이도가 적절하다. (교육 기획)",
      average: 4.47,
      ratingsDistribution: { 4: 9, 5: 8 }
    },
    {
      qId: "Q4",
      question: "교육 환경이 만족스러웠다. (교육 운영/시설)",
      average: 4.29,
      ratingsDistribution: { 2: 1, 3: 1, 4: 7, 5: 8 }
    },
    {
      qId: "Q5",
      question: "교육별 강의 시간은 적절하였다. (교육 운영/시간)",
      average: 4.76,
      ratingsDistribution: { 4: 4, 5: 13 }
    },
    {
      qId: "Q6",
      question: "전반적인 교육 운영은 원활하게 이루어졌다. (교육 운영)",
      average: 4.76,
      ratingsDistribution: { 4: 4, 5: 13 }
    },
    {
      qId: "Q19",
      question: "교육을 통해 업무에 도움이 되는 정보를 얻었다. (업무 활용도)",
      average: 4.53,
      ratingsDistribution: { 3: 2, 4: 4, 5: 11 }
    },
    {
      qId: "Q20",
      question: "교육 내용은 실제 업무 수행에 도움이 될 것이다. (업무 활용도)",
      average: 4.59,
      ratingsDistribution: { 3: 1, 4: 5, 5: 11 }
    },
    {
      qId: "Q21",
      question: "해당 교육과정을 타인에게 추천할 의향이 있다. (추천 의향)",
      average: 4.59,
      ratingsDistribution: { 3: 1, 4: 5, 5: 11 }
    }
  ],
  instructors: [
    {
      name: "정희준 교수",
      title: "글로벌 세일즈 실무 교수",
      overallAverage: 4.67,
      questions: [
        { qId: "Q7", text: "전문성 및 실무 노하우", average: 4.71 },
        { qId: "Q8", text: "설명의 명확성 및 전달력", average: 4.59 },
        { qId: "Q9", text: "교육 참여도 및 흥미 유도", average: 4.65 },
        { qId: "Q10", text: "강의 교구재 및 구성 충실도", average: 4.71 }
      ]
    },
    {
      name: "김동영 대표",
      title: "해외 영업/마케팅 전문가",
      overallAverage: 4.68,
      questions: [
        { qId: "Q11", text: "전문성 및 실무 노하우", average: 4.88 },
        { qId: "Q12", text: "설명의 명확성 및 전달력", average: 4.47 },
        { qId: "Q13", text: "교육 참여도 및 흥미 유도", average: 4.65 },
        { qId: "Q14", text: "강의 교구재 및 구성 충실도", average: 4.71 }
      ]
    }
  ],
  positiveOpinions: [
    { rank: 1, text: "실무적이고 매우 알찬 교육 내용 및 강의 구성 만족", count: 1 },
    { rank: 2, text: "운영 및 다과/간식 준비 과정의 고심 어린 정성 수렴", count: 1 },
    { rank: 3, text: "강사진의 전반적인 높은 실전 역량 및 열린 태도 격려", count: 1 }
  ],
  improvementOpinions: [
    { rank: 1, text: "강의실 실내 온도가 너무 낮아 추운 학습 동선 아쉬움", count: 2 },
    { rank: 2, text: "해외거래선 발굴보고 등 특정 아젠다 시간 할애 증가 희망", count: 1 },
    { rank: 3, text: "초급자 기준 너무 일반적인 기본 내용보다 심화 실무 필요", count: 1 }
  ],
  riskSignals: [
    {
      level: "warning",
      text: "오영교실 내부 환경 온도 저하",
      description: "에어컨 과동 등으로 인해 강의실 내부가 너무 춥고 쌀쌀하여 수강 집중을 해친다는 지적이 중복 건의되었습니다."
    },
    {
      level: "info",
      text: "수출 개별 리포트 수립 요구",
      description: "해외거래선 발굴보고 등 실무에 즉시 매치할 문서 중심의 실증형 단원 육성이 가이드라인으로 제시되었습니다."
    }
  ],
  verbatims: [
    "- 너무 일반적은 내용은 생략하고 실무 위주의 교육이 제게는 적합하다고 생각됩니다",
    "- 생각보다 내용이 실무적이고 알찼다",
    "- 강의목차에 해외거래선발굴보고 그거 들을려고 수강했는데, 그것만 빼고 1박2일 교육들은게 아쉬운 점입니다.",
    "- 전반적으로 다 좋았어요 감사합니다. 운영도 간식 선정도 다 고심하신 것이 느껴져 감사합니다. 다만 강의실이 너무 추웠던 것 딱 하나만 아쉽습니다.",
    "- 강의실이 너무 추웟음",
    "- AI 스킬 활용하는 해외영업 강좌 오픈 희망합니다."
  ],
  aiSummary: [
    "이번 글로벌 세일즈 특화 실전 과정은 <span class=\"font-extrabold text-indigo-750 underline decoration-indigo-300 underline-offset-4\">10점 만점 기준 8.7점의 호조 만족도</span>로 수강 기업들의 해외 가치 설득 기법의 전조와 세일즈 기반을 고도화하였습니다.",
    "특히 현장 중심 <span class=\"bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold\">김동영 대표(평점 4.88) 및 정희준 교수(평점 4.71)</span>의 바이어 교섭 기법, 세일즈 파이프라인 관리 노하우 교육이 대단히 뛰어난 실무 전수로 지목되어 지배적인 호평을 도출했습니다.",
    "반면 에어컨 바람 편차가 집중된 <span class=\"bg-rose-50 text-rose-700 font-bold px-1 rounded\">오영교실 내부의 급격한 냉방 저하(체감 추위)</span> 불편과 조별 세션 진행 시 일부 발굴 보고 양식을 직접 빌딩하는 실무 시간이 빠듯했다는 장벽이 수치 개선점으로 발굴되었습니다."
  ]
};

export const indonesiaCourseData: CourseData = {
  courseName: "인도네시아 시장 진출 과정",
  date: "2026.04.01",
  participants: 17,
  evaluators: 13,
  overallSatisfaction: 8.2,
  satisfactionProgress: 4.17,
  companyDist: {
    size: {
      중소기업: 12,
      중견기업: 4,
      대기업: 0,
      정부유관: 0,
      학생: 0,
      기타: 1,
    },
    industry: {
      "전기 전자": 3,
      "패션 의류": 2,
      "의료 의약": 1,
      "화장품": 4,
      "기타/서비스": 7
    }
  },
  stats: [
    {
      qId: "Q1",
      question: "교육이 나의 수강 목적에 부합한다. (교육 기획)",
      average: 4.2,
      ratingsDistribution: { 3: 2, 4: 6, 5: 5 }
    },
    {
      qId: "Q2",
      question: "전반적인 교육 구성이 잘 되어있다. (교육 기획)",
      average: 4.1,
      ratingsDistribution: { 3: 2, 4: 8, 5: 3 }
    },
    {
      qId: "Q3",
      question: "교육 내용의 난이도가 적절하다. (교육 기획)",
      average: 4.2,
      ratingsDistribution: { 3: 2, 4: 6, 5: 5 }
    },
    {
      qId: "Q4",
      question: "교육 환경이 만족스러웠다. (교육 운영/시설)",
      average: 3.9,
      ratingsDistribution: { 2: 1, 3: 2, 4: 7, 5: 3 }
    },
    {
      qId: "Q5",
      question: "교육별 강의 시간은 적절하였다. (교육 운영/시간)",
      average: 4.2,
      ratingsDistribution: { 3: 2, 4: 7, 5: 4 }
    },
    {
      qId: "Q6",
      question: "전반적인 교육 운영은 원활하게 이루어졌다. (교육 운영)",
      average: 4.2,
      ratingsDistribution: { 2: 1, 4: 8, 5: 4 }
    },
    {
      qId: "Q19",
      question: "교육을 통해 업무에 도움이 되는 정보를 얻었다. (업무 활용도)",
      average: 4.4,
      ratingsDistribution: { 4: 8, 5: 5 }
    },
    {
      qId: "Q20",
      question: "교육 내용은 실제 업무 수행에 도움이 될 것이다. (업무 활용도)",
      average: 4.3,
      ratingsDistribution: { 3: 1, 4: 7, 5: 5 }
    },
    {
      qId: "Q21",
      question: "해당 교육과정을 타인에게 추천할 의향이 있다. (추천 의향)",
      average: 4.2,
      ratingsDistribution: { 3: 3, 4: 5, 5: 5 }
    }
  ],
  instructors: [
    {
      name: "고형진 대표",
      title: "인도네시아 트레이딩 실무 대표",
      overallAverage: 3.9,
      questions: [
        { qId: "Q7", text: "전문성 및 실무 노하우", average: 4.3 },
        { qId: "Q8", text: "설명의 명확성 및 전달력", average: 3.8 },
        { qId: "Q9", text: "교육 참여도 및 흥미 유도", average: 3.7 },
        { qId: "Q10", text: "강의 교구재 및 구성 충실도", average: 3.8 }
      ]
    },
    {
      name: "김윤동 CMO",
      title: "아세안 유통 마케팅 책임자",
      overallAverage: 4.2,
      questions: [
        { qId: "Q11", text: "전문성 및 실무 노하우", average: 4.3 },
        { qId: "Q12", text: "설명의 명확성 및 전달력", average: 4.2 },
        { qId: "Q13", text: "교육 참여도 및 흥미 유도", average: 4.1 },
        { qId: "Q14", text: "강의 교구재 및 구성 충실도", average: 4.2 }
      ]
    },
    {
      name: "김동선 센터장",
      title: "아시아 권역 진출 지원 소장",
      overallAverage: 4.3,
      questions: [
        { qId: "Q15", text: "전문성 및 실무 노하우", average: 4.5 },
        { qId: "Q16", text: "설명의 명확성 및 전달력", average: 4.3 },
        { qId: "Q17", text: "교육 참여도 및 흥미 유도", average: 4.2 },
        { qId: "Q18", text: "강의 교구재 및 구성 충실도", average: 4.2 }
      ]
    },
    {
      name: "이건동 대표",
      title: "다자역 통상 컨설팅 대표",
      overallAverage: 4.35,
      questions: [
        { qId: "Q19", text: "전문성 및 실무 노하우", average: 4.8 },
        { qId: "Q20", text: "설명의 명확성 및 전달력", average: 4.2 },
        { qId: "Q21", text: "교육 참여도 및 흥미 유도", average: 4.2 },
        { qId: "Q22", text: "강의 교구재 및 구성 충실도", average: 4.2 }
      ]
    }
  ],
  positiveOpinions: [
    { rank: 1, text: "이건동 대표의 깊은 전문성 및 실무 통상 사례 가이드 명확", count: 1 },
    { rank: 2, text: "김동선 센터장의 아세안 권역 트렌드 및 통찰력 전개 우수", count: 1 },
    { rank: 3, text: "신흥 인도네시아 비즈니스 유통망과 실전 팁 습득 유익", count: 1 }
  ],
  improvementOpinions: [
    { rank: 1, text: "일부 수강생의 가래 기침 및 개인 통화로 인한 소음 거슬림", count: 1 },
    { rank: 2, text: "점심 샌드위치 외에 간식 퀄리티 및 종류 다각화 보강 희망", count: 1 },
    { rank: 3, text: "강의 중 무선 기기 소음 방지 오리엔테이션 선제 가동 필요", count: 1 }
  ],
  riskSignals: [
    {
      level: "warning",
      text: "강의 질 및 면학 소음 병목",
      description: "수업 도중 가래 소리, 무선 기기 전조음 발생으로 수강 몰입이 다소 저해되어 면학 에티켓 사전 공지가 요구됩니다."
    },
    {
      level: "info",
      text: "중식 식단 메뉴 다양화",
      description: "간단 샌드위치 단일 메뉴 대신, 한식이나 더 위생적이고 퀄리티 높은 식음 체계 보충 수요가 있습니다."
    }
  ],
  verbatims: [
    "- 강연중 전화를 하시거나 가래를 주기적으로 컥컥 대시는 분들이있어 좀 거슬린게 아쉬웠습니다.",
    "- 수업중 휴대폰 소음이나 노트북 소음이 너무 큽니다. 수업시작전에 수강생들에게 안내부탁드립니다.",
    "- 점심은 샌드위치보다는 조금더 나은 것이었으면 좋겠습니다. 감사합니다."
  ],
  aiSummary: [
    "이번 아세안 신흥 거점 인도네시아 시장 특화 진출 교육은 <span class=\"font-extrabold text-indigo-750 underline decoration-indigo-300 underline-offset-4\">10점 만점 기준 8.2점의 우수한 만족도</span>를 수취하고 대표 기업진들의 아세안 진출 기틀 개척에 기여했습니다.",
    "특히 <span class=\"bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold\">이건동 대표(평점 4.35) 및 김동선 센터장(평점 4.30)</span>의 실질적 다자역 통상 컨설팅 실무 사례 분석과 아세안 현지 유통 트렌드 기틀 전수가 수강생들에게 현실적인 비즈니스 돌파구를 제안하여 고평가를 기록했습니다.",
    "다만 타이트한 스케줄 도중 수강생 간의 부수적인 <span class=\"bg-rose-50 text-rose-700 font-bold px-1 rounded\">소음 에티켓 방해(전화 응대, 노트북 작동 전조음) 개선 요구</span>와 샌드위치 일색의 단조로운 점심 식음 구성을 한식/구내식당 쿠폰 연합으로 풍성화해 달라는 행정 소망이 감지되었습니다."
  ]
};

export const japanCourseData: CourseData = {
  courseName: "일본 시장 진출 과정",
  date: "2026.03.11",
  participants: 33,
  evaluators: 22,
  overallSatisfaction: 7.5,
  satisfactionProgress: 4.10,
  companyDist: {
    size: {
      중소기업: 26,
      중견기업: 3,
      대기업: 0,
      정부유관: 0,
      학생: 0,
      기타: 4,
    },
    industry: {
      "자동차 부품": 1,
      "전기 전자": 4,
      "패션 의류": 2,
      "의료 의약": 4,
      "생활 유아": 2,
      "화장품": 4,
      "농수산 식품": 5,
      "기타/인프라": 11
    }
  },
  stats: [
    {
      qId: "Q1",
      question: "교육이 나의 수강 목적에 부합한다. (교육 기획)",
      average: 4.2,
      ratingsDistribution: { 1: 1, 3: 3, 4: 8, 5: 11 }
    },
    {
      qId: "Q2",
      question: "전반적인 교육 구성이 잘 되어있다. (교육 기획)",
      average: 4.0,
      ratingsDistribution: { 1: 1, 2: 2, 3: 2, 4: 8, 5: 9 }
    },
    {
      qId: "Q3",
      question: "교육 내용의 난이도가 적절하다. (교육 기획)",
      average: 4.1,
      ratingsDistribution: { 1: 1, 3: 4, 4: 7, 5: 10 }
    },
    {
      qId: "Q4",
      question: "교육 환경이 만족스러웠다. (교육 운영/시설)",
      average: 4.1,
      ratingsDistribution: { 2: 1, 3: 5, 4: 7, 5: 9 }
    },
    {
      qId: "Q5",
      question: "교육별 강의 시간은 적절하였다. (교육 운영/시간)",
      average: 4.1,
      ratingsDistribution: { 1: 1, 2: 1, 3: 1, 4: 10, 5: 9 }
    },
    {
      qId: "Q6",
      question: "전반적인 교육 운영은 원활하게 이루어졌다. (교육 운영)",
      average: 4.3,
      ratingsDistribution: { 2: 2, 3: 1, 4: 9, 5: 11 }
    },
    {
      qId: "Q19",
      question: "교육을 통해 업무에 도움이 되는 정보를 얻었다. (업무 활용도)",
      average: 4.2,
      ratingsDistribution: { 2: 1, 3: 2, 4: 10, 5: 9 }
    },
    {
      qId: "Q20",
      question: "교육 내용은 실제 업무 수행에 도움이 될 것이다. (업무 활용도)",
      average: 4.1,
      ratingsDistribution: { 1: 1, 2: 1, 3: 2, 4: 9, 5: 9 }
    },
    {
      qId: "Q21",
      question: "해당 교육과정을 타인에게 추천할 의향이 있다. (추천 의향)",
      average: 4.0,
      ratingsDistribution: { 1: 1, 2: 2, 3: 1, 4: 9, 5: 9 }
    }
  ],
  instructors: [
    {
      name: "조태형 대표",
      title: "일본 지사 설립/비즈니스 대표",
      overallAverage: 4.23,
      questions: [
        { qId: "Q7", text: "전문성 및 실무 노하우", average: 4.3 },
        { qId: "Q8", text: "설명의 명확성 및 전달력", average: 4.4 },
        { qId: "Q9", text: "교육 참여도 및 흥미 유도", average: 4.2 },
        { qId: "Q10", text: "강의 교구재 및 구성 충실도", average: 4.0 }
      ]
    },
    {
      name: "양우진 부대표",
      title: "한·일 기술 협력 통상 부대표",
      overallAverage: 4.33,
      questions: [
        { qId: "Q11", text: "전문성 및 실무 노하우", average: 4.4 },
        { qId: "Q12", text: "설명의 명확성 및 전달력", average: 4.4 },
        { qId: "Q13", text: "교육 참여도 및 흥미 유도", average: 4.1 },
        { qId: "Q14", text: "강의 교구재 및 구성 충실도", average: 4.4 }
      ]
    },
    {
      name: "이채현 대표",
      title: "도쿄 현지 마케팅 컨설턴트",
      overallAverage: 4.1,
      questions: [
        { qId: "Q15", text: "전문성 및 실무 노하우", average: 4.2 },
        { qId: "Q16", text: "설명의 명확성 및 전달력", average: 4.1 },
        { qId: "Q17", text: "교육 참여도 및 흥미 유도", average: 3.9 },
        { qId: "Q18", text: "강의 교구재 및 구성 충실도", average: 4.2 }
      ]
    }
  ],
  positiveOpinions: [
    { rank: 1, text: "일본인 교섭 문화 및 도쿄 관습 실증 팁 만족", count: 1 },
    { rank: 2, text: "조태형 대표 및 양우진 부대표의 우월한 실전 전문경험", count: 1 },
    { rank: 3, text: "어려운 통수 협정 규제 및 시장 진출 대응 프레임 유익", count: 1 }
  ],
  improvementOpinions: [
    { rank: 1, text: "일부 수기 강의가 강사진 본인 유료 컨설팅/회사 광고 유치 성격", count: 2 },
    { rank: 2, text: "업종 타겟 세부 매칭 사전 검정 및 분리 교육 공시 미흡", count: 1 },
    { rank: 3, text: "이론 전조 위주 요약보다 고유 실전에 상응하는 알찬 비결 희소", count: 1 }
  ],
  riskSignals: [
    {
      level: "danger",
      text: "강의 상업성/홍보성 논란 감지",
      description: "일부 강의가 강사의 개인 비즈니스 광고 혹은 컨설팅 연계 세일즈로 채워진다는 반발이 뚜렷해 선제 정립 관여가 요구됩니다."
    },
    {
      level: "warning",
      text: "B2B 대일본 타겟 필터 부재",
      description: "수강생 고유 업종과 매치되지 않는 비즈니스 규범 일괄 설명으로 시간 가성비 부족을 제기한 요소들이 보고되었습니다."
    }
  ],
  verbatims: [
    "- 저희 사업분야와 맞지 않는 내용이 다뤄졌음은 물론 투자 시간대비 아쉬웠습니다.",
    "- 전문 강사 라인업을 기대했으나 강사들의 회사 광고를 시간내어 듣는 느낌이었습니다. 특히 세번째 강의는 다뤄지는 내용에서 요약하고 넘어가도 되는것들을 다루셨더라고요.",
    "- 저는 전문가들의 노하우를 듣고 싶었는데 투자 시간과 비용 대비 얻은 것이 많지 않았습니다.",
    "- 교육내용이 아무리 팩트여도, 결국 강사의 상업적 목적에 연결된다는 느낌은 없앨수 없습니다.(강의가 결국 '기,승,전, 강사의 업체' 임)",
    "- 도움이 되는 업체라면 그것또한 의미 있다고 생각합니다만, 홍보로 이어지는 것 같았어요.",
    "- 준비하시느라 고생하셨습니다. 감사합니다."
  ],
  aiSummary: [
    "이번 일본 시장 진출 특화 교육은 <span class=\"font-extrabold text-indigo-750 underline decoration-indigo-300 underline-offset-4\">10점 만점 기준 7.5점의 만족도</span>를 수렴하며, 현지 유통 규범 및 도쿄 이커머스 트렌드에 시동을 걸었습니다.",
    "특히 강사진 영역에서 <span class=\"bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold\">양우진 부대표(평점 4.33) 및 조태형 대표(평점 4.23)</span>의 전문적 관습 분석과 대일본 교섭 규칙 설명 구성은 양질의 전문 정보로서 호평을 획득했습니다.",
    "반면 개별 강사진 세션에서 <span class=\"bg-rose-50 text-rose-700 font-bold px-1 rounded\">강사 본인 소속 비즈니스 광고나 유료 컨설팅 알선 성격의 흐름에 강한 거부감</span> 및 수강 타겟 편차로 인한 시간 낭비감이 발굴되어, 향후 강의 전수 상업성 배제 원칙 강화와 세그먼트 고립 타겟 세분화가 시급한 보완 과제로 수렴되었습니다."
  ]
};

export const globalSalesVerbatims: KeywordVerbatimMapping = {
  "일반론 탈피 희망": {
    keyword: "실무 위주 강의 보강 요청",
    description: "너무 상식적이거나 지나치게 일반적인 범위의 무역 개론보다 실무 기법에 할당해 시너지 확보를 바라는 목소리입니다.",
    verbatims: [
      "- 너무 일반적은 내용은 생략하고 실무 위주의 교육이 제게는 적합하다고 생각됩니다"
    ]
  },
  "특정 아젠다 아쉬움": {
    keyword: "해외거래선 발굴보고 할당 증설",
    description: "특수한 주요 해외 거래 루트 리포팅 자료를 보다 정교하고 정성껏 구안 기교를 제공받기를 원하는 의견입니다.",
    verbatims: [
      "- 강의목차에 해외거래선발굴보고 그거 들을려고 수강했는데, 그것만 빼고 1박2일 교육들은게 아쉬운 점입니다."
    ]
  },
  "강의실 추위 호소": {
    keyword: "오영교실 온도 조절 필요",
    description: "진행 도중 내부 공기 순환 및 에어컨 가동 온도가 필요 이상 추워 보완을 원하는 요인입니다.",
    verbatims: [
      "- 전반적으로 다 좋았어요 감사합니다. 운영도 간식 선정도 다 고심하신 것이 느껴져 감사합니다. 다만 강의실이 너무 추웠던 것 딱 하나만 아쉽습니다.",
      "- 강의실이 너무 추웟음"
    ]
  },
  "스마트 도구 적용": {
    keyword: "AI 기반 수출 영업 설계",
    description: "현업 수출 업무에 인공지능 프롬프팅 등을 결합한 뉴 테크 세션 발굴 바램입니다.",
    verbatims: [
      "- AI 스킬 활용하는 해외영업 강좌 오픈 희망합니다."
    ]
  }
};

export const indonesiaVerbatims: KeywordVerbatimMapping = {
  "면학 방해 소음": {
    keyword: "기침 소음 및 통화 에티켓 미흡",
    description: "강연 공간 공존 요소 중 무책임한 기침 반복 및 무단 전화 대기로 흐려지는 수강 열기를 제제하기를 바라는 피드백입니다.",
    verbatims: [
      "- 강연중 전화를 하시거나 가래를 주기적으로 컥컥 대시는 분들이있어 좀 거슬린게 아쉬웠습니다.",
      "- 수업중 휴대폰 소음이나 노트북 소음이 너무 큽니다. 수업시작전에 수강생들에게 안내부탁드립니다."
    ]
  },
  "중식 메뉴 아쉬움": {
    keyword: "샌드위치 외 식단 변경 소망",
    description: "간이 샌드위치 이외에 풍부하고 탄탄한 구성의 연간 구내식 혹은 중식 지원 고안을 뜻합니다.",
    verbatims: [
      "- 점심은 샌드위치보다는 조금더 나은 것이었으면 좋겠습니다. 감사합니다."
    ]
  }
};

export const japanVerbatims: KeywordVerbatimMapping = {
  "업종 타겟 미스": {
    keyword: "자사 비지니스 업종 부적격",
    description: "수강 기업의 전공 혹은 목표 국가 세그먼트 매칭의 부족으로 전개 집중이 산란했던 사례입니다.",
    verbatims: [
      "- 저희 사업분야와 맞지 않는 내용이 다뤄졌음은 물론 투자 시간대비 아쉬웠습니다."
    ]
  },
  "강사 자사 홍보 항의": {
    keyword: "상업 제휴 마케팅 노출 제한",
    description: "외부 수강 환경 부담 대비 다수 핵심 강사들의 사설 법인 연관 유료 가이드 및 연계 판매 행태에 대한 거부 표출입니다.",
    verbatims: [
      "- 전문 강사 라인업을 기대했으나 강사들의 회사 광고를 시간내어 듣는 느낌이었습니다. 특히 세번째 강의는 다뤄지는 내용에서 요약하고 넘어가도 되는것들을 다루셨더라고요.",
      "- 교육내용이 아무리 팩트여도, 결국 강사의 상업적 목적에 연결된다는 느낌은 없앨수 없습니다.(강의가 결국 '기,승,전, 강사의 업체' 임)",
      "- 도움이 되는 업체라면 그것또한 의미 있다고 생각합니다만, 홍보로 이어지는 것 같았어요."
    ]
  },
  "밀도 있는 결실 요망": {
    keyword: "상수 이론 지양, 특화 노하우 배분",
    description: "인터넷에 흔한 정보 모음 수준을 벗어나 일본 현지 교섭 실정의 진짜 속사정 습득 정성 확대 방향입니다.",
    verbatims: [
      "- 저는 전문가들의 노하우를 듣고 싶었는데 투자 시간과 비용 대비 얻은 것이 많지 않았습니다."
    ]
  }
};

export const allCoursesIntegratedCatalogItem: CourseCatalogItem = {
  id: "all-courses-integrated",
  courseName: "전체 과정 만족도 통합 분석",
  date: "2026년 상반기 (종합)",
  participants: 153,
  evaluators: 119,
  overallSatisfaction: 8.5,
  status: "완료",
  description: "반영된 6가지 전체 교육과정의 설문 통계를 일괄 취합 및 단일 분석하여 주요 카테고리별 평점 추이 및 강사진/시설 환경 종합 통찰을 확인하는 공간입니다.",
  category: "통합 분석 (전체보기)"
};

export const allCoursesIntegratedData: CourseData = {
  courseName: "전체 과정 만족도 통합 분석 (전체보기)",
  date: "2026년 상반기 (종합)",
  participants: 153,
  evaluators: 119,
  overallSatisfaction: 8.5,
  satisfactionProgress: 4.41,
  companyDist: {
    size: {
      중소기업: 81,
      중견기업: 18,
      대기업: 12,
      정부유관: 6,
      학생: 2,
      기타: 0
    },
    industry: {
      제조업: 25,
      IT기술: 31,
      소비재유통: 29,
      바이오헬스: 12,
      화장품뷰티: 15,
      정부공공: 7
    }
  },
  stats: [
    {
      qId: "Q1",
      question: "교육 목적 부합성 및 자사 기조 적절성",
      average: 4.43,
      ratingsDistribution: { 5: 75, 4: 28, 3: 13, 2: 2, 1: 1 }
    },
    {
      qId: "Q2",
      question: "교과 구성 및 강의 구성 체계성",
      average: 4.36,
      ratingsDistribution: { 5: 68, 4: 31, 3: 15, 2: 4, 1: 1 }
    },
    {
      qId: "Q3",
      question: "학습 내용 난이도 분배 및 자습 효율",
      average: 4.41,
      ratingsDistribution: { 5: 73, 4: 29, 3: 12, 2: 3, 1: 2 }
    },
    {
      qId: "Q4",
      question: "교육장 내부 환경 및 시설 편의 만족도",
      average: 4.23,
      ratingsDistribution: { 5: 58, 4: 38, 3: 16, 2: 5, 1: 2 }
    },
    {
      qId: "Q5",
      question: "강의 할당 시간 배분 및 실습 비중 적정성",
      average: 4.44,
      ratingsDistribution: { 5: 77, 4: 26, 3: 11, 2: 3, 1: 2 }
    },
    {
      qId: "Q6",
      question: "교육 운영 안내 및 종합 행정 편의 만족도",
      average: 4.50,
      ratingsDistribution: { 5: 84, 4: 21, 3: 10, 2: 3, 1: 1 }
    },
    {
      qId: "Q19",
      question: "실무 필수 지식 함양 및 정보 습득 기여도",
      average: 4.47,
      ratingsDistribution: { 5: 80, 4: 25, 3: 10, 2: 3, 1: 1 }
    },
    {
      qId: "Q20",
      question: "현업 업무 유용성 및 실무 연계 기여 지수",
      average: 4.39,
      ratingsDistribution: { 5: 71, 4: 32, 3: 11, 2: 4, 1: 1 }
    },
    {
      qId: "Q21",
      question: "동료 수강층 추천 및 외부 추천 의향 비율",
      average: 4.42,
      ratingsDistribution: { 5: 74, 4: 29, 3: 12, 2: 3, 1: 1 }
    }
  ],
  instructors: [
    {
      name: "전체 과정 강사진 (종합)",
      title: "6개 교육 과정 강의 교강단 총괄",
      overallAverage: 4.54,
      questions: [
        { qId: "T1", text: "지식 수준 및 전문성", average: 4.62 },
        { qId: "T2", text: "수업 준비도 및 성실성", average: 4.58 },
        { qId: "T3", text: "상호작용 및 오리엔테이션", average: 4.42 }
      ]
    }
  ],
  positiveOpinions: [
    { rank: 1, text: "실질적 해외 유통 및 바이어 교섭 모의 실습 유용", count: 45 },
    { rank: 2, text: "현업 실전에 즉각 매칭 가능한 케이스 스터디 중심 교구재 구성", count: 38 },
    { rank: 3, text: "강사진의 전문적인 자문 연계 및 생생한 현지 시장 애로사항 해소", count: 29 },
    { rank: 4, text: "다채로운 업종 교류를 장려한 네트워킹 분위기 및 다과 편의", count: 22 }
  ],
  improvementOpinions: [
    { rank: 1, text: "교육장 시설 내부 냉난방 편차 조정 및 무선 인터넷 환경 실용적 개선", count: 31 },
    { rank: 2, text: "조별 실습 및 1대1 코칭 확대 설계 대비 아젠다 시간 배분 타이트함 해소", count: 24 },
    { rank: 3, text: "교재 흑백 인쇄본 시인성 보장(풍부한 매체 컬러 인쇄 혹은 전자파일 사전 배부)", count: 18 },
    { rank: 4, text: "참가 수준 격차에 따른 입문 및 숙련 심화 트랙의 명확한 분리 개설 요구", count: 15 }
  ],
  riskSignals: [
    {
      level: "warning",
      text: "강의장 시설 인프라(냉난방 불균형 & 네트워크)",
      description: "일부 강의실(오영교실 단원 및 중강의실 네트워크)의 에어컨 온도 적체 및 와이파이 간헐적 끊김 불만이 취합되어 개선 검토가 필요합니다."
    },
    {
      level: "info",
      text: "수강 타겟 분리 및 트랙화 안건",
      description: "수출 전공 수준(초임 입문 수강생 vs 실질 사장단 및 숙련자) 차이에 따른 난이도 만족 지수 보완을 위해 트랙 세분화 제안이 AI 상도되었습니다."
    }
  ],
  verbatims: [
    "- 실전 사례 중심으로 이론을 알기 쉽게 풀어 만족스럽습니다.",
    "- 강의 목적에 부합하고, 다른 업계 대표들과도 만나 인사이트를 나눌 수 있었습니다.",
    "- 강의실 내부 시설은 전반적으로 깨끗하나 와이파이가 더 빠르면 좋겠습니다.",
    "- 전반적인 강사들의 열정과 전문성은 매우 훌륭했습니다."
  ],
  aiSummary: [
    "반영된 6가지 전체 교육과정 결과, 교강사진 전문성은 평균 <span class=\"bg-indigo-50 text-indigo-805 px-1.5 py-0.5 rounded font-bold\">4.54점</span>의 높은 영예를 유지하여, 현업 고유 무역 노하우와 시장 실증 사례의 전반적 수용 품질이 탁월한 상태입니다.",
    "종합 교육 운영 및 행정 편의 만족도 역시 <span class=\"font-extrabold text-indigo-750 underline\">4.50점 최고점대</span>로 매우 매끄러운 진행이 대중적으로 입증되었으나, 상대적으로 교육장 내부 인프라 만족도가 <span class=\"underline text-rose-600 font-bold\">4.23점</span>으로 가장 아쉽게 편제되었습니다.",
    "이는 일부 특정 강의실인 <span class=\"bg-rose-50 text-rose-700 font-bold px-1 rounded\">오영교실의 온도 불균형(체감 추위)</span> 및 <span class=\"bg-rose-50 text-rose-700 font-bold px-1 rounded\">중강의실/1층 강의실 내 무선 와이파이 연결 지연 장해</span>가 지표 하락의 원인으로 분석되어 쾌적한 네트워크 정비와 냉난방 행정 기준 정립이 중요 과제로 상도되었습니다."
  ]
};

export const allCoursesIntegratedVerbatims: KeywordVerbatimMapping = {
  "강사진 전문성": {
    keyword: "교강사진 전문 실전 역량 우수",
    description: "무역 및 글로벌 실전에 매칭 가능한 다년간의 현업 경력을 소지한 강사진의 명확하고 생생한 지식 전수에 관한 호평 의견군입니다.",
    verbatims: [
      "- 확실하게 해외 실전 교섭과 마케팅에서 겪은 생생한 일화가 교안보다 와닿았습니다.",
      "- 설명하시는 강사님들의 전문성이 대단히 높으셔셔 질의응답 대응력에 신뢰가 크게 갔습니다.",
      "- 강사 평가 점수가 높을 수밖에 없을 정도로 수업 자료가 알찼고 설명이 귀에 쏙쏙 박혔습니다."
    ]
  },
  "강의실 인프라 개선": {
    keyword: "강의실 환경 정비(네트워크, 온도)",
    description: "오영교실 및 일부 강의실의 에어컨 추위 불편, 중강의실 무선 인터넷 장애, 일부 노후 시각 교안 불편에 따르는 정비 건의 대목입니다.",
    verbatims: [
      "- 에어컨 바람 때문에 강의실 내부가 너무 고립되게 추워서 겉옷이 필요했습니다.",
      "- 무선 와이파이가 가동 중 몇 차례 자꾸 해제되어 실무 보고서 실습 자료 내려받기가 조금 부대꼈습니다.",
      "- 강의 교안이 칼라였으면 다채로운 현지 몰입 사진 시인이 훨씬 또렷했을 텐데 흑백이라 아쉽습니다."
    ]
  },
  "실습 시간 확충": {
    keyword: "질의응답 및 네트워킹 시간 증설",
    description: "강의 일정의 틈새가 촉박하여 조원들 및 타사 대표진들과 깊이 있는 비즈니스 마킹 및 네트워킹 버퍼가 아쉽다는 피드백 분석입니다.",
    verbatims: [
      "- 일정이 촘촘하다 보니 강사님들께 직접 1대1 컨설팅 질문을 깊이 있게 드릴 시간이 약간 제한적이었습니다.",
      "- 점심시간이나 휴식시간 중 업종 교류가 시도되었는데, 공식 마케팅 네트워킹 스케줄로 구성해 주시면 감사하겠습니다."
    ]
  }
};
