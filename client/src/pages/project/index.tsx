import ProjectInfo from "@/components/Project/ProjectInfo"
import { useRouter } from "next/router"

export default function Project() {

  const router = useRouter()
  let project_id;
  if(router.isReady){
    project_id = router.query.project_id
  }
  return (
    <>
      <ProjectInfo project_id={project_id} />
    </>
  )
}