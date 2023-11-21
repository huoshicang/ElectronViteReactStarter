import {LogoutOutlined,} from '@ant-design/icons';
import {PageContainer, ProCard, ProLayout,} from '@ant-design/pro-components';
import {Button, Dropdown} from 'antd';
import React, {useEffect, useState} from 'react';
import {defaultSettings} from "@/default/defaultSettings";
import {Link, useNavigate} from "react-router-dom";
import {Welcome} from "@/pages/Welcome";
import defaultProps from "@/default/defaultProps";
import {connect} from "dva";


const Layout = (props: any) => {

  const {dispatch} = props;

  // 第一次进来的时候，默认是欢迎页
  const [pathname, setPathname] = useState<string>('/welcome');

  // 标题
  const [ContainerTitle, setContainerTitle] = useState<string | undefined>('');

  // 内容
  const [element, setElement] = useState<React.ReactNode>(<Welcome/>);

  // 导航
  const navigate = useNavigate()

  //
  useEffect((): void => {
    navigate(pathname)
  }, [])

  const logOut = () => {
    dispatch({
      type: 'base/updateName',
      payload: null
    })

    navigate('/log')
  }

  return (
    <div style={{height: '100vh', overflow: 'auto',}}>
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '七妮妮',
          render: (_props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'logout',
                      icon: <LogoutOutlined/>,
                      label: (<Button onClick={logOut}>退出登录</Button>),
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}

        menuItemRender={(item, dom) => (
          <div onClick={(): void => {
            setPathname(item.path || '/');
            setContainerTitle(defaultProps.route.title ? item.name : "");
            setElement(item.component.type)
            navigate(item.path as string);
          }}>
            {dom}
          </div>
        )}
        {...defaultSettings}>
        <PageContainer header={{
          title: ContainerTitle,
          breadcrumb: {},
        }}>
          <ProCard>
            {element}
          </ProCard>
        </PageContainer>

      </ProLayout>
    </div>
  );
};

const mapStateToProps = (params: any) => {
  return {
    state: params.base
  };
};

// 使用 connect 将组件连接到 Redux
const ConnectedApp = connect(mapStateToProps)(Layout);

// 使用 export 导出连接后的组件
export {ConnectedApp as Layout};

