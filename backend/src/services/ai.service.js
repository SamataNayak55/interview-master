const {GoogleGenAI} = require('@google/genai')
const {z} = require('zod')
const {zodToJsonSchema} = require('zod-to-json-schema')


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})



async function generateInterviewReport({jobdescribe, resume, selfdescribe}) {

    try{
 const prompt = `
Generate an interview report.

Return ONLY valid JSON.

The JSON must exactly match this structure:

{
  "matchScore": number (btween 0 and 100),
  "technicalQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "behaviouralQuestions": [
    {
      "question": "",
      "intention": "",
      "answer": ""
    }
  ],
  "skillGap": [
    {
      "skill": "",
      "severity": "low"
    }
  ],
  "preprationPlan": [
    {
      "day": 1,
      "focus": "",
      "tasks": ["",""]
    }
  ],
  "title": ""
}

Generate:
- title of the job for which the report is enerated
- 50 technical questions based on the job description and the resume
- 50 behavioural questions based on the job description and the resume
-  skill gaps based on the job description and the resume 
- prepration plan based on the job description and the resume minimizing the skill gaps and improving the match score it must be minimum 7 days and maximum 30 days plan

Resume:
${resume}

Self Description:
${selfdescribe}

Job Description:
${jobdescribe}
`;

    const response1 = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            // responseSchema:zodToJsonSchema(interviewReportSchema),
            temperature: 0.2 

        }
    
    })
    if (!response1 || !response1.text) {
            throw new Error("No response string returned from Gemini.");
        }

        console.log("SUCCESSFUL AI OUTPUT STRING:", response1.text);
        
    return JSON.parse(response1.text)
}catch(err){
 
    console.log("gemini api error : ",err)
    throw err;
}
    
}




module.exports = generateInterviewReport
