import { useContext, useEffect } from "react"
import {getAllInterviewReports, generateInterviewReport, getInterviewReportById, deleteInterviewReport} from "../services/interview.api"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"
// import { resume } from "react-dom/server"


export const useInterview =() =>{
    const context = useContext(InterviewContext)
    const {interviewId} = useParams()
        // const [delete, setDelete] = useState(false);

    
    if(!context){
        throw new Error("use Interview must be used within an interviewProvider")
    }

    const {loading, setLoading,report,setReport,reports,setReports,reportDelete, setReportDelete} = context

    const generateReport = async({jobdescribe, selfdescribe, resume}) =>{
        setLoading(true)
                let response = null

        try{
             response = await generateInterviewReport({jobdescribe, selfdescribe, resume})
            setReport(response.interviewReport)

        } catch(error){
            console.error("error in getting interview report:: ", error)
        }finally{
            setLoading(false)
        }
        return response?.interviewReport || null
    }

    const getReportById = async (interviewId) => {

        setLoading(true)
                let response = null

        try{
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
        return response?.interviewReport || null
    }
    
    const getReports = async() =>{
        
        setLoading(true)
        let response = null
        try{
             response = await getAllInterviewReports()
            setReports(response.interviewReport)
        } catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
        return response?.interviewReport|| null
    }

    useEffect(()=>{
        if(interviewId){
            getReportById(interviewId)
        }else{
            getReports()
        }
    },[interviewId])



    const deleteReport = async (interviewId) => {
        if(!window.confirm('are you sure you want to delete this report??')){
             return null;
    }
        setReportDelete(true)
        setLoading(true)
        

        try{
            const response = await deleteInterviewReport(interviewId)
            setReports((prevReports) => prevReports.filter((report) => 
                report._id !== interviewId)
        )
            
        return response?.interviewReport || null

        }catch(err){
            console.log('delete error',err)
            return null;
        }finally{
            setLoading(false)
            setReportDelete(false)
        }
    }

    return{loading, report, reports, generateReport, getReportById, getReports,deleteReport,reportDelete, setReportDelete}

    }