import './index.css'
import {BrowserRouter} from "react-router-dom";
import {config} from "./default/configProvider";
import {App} from "./App";
import {ConfigProvider} from "antd";
import React from 'react';
import dva from 'dva';
import {base} from "@/dva";
//@ts-ignore
import { persistEnhancer } from 'dva-model-persist';
//@ts-ignore
import storage from 'dva-model-persist/lib/storage';

// 创建应用
const app = dva();

app.use({
  extraEnhancers: [
    persistEnhancer({
      key: 'model',
      storage
    })
  ],
});

// 注册 model
//@ts-ignore
app.model(base);


// 注册视图
app.router(() => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ConfigProvider theme={config}>
          <App/>
        </ConfigProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});

// 启动应用
app.start('#root');





