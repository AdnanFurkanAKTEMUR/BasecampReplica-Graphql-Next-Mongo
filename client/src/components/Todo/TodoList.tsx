import TodoCard from "./TodoCard";

export default function TodoList(props: any) {
  console.log(props.todos);


  return (
    <>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1">
        {
          props.todos?.map((todo: any) => {
            return <TodoCard todo={todo} />
          })
        }
      </div>
    </>
  )
}