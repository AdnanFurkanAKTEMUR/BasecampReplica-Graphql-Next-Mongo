import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import AuthContext from "@/context/authContext";
import { useLazyQuery, useQuery } from "@apollo/client";
import { CHECK_TOKEN, LOGOUT } from "@/modules/resolvers/userResolvers";
import { useRouter } from "next/navigation";
import SiderComp from "./Sider";
const { Header, Content, Footer, Sider } = Layout;


type User = {
  _id: string,
  username: string,
  usersurname: string,
  email: string,
  phone: string,
  role: string
}

const App: React.FC = (props: any) => {

  const { user }: any = useContext(AuthContext)
  const context = useContext(AuthContext)
  const [userState, setUserState] = useState<User>({ _id: "", username: "", usersurname: "", email: "", phone: "", role: "" })

  const [fetchUser, { data, loading, error }] = useLazyQuery(CHECK_TOKEN, { fetchPolicy: "no-cache" })

  const router = useRouter()
  useEffect(() => {
    if (user) {
      setUserState(user)
    } else {
      fetchUser()
    }
  }, [user])

  useEffect(() => {
    if (data?.checkToken) {
      context.login(data.checkToken)
    }
  }, [data])


  const { token: { colorBgContainer }, } = theme.useToken();
  if (loading) {
    return (
      <>
        <SiderComp />
      </>)
  }
  if (user) {
    return (
      <SiderComp user={user} children={props.children} />
    );
  } else {
    return (
      <>
        <SiderComp login={true} />
      </>

    );
  }
};

export default App;