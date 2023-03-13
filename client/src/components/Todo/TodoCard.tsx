import Link from 'next/link';


export default function TodoCard(props: any) {

  return (
    <>
      <div className="max-w-sm bg-white rounded-lg shadow">
        <div className="p-5">
          <Link href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{props.todo.todo_name}</h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700">{props.todo.todo_description}</p>
          <p className='mb-1 text-gray-400'><i>Oluşturulma Tarihi: {new Date(parseInt(props.todo.created_at)).toLocaleString("tr-TR")}</i></p>
          <p className='mb-3 text-gray-400'><i>Güncellenme Tarihi: {new Date(parseInt(props.todo.updated_at)).toLocaleString("tr-TR")}</i></p>
          <Link href={{pathname: "todo/update_todo", query: { todo_id: props.todo._id}}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Ayrıntılara Git
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </Link>
        </div>
      </div>
    </>
  )
}