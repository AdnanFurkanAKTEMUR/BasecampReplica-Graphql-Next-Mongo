import Image from 'next/image'
import Link from 'next/link';
import { AiOutlineEdit } from 'react-icons/ai';

export default function TopicCard(props: any) {

  return (
    <>
      <div className="max-w-sm bg-white rounded-lg shadow">
        <div className='flex justify-center'>
          <Link href={{ pathname: "topic/update_topic", query: { topic_id: props.topic._id } }}>
            Düzenle <AiOutlineEdit className='inline' />
          </Link>
        </div>
        <Link href="#">
          <Image className="rounded-t-lg w-full h-auto" src={"https://source.unsplash.com/featured/300x300"} alt="" width="0" height="0" sizes="100vw" />
        </Link>
        <div className="p-5">
          <Link href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{props.topic.topic_name}</h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700">{props.topic.topic_description}</p>
          <p className='mb-3 text-xs text-gray-400'><i>Oluşturulma Tarihi: {new Date(parseInt(props.topic.created_at)).toLocaleString("tr-TR")}</i></p>
          <p className='mb-3 text-xs text-gray-400'><i>Güncellenme Tarihi: {new Date(parseInt(props.topic.updated_at)).toLocaleString("tr-TR")}</i></p>
          <Link href={{pathname: "todo", query: { topic_id: props.topic._id}}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Yapılacaklar Listesine Git
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </Link>
        </div>
      </div>
    </>
  )
}