import AuthContext from "@/context/authContext";
import { useContext, useState } from "react";
import { Button, Card, Col, Row, Table } from 'antd';
import ProjectsTable from "./ProjectsTable";
import Link from "next/link";

const { Meta } = Card;

const App = (props: any) => {
  const { user }: any = useContext(AuthContext)

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
          <div className="mb-5">
            <Button><Link href="">Bilgilerimi Düzenle</Link></Button>
            <Button><Link href="">Şifre Değiştir</Link></Button>
            <Button><Link href="">Proje Oluştur</Link></Button>
          </div>
          <div className="overflow-auto">
            <ProjectsTable />
          </div>
        </Col>
      </Row>


    </>
  );
};

export default App;