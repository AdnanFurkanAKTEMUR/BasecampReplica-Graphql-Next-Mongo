import TopicList from "@/components/Topic/TopicList"
import { GET_ALL_TOPICS_OF_PROJECT } from "@/modules/resolvers/topicResolvers"
import { useQuery } from "@apollo/client"
import Link from "next/link"
import { useRouter } from "next/router"
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function Index(props:any){
  const router = useRouter()
  //aşağıda ki topicleri çekecek şekilde değiştir
  const { data:topicData, loading:topicLoading, error: topicError } = useQuery(GET_ALL_TOPICS_OF_PROJECT, { variables: { input: { project_id: router?.query.project_id}}})
  const btnClass = "text-gray-900 bg-white border border-gray-300 focus:outline-none text-center focus:ring-4 my-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
  
  if(topicLoading) return <div>Bekleyiniz</div>
  if(topicError) return <div>Error</div>
  return(
    <>
    {
      router.isReady ? <Link href={{ pathname: 'topic/create_topic', query: { project_id: router?.query.project_id } }} className={btnClass}> Konu Oluştur <AiOutlinePlusCircle style={{display:"inline"}} /></Link> : ""
    }
      <div className="mt-5">
      {
        topicData?.getAllTopicsOfProject ? <TopicList topics={topicData.getAllTopicsOfProject} /> : ""
      }
      </div>

    </>
  )
}