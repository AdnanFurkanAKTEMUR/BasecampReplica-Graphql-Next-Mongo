import CreateTodoComponent from "@/components/Todo/CreateTodoComponent"
import { useRouter } from "next/router"

export default function CreateTodo(props: any){
  const router = useRouter()
  return(
    <>
      { router.isReady && <CreateTodoComponent topic_id={router?.query.topic_id} /> }
    </>
  )
}