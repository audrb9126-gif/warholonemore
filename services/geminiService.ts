import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getWarholAdvice = async (userQuery: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: `당신은 '워홀 원 모어'의 AI 가이드입니다. 워킹홀리데이를 준비하는 한국인 청년들에게 친절하고 구체적이며 긍정적인 조언을 해주세요. 호주, 캐나다, 영국, 일본 등 주요 워홀 국가의 비자, 일자리, 숙소 정보를 잘 알고 있습니다.`,
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "미안해요, 지금은 조언을 해드리기 어렵네요. 잠시 후 다시 시도해주세요!";
  }
};