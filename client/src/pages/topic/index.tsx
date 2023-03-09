import { GET_PROJECT } from "@/modules/resolvers/projectsResolvers"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"

export default function Index(props:any){
  const router = useRouter()
  //aşağıda ki topicleri çekecek şekilde değiştir
  const { data:getProjectData, loading: getProjectLoading, error: getProjectError } = useQuery(GET_PROJECT, {variables: {input:{_id:router?.query.project_id}}})

  return(
    <>
      Konu başlıkları buraya gelecek
    </>
  )
}