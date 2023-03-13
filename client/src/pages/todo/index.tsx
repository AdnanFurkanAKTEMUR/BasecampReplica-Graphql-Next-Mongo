import { useRouter } from "next/router"
import { useQuery } from '@apollo/client';
import { GET_TODOS_OF_TOPIC } from "@/modules/resolvers/todoResolvers";
import TodoList from "@/components/Todo/TodoList";

export default function Index(props: any) {
  const router = useRouter()
  const { data: todoData, loading: todoLoading, error: todoError} = useQuery(GET_TODOS_OF_TOPIC,{
    variables:{
      input:{
        topic_id: router?.query.topic_id
      }
    }
  })

  if(todoLoading) return <div>Bekleyiniz</div>
  if(todoError) return <div>Error</div>
  return (
    <>
    {router.isReady && <div>Router is ready</div>}
      <h3>All Todos</h3>
      <div className="mt-5">
      {
        todoData?.getAllTodosOfTopic ? <TodoList todos={todoData.getAllTodosOfTopic} /> : ""
      }
      </div>
    </>
  )
}