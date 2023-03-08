import AuthContext from "@/context/authContext";
import { useContext, useState } from "react";
import { Button, Card, Col, Row, Table } from 'antd';
import ProjectsTable from "./ProjectsTable";
import Link from "next/link";

const { Meta } = Card;

const App = (props: any) => {
  const { user }: any = useContext(AuthContext)



  const btnClass = "text-gray-900 bg-white border border-gray-300 focus:outline-none text-center focus:ring-4 my-2 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
  return (
    <>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://source.unsplash.com/featured/300x401" />}
          >
            <Meta title={user.user_name} />
          </Card>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
          <div className="mb-1">
            <span>Kullanıcı İsmi:</span> <span className="text-green-600 font-bold">{user.user_name}</span>
          </div>
          <div className="mb-1">
            <span>Kullanıcı E-mail:</span> <span className="text-green-600 font-bold">{user.user_email}</span>
          </div>
          <div className="mb-1">
            <span>Kullanıcı Kayıt Tarihi:</span> <span className="text-green-600 font-bold">{new Date(parseInt(user.created_at)).toLocaleString("tr-TR")}</span>
          </div>
          <div className="my-5">
            <Link href={""} className={btnClass}>Bilgilerimi Düzenle</Link>
            <Link href={""} className={btnClass}>Şifre Değiştir</Link>
            <Link href={"project/create_project"} className={btnClass}>Proje Oluştur</Link>
          </div>
          <hr />
          <div className="overflow-auto">
            <ProjectsTable />
          </div>
        </Col>
      </Row>


    </>
  );
};

export default App;