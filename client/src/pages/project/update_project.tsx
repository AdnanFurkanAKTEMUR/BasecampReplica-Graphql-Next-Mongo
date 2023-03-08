import UpdateProjectComponent from "@/components/Project/UpdateProject"
import { GET_PROJECT } from "@/modules/resolvers/projectsResolvers";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router"

export default function UpdateProject( props: any ){
  const router = useRouter()
  const { data:getProjectData, loading: getProjectLoading, error: getProjectError } = useQuery(GET_PROJECT, {variables: {input:{_id:router?.query.project_id}}})
  
  if(getProjectLoading) return <div>Yükleniyor</div>
  if(getProjectError) return <div>Hata</div>
  return (
    <>
      <h3 className="text-2xl">Proje Güncelle</h3>
      { getProjectData?.getProject ? <UpdateProjectComponent project={getProjectData?.getProject} /> : ""}
      
    </>
  )
}