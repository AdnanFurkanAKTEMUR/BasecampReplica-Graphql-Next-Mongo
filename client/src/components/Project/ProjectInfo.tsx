import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../../modules/resolvers/projectsResolvers';
import { Button, Card, Col, Row, Tag } from 'antd';
import Link from 'next/link';
const { Meta } = Card;

export default function ProjectInfo(props: any) {

  const { data: project_data, loading: project_loading, error: project_error } = useQuery(GET_PROJECT, { variables: { input: { _id: props.project_id } } })


  if (project_loading) return <div>Bekleyiniz</div>
  if (project_error) return <div>error</div>
  return (
    <>
      <h3 className='font-bold text-2xl'>{project_data?.getProject.project_name}</h3>
      <hr />
      <Row className='mt-5'>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://source.unsplash.com/featured/300x401" />}
          >
            <Meta title={project_data?.getProject.project_name} />
          </Card>
        </Col>
        <Col  xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
          <div className='p-2 border'>Açıklama: {project_data?.getProject.project_description}</div>
          <div className='p-2 border'>Oluşturan: <Tag color='blue' className='ml-1'><img alt="example" src="https://source.unsplash.com/featured/20x20" className='rounded-full inline' /> {project_data?.getProject.owner_info.user_name}</Tag></div>
          <div className='p-2 border'>Alt projeleri: <Tag color='red'>Yok</Tag></div>
          <div className='p-2 border'>Katkıda Bulunanlar: {project_data?.getProject.stuffs?.map((stuff:any)=>{
            return <Tag color='green' className='ml-1'><img alt="example" src="https://source.unsplash.com/featured/20x20" className='rounded-full inline' /> { stuff.user_name }</Tag>
          })}</div>
          <div className='p-2 border'>Eklenme Tarihi: <Tag color='yellow'>{new Date(parseInt(project_data?.getProject.created_at)).toLocaleString("tr-TR")}</Tag></div>
          <div className='p-2 border'>Güncellenme Tarihi: <Tag color='yellow'>{new Date(parseInt(project_data?.getProject.updated_at)).toLocaleString("tr-TR")}</Tag></div>
          <div className=''>
            <Button><Link href="">Bilgileri Güncelle</Link></Button>
          </div>
        </Col>
      </Row>
    </>
  )
}