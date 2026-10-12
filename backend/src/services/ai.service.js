require('dotenv').config()
const {GoogleGenAI, Type} = require('@google/genai')
const {z} = require('zod')
const {zodToJsonSchema} = require('zod-to-json-schema')
// const {interviewReportSchema} = require('../models/interviewReport.model')


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY 
    // console.log("api key::::", apiKey)
})


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The 50 technical questions can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(1).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behaviouralQuestions: z.array(z.object({
        question: z.string().describe("The 50 behavioural questions can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(1).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGap: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).min(1).describe("List of skill gaps in the candidate's profile along with their severity"),
    preprationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1 to 30 "),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).min(7).max(30).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})



async function generateInterviewReport({jobdescribe, resume, selfdescribe}) {

    try{
 const prompt =`
Generate a complete, personalized interview report using the supplied resume, self-description, and job description.
Return every field required by the JSON response schema with substantive content. Do not return empty arrays.

Requirements:
- Generate 50 distinct technical interview questions relevant to the job and candidate, each with the interviewer's intention and a useful answer outline.
- Generate 50 distinct behavioural interview questions relevant to the job and candidate, each with the interviewer's intention and a useful answer outline.
- Identify at least 3 evidence-based skill gaps between the candidate's profile and the job requirements, with severity set to low, medium, or high.
- Create a practical preparation plan with at least 7 and at most 30 consecutive days. Include a focus and actionable tasks for every day.
- Set matchScore to a number from 0 to 100 and title to the job title.
- Use the exact field names from the response schema, including "behaviouralQuestions", "skillGap", and "preprationPlan".

Resume:
${resume}

Self Description:
${selfdescribe}

Job Description:
${jobdescribe}
`;

   
const response = await ai.models.generateContent({
  model: "gemini-3.5-flash-lite",
  contents: prompt,
  config: {
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        matchScore: {
          type: Type.NUMBER
        },
        title: {
          type: Type.STRING
        },
        technicalQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              intention: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "intention", "answer"]
          }
        },
        behaviouralQuestions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              intention: { type: Type.STRING },
              answer: { type: Type.STRING }
            },
            required: ["question", "intention", "answer"]
          }
        },
        skillGap: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              skill: { type: Type.STRING },
              severity: {
                type: Type.STRING,
                enum: ["low", "medium", "high"]
              }
            },
            required: ["skill", "severity"]
          }
        },
        preprationPlan: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.NUMBER },
              focus: { type: Type.STRING },
              tasks: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["day", "focus", "tasks"]
          }
        }
      },
      required: [
        "matchScore",
        "title",
        "technicalQuestions",
        "behaviouralQuestions",
        "skillGap",
        "preprationPlan"
      ]
    },
    temperature: 0.2
  }
});

    return JSON.parse(response.text)   
    
   
}catch(err){
 
    console.log("gemini api error : ",err)
    throw err;
}
 
}



module.exports ={ generateInterviewReport}
