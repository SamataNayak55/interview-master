import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials:true
})

export async function generateInterviewReport({resume,
        selfdescribe,
        jobdescribe}){
            const formData =new FormData()
            formData.append("jobdescribe",jobdescribe)
            formData.append("selfdescribe",selfdescribe)
            formData.append("resume",resume)
        
        const response = await api.post("/api/interview/",formData
        ,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        
        }
        )
        return response.data
    }

    export async function getInterviewReportById(interviewId){
        const response = await api.get(`/api/interview/report/${interviewId}`)

        return response.data
    }

    export async function getAllInterviewReports(){
        const response = await api.get('/api/interview')

        return response.data
    }

   export async function deleteInterviewReport(interviewId){
         const response = await api.delete(`/api/interview/report/${interviewId}`)
        return response.data
    }