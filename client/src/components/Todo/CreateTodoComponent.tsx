import AuthContext from "@/context/authContext"
import { GET_ALL_USERS } from "@/modules/resolvers/userResolvers"
import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import Router from 'next/router';
import { useContext, useEffect, useState } from "react"
import { CREATE_TODO } from '../../modules/resolvers/todoResolvers';
import Image from 'next/image'
import { Select } from "antd";


interface inputType {
  todo_name: string,
  todo_description: string
}
interface selectType {
  owner_ids: [string]
}


export default function CreateTodoComponent(props: any) {
  const router = useRouter()
  const { user }: any = useContext(AuthContext)
  const { data: allUsersData, loading: allUsersLoading, error: allUsersError } = useQuery(GET_ALL_USERS)
  const [create_todo, { data: createTodoData, loading: createTodoLoading, error: createTodoError }] = useMutation(CREATE_TODO)
  const [inputs, setInputs] = useState<inputType>({ todo_description: "", todo_name: "" })
  const [select, setSelect] = useState<selectType>({owner_ids:[""]})

  useEffect(()=>{
    if(createTodoData){      
      Router.push({ pathname: "todo_info", query: { project_id: createTodoData.createTodo._id } });
    }
  }, [createTodoData])
  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleChangeForSelect = (value: any) => {
    setSelect({owner_ids: value})
    console.log(select);
        
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await create_todo({
      variables: {
        input: {
          topic_id: router?.query.topic_id,
          todo_name: inputs.todo_name,
          todo_description: inputs.todo_description,
          owner_ids: select.owner_ids
        }
      }
    })
  }

  if(allUsersLoading || createTodoLoading) return <div>Bekleyiniz</div>
  if(allUsersError || createTodoError) return <div>Hata</div>
  return (
    <>
      {
        router.isReady ?
        <div className="w-full">
        <form className="sm:w-3/5 md:w-3/9 lg:w-3/9 xl:w-3/12" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="todo_name" className="block mb-2 text-sm font-medium text-gray-900">Todo İsmi</label>
            <input onChange={handleChange} type="text" name="todo_name" id="todo_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="isim" required />
          </div>
          <div className="mb-6">
            <label htmlFor="todo_description" className="block mb-2 text-sm font-medium text-gray-900">Todo Açıklaması</label>
            <input onChange={handleChange} type="text" name="todo_description" id="todo_description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="açıklama" required />
          </div>
          <div className="mb-6">
            <label htmlFor="users" className="block mb-2 text-sm font-medium text-gray-900">Kullanıcı Ekle</label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Kullanıcı Seçin"
              onChange={handleChangeForSelect}
              options={allUsersData?.getAllUsers.map((user:any) => {return {label:<><Image alt="example" src="https://source.unsplash.com/featured/20x20" className='rounded-full inline' width={20} height={20} /> {user.user_name}</>, value: user._id}})}
            />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Kaydet</button>
        </form>
      </div>
          : ""
      }
    </>
  )
}