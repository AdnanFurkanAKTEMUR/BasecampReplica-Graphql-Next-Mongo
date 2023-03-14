import { useRouter } from "next/router"
import { useQuery } from '@apollo/client';
import { GET_TODOS_OF_TOPIC } from "@/modules/resolvers/todoResolvers";
import TodoList from "@/components/Todo/TodoList";
import Link from "next/link";
import { AiOutlinePlusCircle } from "react-icons/ai";

export default function Index(props: any) {
  const router = useRouter()
  const { data: todoData, loading: todoLoading, error: todoError} = useQuery(GET_TODOS_OF_TOPIC,{
    variables:{
      input:{
        topic_id: router?.query.topic_id
      }
    }
  })
  const btnClass = "text-gray-900 bg-white border border-gray-300 focus:outline-none text-center focus:ring-4 my-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
  if(todoLoading) return <div>Bekleyiniz</div>
  if(todoError) return <div>Error</div>
  return (
    <>
      { router.isReady && <Link href={{pathname:"todo/create_todo", query:{topic_id:router?.query.topic_id}}} className={btnClass}>Görev Ekle <AiOutlinePlusCircle style={{display:"inline"}} /></Link>}
      
      <div className="mt-5">
      {
        todoData?.getAllTodosOfTopic ? <TodoList todos={todoData.getAllTodosOfTopic} /> : ""
      }
      </div>
    </>
  )
}