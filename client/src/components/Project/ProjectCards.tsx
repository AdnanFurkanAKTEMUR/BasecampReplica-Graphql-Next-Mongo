import { Button, Card, Tag } from 'antd';
import Image from 'next/image'
import Link from 'next/link';

const { Meta } = Card;

export default function OwnerProjectCards(props: any) {
  console.log(props.project);

  return (
    <>
      <span className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
        <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="https://source.unsplash.com/featured/300x401" alt="" width={300} height={401} />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{props.project.project_name}</h5>
          <p className="mb-3 font-normal text-gray-700">{props.project.project_description}</p>
          <p className='my-1'>Oluşturan: <Tag color='green'><Image src={"https://source.unsplash.com/featured/20x20"} className='rounded-full inline' alt='' width={20} height={20} /> {props.project.owner_info.user_name}</Tag></p>
          <p className='my-1'>Katkı Sunanlar: {props.project.stuffs?.map((stuff: any) => {
            return <Tag color='purple' className='ml-1'><Image alt="example" src="https://source.unsplash.com/featured/20x20" className='rounded-full inline' width={20} height={20} /> {stuff.user_name}</Tag>
          })}</p>
          <Link href={""} className="text-gray-900 bg-white border border-gray-300 focus:outline-none text-center focus:ring-4 my-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Projeye Git</Link>
        </div>
      </span>
    </>
  )
}