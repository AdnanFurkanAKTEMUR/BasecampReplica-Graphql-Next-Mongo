import { useMutation } from '@apollo/client';
import { UPDATE_TOPIC, DELETE_TOPIC } from '../../modules/resolvers/topicResolvers';
import { useState } from 'react';
import { useRouter } from "next/router"

interface inputType {
  topic_description: string,
  topic_name: string
}

export default function UpdateTopicComponent(props: any) {

  const router = useRouter()
  const [updateTopic, { data: topicData, loading: topicLoading, error: topicError }] = useMutation(UPDATE_TOPIC)
  const [inputs, setInputs] = useState<inputType>({
    topic_description: props.topic.topic_description, topic_name: props.topic.topic_name
  })

  const [deleteTopic, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_TOPIC)

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await updateTopic({
      variables: {
        input: {
          _id: props.topic._id,
          topic_description: inputs.topic_description,
          topic_name: inputs.topic_name
        }
      }
    })
    router.back()
  }

  return (
    <>
      <div className="w-full">
        <form className="sm:w-3/5 md:w-3/9 lg:w-3/9 xl:w-3/12" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="topic_name" className="block mb-2 text-sm font-medium text-gray-900">Konu İsmi</label>
            <input value={inputs?.topic_name} onChange={handleChange} type="text" name="topic_name" id="topic_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="isim" required />
          </div>
          <div className="mb-6">
            <label htmlFor="topic_description" className="block mb-2 text-sm font-medium text-gray-900">Konu Açıklaması</label>
            <input value={inputs?.topic_description} onChange={handleChange} type="text" name="topic_description" id="topic_description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="açıklama" required />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Kaydet</button>
          <button type="button" onClick={ async () => {
            await deleteTopic({
              variables: {
                input: {
                  _id: props.topic._id
                }
              }
            })
            router.back()
          }} className="ml-3 focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Konuyu sil</button>

        </form>
      </div>
    </>
  )
}