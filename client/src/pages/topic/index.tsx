import TopicList from "@/components/Topic/TopicList"
import { GET_PROJECT } from "@/modules/resolvers/projectsResolvers"
import { GET_ALL_TOPICS_OF_PROJECT } from "@/modules/resolvers/topicResolvers"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"

export default function Index(props:any){
  const router = useRouter()
  //aşağıda ki topicleri çekecek şekilde değiştir
  const { data:topicData, loading:topicLoading, error: topicError } = useQuery(GET_ALL_TOPICS_OF_PROJECT, { variables: { input: { project_id: router?.query.project_id}}})

  if(topicLoading) return <div>Bekleyiniz</div>
  if(topicError) return <div>Error</div>
  return(
    <>
      {
        topicData?.getAllTopicsOfProject ? <TopicList topics={topicData.getAllTopicsOfProject} /> : ""
      }
    </>
  )
}