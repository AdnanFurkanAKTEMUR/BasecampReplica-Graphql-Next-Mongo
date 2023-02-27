import AuthContext from "@/context/authContext";
import { Table } from "antd";
import { useContext } from "react";
import { GET_USER_PROJECTS } from '../../modules/resolvers/projectsResolvers';
import { useQuery } from "@apollo/client";


const App = (props: any) => {
  const { user }: any = useContext(AuthContext)
  const {data, loading, error } = useQuery(GET_USER_PROJECTS, { variables: { input: { user_id: user._id}}})
  
  
  const columns: any = [
    {
      title: "Resim",
      dataIndex: "project_image",
      key:"project_image",
    },
    {
      title: "İsmi",
      dataIndex: "project_name",
      key:"project_name",
    },
    {
      title: "Açıklama",
      dataIndex: "project_description",
      key:"project_description",
    },
    {
      title: "Ayrıntılar",
      dataIndex: "show_more",
      key:"show_more"
    }
  ]

  let tableData:any = [
    {
      project_name: 'John Brown',
      project_name2: 'New York No. 1 Lake Park',
    }
  ]
  if(data?.getUserProject){
    tableData = data?.getUserProject.map((d: any)=>{
      return { 
        project_name:d.project_name,
        project_image:d.porject_image,
        project_description: d.project_description,
        show_more: <button>merhaba</button>
      }
    })
  }
  if(loading) return <div>Bekleyiniz</div>
  if(error) return <div>Error</div>
  return (
    <>
    <h3 className="text-lg">Sahibi Olduğum Projeler</h3>
    { data?.getUserProject ? <Table columns={columns} dataSource={tableData} /> : ""}
    </>
  );
};

export default App;