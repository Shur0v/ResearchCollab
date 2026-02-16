
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const API_KEY = process.env.API_KEY || '';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateResearchMindMap = async (query: string) => {
  if (!API_KEY) {
    console.warn("API Key is missing for Gemini Service");
    return null;
  }

  const prompt = `Analyze the research topic: "${query}". Generate a hierarchical mind map structure in JSON format. 
The structure should include a core concept, supporting research areas, and potential sources.`;

  const schema = {
    type: SchemaType.OBJECT,
    properties: {
      nodes: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            id: { type: SchemaType.STRING },
            label: { type: SchemaType.STRING },
            description: { type: SchemaType.STRING },
            type: { type: SchemaType.STRING },
            children: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT, properties: {
                  id: { type: SchemaType.STRING },
                  label: { type: SchemaType.STRING },
                  type: { type: SchemaType.STRING }
                }
              }
            }
          },
          required: ["id", "label", "type"]
        }
      }
    }
  };

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema as any,
      }
    });
    return JSON.parse(result.response.text());
  } catch (e) {
    console.error("Failed to parse mind map JSON", e);
    return null;
  }
};

export const generateResearchOutline = async (topic: string) => {
  if (!API_KEY) return null;

  const prompt = `Generate a formal academic research outline for the topic: "${topic}". 
Focus on intellectual authority and clarity. Provide a structured document format.`;

  const schema = {
    type: SchemaType.OBJECT,
    properties: {
      title: { type: SchemaType.STRING, nullable: false },
      sections: {
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            heading: { type: SchemaType.STRING, nullable: false },
            subheadings: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING, nullable: false } },
            context: { type: SchemaType.STRING, nullable: false }
          },
          required: ["heading", "subheadings", "context"]
        }
      }
    },
    required: ["title", "sections"]
  } as const;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema as any,
      }
    });

    return JSON.parse(result.response.text());
  } catch (e) {
    console.error("Failed to parse outline JSON", e);
    return null;
  }
};
