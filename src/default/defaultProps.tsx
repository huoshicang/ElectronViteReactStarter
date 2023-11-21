import {Welcome} from "@/pages/Welcome";
import {User} from "@/pages/User";

export default {
  route: {
    title: false,
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: '欢迎',
        component:  <Welcome/>,

      },
      {
        path: '/user',
        name: '用户',
        component: <User/>,
      },
      {
        path: '/sys',
        name: '系统',
        component: './sys',
      },
      {
        path: '/weekly',
        name: '周报',
        component: './weekly',
      },
      {
        path: '/month',
        name: '月报',
        component: './month',
      },
    ],
  },
  //默认位置
  location: {
    pathname: '/welcome',
  },
  appList: [],
};
