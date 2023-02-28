import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../../modules/resolvers/projectsResolvers';
import { Card, Col, Row } from 'antd';
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
          <div className='p-2 border'>Sahibi: {project_data?.getProject.project_description}</div>
        </Col>
      </Row>
    </>
  )
}