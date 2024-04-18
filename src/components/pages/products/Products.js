import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [material, setMaterial] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/transactions");
      setMaterial(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
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
      dataIndex: "itemType",
      key: "itemType",
      render: (item, row) => {
        // console.log(row);
        return <span>{row?.itemType?.name}</span>;
      },
    },
    {
      title: "Sanasi",
      dataIndex: "actionDate",
      key: "actionDate",
      render: (item, row) => {
        return (
          <span>
            {row?.actionDate?.slice(0, 10) +
              ", " +
              row.actionDate?.slice(11, 16)}
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

  return (
    <div>
      <Table
        className="mt-3"
        columns={columns}
        dataSource={material}
        pagination={false}
      />
    </div>
  );
};

export default Products;
