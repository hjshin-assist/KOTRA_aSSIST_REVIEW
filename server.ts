import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Real Gemini Client initialization
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // API router for feedback analysis
  app.post("/api/analyze-feedback", async (req, res) => {
    const { rawText } = req.body;
    if (!rawText || rawText.trim() === "") {
      return res.status(400).json({ error: "분석할 주관식 피드백 데이터를 입력해주세요." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      console.warn("GEMINI_API_KEY is not configured or matches the default value. Returning structured simulator fallback...");
      return res.json({
        isDemo: true,
        summary: [
          "입력된 피드백 텍스트에 대한 AI 분류 시뮬레이션 결과입니다.",
          "실무 중심 사례 위주의 세부 설명과 유용한 노하우 전수가 가장 긍정적으로 분석되었습니다.",
          "강의 구성 전반의 깊이 조절에 관한 피드백과 함께 시간 대비 과다한 정보량으로 인한 속도감 조절이 지적되었습니다."
        ],
        ratings: {
          instructor: 4.8,
          content: 4.5,
          operations: 4.4,
          facilities: 4.2
        },
        topPositive: [
          { text: "현업 실무 연계성이 높은 실전 노하우 전달", count: 7 },
          { text: "강사진의 열정과 막힘 없는 고도화 피드백", count: 5 },
          { text: "교재의 구조화와 실용적인 내용 구성", count: 3 }
        ],
        topNegative: [
          { text: "풍부한 주제 대비 강의 시간 및 질의 시간 부족", count: 6 },
          { text: "실제 적용해보거나 토론할 수 있는 버퍼 타임 부족", count: 4 },
          { text: "교재 축소 인쇄로 인해 텍스트 식별이 다소 힘듦", count: 2 }
        ],
        riskSignals: [
          { level: "danger", text: "'진행 시간 부족' 등의 시간 조절 피드백이 응답 원문의 30%를 초과 검출되었습니다." },
          { level: "warning", text: "실무 Use Case와 단순 기초 개념 강의 사이의 수강 타겟 조율 신호가 발생했습니다." }
        ],
        verbatimsByKeyword: {
          "시간 부족": [
            "좋았지만 전반적으로 핵심만 다루다 보니 시간이 조금 짧았습니다.",
            "Q&A에 더 많은 시간이 할애되었으면 원활한 소통이 가능했을 것 같습니다.",
            "실습할 시간이 부족해서 집에서 직접 과제로 복습해야 할 정도였습니다."
          ],
          "실무 사례": [
            "실무적인 적용 방안이 가득해서 즉시 도움이 될 유용한 강의였습니다.",
            "해외 마케팅 실무 지식을 직접 확인하고 짚어볼 수 있어 만족스러웠습니다."
          ],
          "교재 폰트": [
            "소형 프린트로 인쇄되어 잘 보이지 않아 나중에 PDF 파일이나 컬러 가이드를 받아봤으면 좋겠습니다."
          ]
        }
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `수강생들의 서술형 설문 피드백 데이터를 분석하여 교육 만족도 요약 보고서를 JSON 형태로 추출해주세요.

분석 대상 피드백 원문:
"""
${rawText}
"""`,
        config: {
          systemInstruction: "You are an expert Educational Evaluation Bot. Given a set of raw text course feedback, analyze the general statistics, structure a beautiful evaluation JSON response. Fill 'summary' with exactly 3 bullet points summarizing key takeaways. Write the text keys in Korean.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "AI가 요약한 핵심 피드백 문단 3줄"
              },
              ratings: {
                type: Type.OBJECT,
                properties: {
                  instructor: { type: Type.NUMBER, description: "강사 영역 예측 평점 (1.0 ~ 5.0)" },
                  content: { type: Type.NUMBER, description: "교육내용 영역 예측 평점 (1.0 ~ 5.0)" },
                  operations: { type: Type.NUMBER, description: "운영 영역 예측 평점 (1.0 ~ 5.0)" },
                  facilities: { type: Type.NUMBER, description: "시설/환경 영역 예측 평점 (1.0 ~ 5.0)" }
                },
                required: ["instructor", "content", "operations", "facilities"]
              },
              topPositive: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING, description: "긍정적인 점 분석 요약" },
                    count: { type: Type.INTEGER, description: "해당 의견의 언급 수나 추정 가중치" }
                  },
                  required: ["text", "count"]
                }
              },
              topNegative: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING, description: "개차/수정 요구사항 요약" },
                    count: { type: Type.INTEGER, description: "해당 언급 수나 요구 빈도" }
                  },
                  required: ["text", "count"]
                }
              },
              riskSignals: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    level: { type: Type.STRING, description: "'danger' (심각) 또는 'warning' (주의)" },
                    text: { type: Type.STRING, description: "위험 신호 세부 내용 설명" }
                  },
                  required: ["level", "text"]
                }
              },
              verbatimsByKeyword: {
                type: Type.OBJECT,
                properties: {
                  "시간 부족": {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "시간 분배 불만족이나 촉박함을 담은 원문 발췌"
                  },
                  "실무 사례": {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "실무 활용, 실용적 케이스가 도움되었음을 언급한 원문 발췌"
                  },
                  "교재 폰트": {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "교재, 프린트 가독성이나 글꼴 시인성을 언급한 원문 발췌"
                  }
                },
                required: ["시간 부족", "실무 사례", "교재 폰트"]
              }
            },
            required: ["summary", "ratings", "topPositive", "topNegative", "riskSignals", "verbatimsByKeyword"]
          }
        }
      });

      const jsonText = response.text || "{}";
      const parsedData = JSON.parse(jsonText.trim());
      res.json({ isDemo: false, ...parsedData });

    } catch (err: any) {
      console.error("Gemini API call failed:", err);
      res.status(500).json({ error: "AI 분석 결과 처리 중 오류가 발생했습니다: " + err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
