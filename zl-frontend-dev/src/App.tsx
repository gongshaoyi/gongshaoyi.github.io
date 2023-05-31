import { useState } from "react";
import "./App.css";
import { Layout, Menu, Button, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MenuArray } from "./constant/menu";
import { ES6_1 } from "./components/ES6/ES6_1/ES6_1";

const COMP: { [x: string]: JSX.Element } = {
  ES6_1: <ES6_1 />,
};

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [comKey, setComKey] = useState<string>("ES6_1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onMenuChange = (item: { key: string }) => {
    setComKey(item.key);
  };

  return (
    <>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ height: "100%" }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={onMenuChange}
            items={MenuArray}
          />
        </Sider>
        <Layout style={{ height: "100%" }}>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "14px 8px",
              padding: 12,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {COMP[comKey]}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
