import React, { useContext, useEffect, useState } from 'react';
import { Layout, Menu, theme, Tag } from 'antd';
import AuthContext from "@/context/authContext";
import { useLazyQuery, useQuery } from "@apollo/client";
import { CHECK_TOKEN, LOGOUT } from "@/modules/resolvers/userResolvers";
import SiderComp from "./Sider";
const { Header, Content, Footer, Sider } = Layout;


type User = {
  user_id: string,
  user_name: string,
  user_email: string,
  user_image: string,
}

type AppProps = {
  children: React.ReactNode; // type children
};

const App = (props: AppProps) => {

  const { user }: any = useContext(AuthContext)
  const context = useContext(AuthContext)
  const [userState, setUserState] = useState<User>({ user_id: "", user_name: "", user_email: "", user_image: "" })

  const [fetchUser, { data, loading, error }] = useLazyQuery(CHECK_TOKEN, { fetchPolicy: "no-cache" })

  useEffect(() => {
    if (user) {
      setUserState(user)
    } else {
      fetchUser()
    }
  }, [user])

  useEffect(() => {
    console.log(data);
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