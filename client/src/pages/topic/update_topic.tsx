import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_TOPIC } from '@/modules/resolvers/topicResolvers';
import UpdateTopicComponent from '@/components/Topic/UpdateTopicComponent';

export default function UpdateTopic(props: any){
  const router = useRouter()
  const { data:topicData, loading: topicLoading, error: topicError } = useQuery(GET_TOPIC, {
    variables: {
      input: {
        _id: router?.query.topic_id
      }
    }
  })


  if(topicLoading) return <div>Bekleyiniz</div>
  if(topicError) return <div>Error</div>
  return(
    <>
    {
      topicData?.getTopic ?
      <UpdateTopicComponent topic={topicData?.getTopic} />
      : <div className='text-red-700'> Konu bulunamadı !</div>
    }
    </>
  )
}