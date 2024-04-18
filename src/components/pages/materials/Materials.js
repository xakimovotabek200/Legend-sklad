import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";

const Materials = () => {
  const [material, setMaterial] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/material-transactions"); // Replace YOUR_BASE_URL with the appropriate URL
        setMaterial(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (item, row) => {
        // console.log(row);
        return <span>{row?.category?.name}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "materialType",
      key: "materialType",
      render: (item, row) => {
        // console.log(row);
        return <span>{row?.materialType?.name}</span>;
      },
    },
    {
      title: "Sanasi",
      dataIndex: "actionDate",
      key: "actionDate",
      render: (item, row) => {
        return (
          <span>
            {row?.actionDate.slice(0, 10) + ", " + row.actionDate.slice(11, 16)}
          </span>
        );
      },
    },
    {
      title: "Admin",
      dataIndex: "userDto",
      key: "userDto",
      render: (item, row) => {
        // console.log(row);
        return <span>{row?.userDto?.username}</span>;
      },
    },
    {
      title: "Holati",
      key: "holati",
      dataIndex: "actionType",
    },
    {
      title: "Miqdori",
      key: "quantity",
      dataIndex: "quantity",
    },
  ];

  return <Table columns={columns} dataSource={material} pagination={false} />;
};

export default Materials;
