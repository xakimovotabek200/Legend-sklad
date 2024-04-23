import {
  DropboxOutlined,
  EditOutlined,
  FileAddOutlined,
  FolderAddOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, message, Popconfirm } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { Sider } = Layout;

  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "admins",
      icon: <UserOutlined />,
      label: "Admins",
    },
    {
      key: "materials",
      icon: <FolderOpenOutlined />,
      label: "Materials",
    },
    {
      key: "product",
      icon: <DropboxOutlined />,
      label: "Products",
    },
    {
      icon: <EditOutlined />,
      label: "Qo'shish",
      children: [
        {
          key: "addmaterials",
          icon: <FileAddOutlined />,
          label: "Materials",
        },
        {
          key: "mahsulotnomi",
          icon: <PlusOutlined />,
          label: "Mahsulot Turi",
        },
        {
          key: "addproducts",
          icon: <FolderAddOutlined />,
          label: "AddProducts Category",
        },
        {
          key: "productmahsulot",
          icon: <PlusOutlined />,
          label: "Product item-type",
        },
      ],
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: (
        <Popconfirm
          title="Profildan chiqish"
          description="Profildan chiqishni xoxlaysizmi?"
          onConfirm={() => sessionStorage.removeItem("token")}
          onCancel={() => message.error("Profildan chiqilmadi")}
          okText="Ha"
          okButtonProps={{ className: "bg-blue-500" }}
          cancelText="yoq"
        >
          <a className="w-full">Log out</a>
        </Popconfirm>
      ),
    },
  ];

  const navigate = useNavigate();

  return (
    <div>
      <Sider style={{ height: "100vh" }} breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[window.location.pathname.replace("/", "")]}
          mode="inline"
          onClick={(item) => navigate(item.key)}
          items={items}
        />
      </Sider>
    </div>
  );
}

export default Sidebar;
