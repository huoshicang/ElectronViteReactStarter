import {Navigate, useRoutes} from 'react-router-dom'
import {Login} from "./Log";
import {Layout} from "./Layout";
import React from "react";


import {connect} from "dva";


const App = (props: any) => {

  const {state} = props;


  // 路由信息
  const element: React.ReactElement | null = useRoutes([
    {
      path: '/*',
      element: state.userData ? <Layout/> : <Navigate to="/log"/>
    },
    {
      path: '/log',
      element: <Login/>,
    }
  ])

  return (
    <>
      {element}
    </>
  );
};


const mapStateToProps = (params: any) => {

  return {
    state: params.base
  };
};


// 使用 connect 将组件连接到 Redux
const ConnectedApp = connect(mapStateToProps)(App);

// 使用 export 导出连接后的组件
export { ConnectedApp as App };
