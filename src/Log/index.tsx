import {LockOutlined, MobileOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText,} from '@ant-design/pro-components';
import {message, Tabs, TabsProps} from 'antd';
import React, {ReactElement, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {accountType, phoneType} from "@/Log/LoginType.type";
import {connect} from "dva";


type TabsType = 'phone' | 'account';

const Login = (props: any) => {

  const {dispatch} = props;

  // 默认tab
  const [loginType, setLoginType] = useState<TabsType>('account');

  // 加载动画
  const [loading, setLoading] = useState<boolean>(false);

  const items: TabsProps['items'] = [
    {
      key: 'account',
      label: '账号密码登录',
    },
    {
      key: 'phone',
      label: '手机号登录',
    },
  ];

  const navigate = useNavigate()

  /**
   * 完成登录
   * @param {accountType | phoneType} value - 表单值
   * @returns {void}
   */
  const onFinish = (value: accountType | phoneType): void => {
    setLoading(true)

    if (loginType === 'account') accountFinish(value as accountType)
    else if (loginType === 'phone') phoneFinish(value as phoneType)


    dispatch({
      type: 'base/updateName',
      payload: {
        gxyInfo: 1,
        phone: 15028122625,
        role: 'admin',
        token: 'admin',
        username: 'admin'
      }
    })

    setTimeout(() => {
      setLoading(false)
      navigate('/');
    }, 1000)
  }

  /**
   * 账号密码登录
   * @param {accountType} value - 账号密码
   * @returns {void}
   * @example
   */
  const accountFinish = (value: accountType): void => {
    console.log(value)
    console.log('账号密码登录')
  }

  /**
   * 手机号登录
   * @param {phoneType} value - 手机号
   * @returns {void}
   * @example
   */
  const phoneFinish = (value: phoneType): void => {
    console.log(value)
    console.log('手机号登录')
  }

  return (
    <LoginForm
      logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
      title="Github"
      subTitle="全球最大的代码托管平台"
      loading={loading}
      onFinish={
        async (values: accountType | phoneType) => {
          onFinish(values)
        }}>

      <Tabs centered activeKey={loginType} items={items}
            onChange={(activeKey) => setLoginType(activeKey as TabsType)}/>

      {loginType === 'account' && account()}
      {loginType === 'phone' && phone()}

      <div style={{marginBlockEnd: 24,}}>
        <ProFormCheckbox noStyle name="autoLogin">
          自动登录
        </ProFormCheckbox>
        <a style={{float: 'right',}}>
          忘记密码
        </a>
      </div>
    </LoginForm>
  );
};


/**
 * 账号密码登录
 * @returns {ReactElement} 返回值描述
 */
const account = (): ReactElement => {
  return (
    <>
      <ProFormText
        name="username"
        fieldProps={{size: 'large', prefix: <UserOutlined className={'prefixIcon'}/>,}}
        placeholder='用户名: admin or user'
        rules={[{
          required: true,
          message: '请输入用户名!',
        },]}/>
      <ProFormText.Password
        name="password"
        fieldProps={{size: 'large', prefix: <LockOutlined className={'prefixIcon'}/>,}}
        placeholder='密码: ant.design'
        rules={[{
          required: true,
          message: '请输入密码！',
        },]}/>
    </>
  )
}

/**
 * 手机号登录
 * @returns {ReactElement} 返回值描述
 */
const phone = (): ReactElement => {
  return (
    <>
      <ProFormText
        fieldProps={{size: 'large', prefix: <MobileOutlined className={'prefixIcon'}/>,}}
        name="mobile"
        placeholder='手机号'
        rules={[
          {
            required: true,
            message: '请输入手机号！',
          },
          {
            pattern: /^1\d{10}$/,
            message: '手机号格式错误！',
          },
        ]}/>
      <ProFormCaptcha
        fieldProps={{size: 'large', prefix: <LockOutlined className={'prefixIcon'}/>,}}
        captchaProps={{size: 'large',}}
        placeholder='请输入验证码'
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} 获取验证码`;
          }
          return '获取验证码';
        }}
        name="captcha"
        rules={[{
          required: true,
          message: '请输入验证码！',
        },]}
        onGetCaptcha={async () => {
          message.success('获取验证码成功！验证码为：1234');
        }}
      />
    </>
  )
}


const mapStateToProps = (params: any) => {
  return {
    state: params.base
  };
};


// 使用 connect 将组件连接到 Redux
const ConnectedApp = connect(mapStateToProps)(Login);

// 使用 export 导出连接后的组件
export {ConnectedApp as Login};
