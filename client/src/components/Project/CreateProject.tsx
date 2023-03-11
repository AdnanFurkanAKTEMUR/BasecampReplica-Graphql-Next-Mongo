import AuthContext from "@/context/authContext"
import { useContext, useState, useEffect } from "react"
import Link from "next/link";
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PROJECT } from '../../modules/resolvers/projectsResolvers';
import { Select, Tag } from "antd";
import { GET_STAFFS } from "@/modules/resolvers/userResolvers";
import Image from 'next/image'
import Router from 'next/router';


interface inputType {
  project_name: string,
  project_description: string,
}
interface selectType {
  stuff_ids: [string]
}

export default function CreateProjectComponent(props: any) {
  const { user }: any = useContext(AuthContext)

  const { data: allStuffData, loading: allStuffLoading, error: allStuffError } = useQuery(GET_STAFFS, {variables:{ input:{ user_id: user?._id}}})
  const [create_project, { data: createProjectData, loading: createProjectLoading, error: createProjectError }] = useMutation(CREATE_PROJECT)
  const [inputs, setInputs] = useState<inputType>({ project_name: "", project_description: "" })
  const [select, setSelect] = useState<selectType>({stuff_ids:[""]})
  
  useEffect(()=>{
    if(createProjectData){      
      Router.push({ pathname: "project_info", query: { project_id: createProjectData.createProject._id } });
    }
  }, [createProjectData])

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleChangeForSelect = (value: any) => {
    setSelect({stuff_ids: value})    
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await create_project({
      variables: {
        input: {
          owner_id: user._id,
          project_description: inputs.project_description,
          project_image: "null",
          project_name: inputs.project_name,
          stuff:select.stuff_ids
        }
      }
    })
  }
  if(allStuffLoading || createProjectLoading) return <div>Yükleniyor</div>
  if(allStuffError || createProjectError) return <div> bir hata gerçekleşti </div>
  return (
    <>
      <div className="w-full">
        <form className="sm:w-3/5 md:w-3/9 lg:w-3/9 xl:w-3/12" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="project_name" className="block mb-2 text-sm font-medium text-gray-900">Proje İsmi</label>
            <input onChange={handleChange} type="text" name="project_name" id="project_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="isim" required />
          </div>
          <div className="mb-6">
            <label htmlFor="project_description" className="block mb-2 text-sm font-medium text-gray-900">Proje Açıklaması</label>
            <input onChange={handleChange} type="text" name="project_description" id="project_description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="açıklama" required />
          </div>
          <div className="mb-6">
            <label htmlFor="users" className="block mb-2 text-sm font-medium text-gray-900">Kullanıcı Ekle</label>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Kullanıcı Seçin"
              onChange={handleChangeForSelect}
              options={allStuffData?.getStuff.map((user:any) => {return {label:<><Image alt="example" src="https://source.unsplash.com/featured/20x20" className='rounded-full inline' width={20} height={20} /> {user.user_name}</>, value: user._id}})}
            />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Kaydet</button>
        </form>
      </div>
    </>
  )
}