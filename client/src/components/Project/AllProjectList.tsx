import { useQuery } from '@apollo/client';
import { GET_PROJECT, GET_STUFF_PROJECT, GET_OWNER_PROJECTS } from '../../modules/resolvers/projectsResolvers';
import { Button, Card, Col, Row, Tag } from 'antd';
import Link from 'next/link';
import { useContext } from 'react';
import AuthContext from '@/context/authContext';
import ProjectCards from './ProjectCards';
const { Meta } = Card;

export default function ProjectInfo(props: any) {
  const { user }: any = useContext(AuthContext)
  const { data: stuff_data, loading: stuff_loading, error: stuff_error } = useQuery(GET_STUFF_PROJECT, { variables: { input: { user_id: user._id } } })
  const { data: owner_data, loading: owner_loading, error: owner_error } = useQuery(GET_OWNER_PROJECTS, { variables: { input: { user_id: user._id } } })
  console.log(owner_data);

  if (stuff_loading || owner_loading) return <div>Bekleyiniz</div>
  if (stuff_error || owner_error) return <div>error</div>
  return (
    <>
      <h3 className='text-2xl'>Oluşturduğum Projeler</h3>
      <hr />
      <Row className='my-5 mx-1'>
        {owner_data && owner_data.getOwnerProject.map((p:any)=>{
          return <ProjectCards project={p} />
        })}
      </Row>
      <h3 className='text-2xl'>Katkı Sunduğum Projeler</h3>
      <hr />
      <Row className='my-5'>
      {stuff_data && stuff_data.getStuffProject.map((p:any)=>{
          return <ProjectCards project={p} />
        })}
      </Row>
    </>
  )
}