import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Productitem = () => {
  const [bottom, setBottom] = useState("bottomRight");
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

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
        return <span>{row.itemType.name}</span>;
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
      dataIndex: "actionDate",
      key: "actionDate",
      render: (item, row) => {
        return (
          <div className="flex flex-col items-start justify-start gap-1">
            <span>{item.slice(0, 10)}</span>
            <span>{item.slice(11, 16)}</span>
          </div>
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
        const response = await axios.get(`/transactions`);
        setData(response.data.data);
        // console.log(response.data.data);
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

export default Productitem;
