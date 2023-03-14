
export default function CreateTodoComponent(props: any) {
  const [inputs, setInputs] = useState<inputType>({ topic_description: "", topic_name: "" })

  const handleChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await createTopicFunc({
      variables: {
        input: {
          project_id: router?.query.project_id,
          topic_description: inputs.topic_description,
          topic_name: inputs.topic_name
        }
      }
    })
    router.back()// daha sonra topic_info sayfasına yönlendirecek
  }


  return (
    <>
      {
        router.isReady ?
          <div className="w-full">
            <form className="sm:w-3/5 md:w-3/9 lg:w-3/9 xl:w-3/12" onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="topic_name" className="block mb-2 text-sm font-medium text-gray-900">Konu İsmi</label>
                <input onChange={handleChange} type="text" name="topic_name" id="topic_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="isim" required />
              </div>
              <div className="mb-6">
                <label htmlFor="topic_description" className="block mb-2 text-sm font-medium text-gray-900">Konu Açıklaması</label>
                <input onChange={handleChange} type="text" name="topic_description" id="topic_description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="açıklama" required />
              </div>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Kaydet</button>
            </form>
          </div>
          : ""
      }
    </>
  )
}