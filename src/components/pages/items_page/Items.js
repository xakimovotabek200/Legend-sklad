import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Items = () => {
  const [bottom, setBottom] = useState("bottomRight");
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const confirm = (e) => {
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    message.error("Click on No");
  };

  const columns = [
    {
      title: "N0",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
      render: (item, row) => {
        return <span>{row.materialCategory.name}</span>;
      },
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      render: (item, row) => {
        return <span>{row.admin.username}</span>;
      },
    },
    {
      title: "Vaqti",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item, row) => {
        return (
          <span>
            {row.createdAt.slice(0, 10) + ", " + row.createdAt.slice(11, 16)}
          </span>
        );
      },
    },

    {
      title: "Miqdori",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/material/category/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Orqaga</Button>

      <Table
        className="mt-5"
        columns={columns}
        rowKey={"id"}
        onChange={(page) => setCurrent(page.current)}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default Items;
