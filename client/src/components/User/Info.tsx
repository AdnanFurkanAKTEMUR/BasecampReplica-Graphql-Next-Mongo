import AuthContext from "@/context/authContext";
import { useContext, useState } from "react";
import { Card, Col, Row, Table } from 'antd';
import ProjectsTable from "./ProjectsTable";
const { Meta } = Card;

const App = (props: any) => {
  const { user }: any = useContext(AuthContext)
  
  return (
    <>
      <Row>
        <Col span={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Meta title={user.user_name} />
          </Card>
        </Col>
        <Col span={10}>
          <div>
            <span>Kullanıcı İsmi:</span> <span className="text-green-600 font-bold">{user.user_name}</span>
          </div>
          <div>
            <span>Kullanıcı E-mail:</span> <span className="text-green-600 font-bold">{user.user_email}</span>
          </div>
          <div>
            <span>Kullanıcı Kayıt Tarihi:</span> <span className="text-green-600 font-bold">{new Date(parseInt(user.created_at)).toLocaleString("tr-TR")}</span>
          </div>
          <ProjectsTable />
        </Col>
      </Row>

    </>
  );
};

export default App;