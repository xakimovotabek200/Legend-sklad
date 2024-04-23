import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Materials = () => {
  const [material, setMaterial] = useState([]);
  const [materialName, setMaterialName] = useState([]);

  const getStatus = (status) => {
    if (status === "added") {
      return (
        <div className="border-4 border-green-500 text-center rounded-full px-3 py-[1px]">
          Qo'shildi
        </div>
      );
    } else if (status === "subtracted") {
      return (
        <div className="border-4 border-red-500 text-center rounded-full px-3 py-[1px]">
          Ayrildi
        </div>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/material-transactions");
        setMaterial(response.data.data);
      } catch (error) {
        console.error("Error fetching data:");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataName = async () => {
      try {
        const response = await axios.get("/material-types");
        setMaterialName(response.data.data);
      } catch (error) {
        toast.error("Error fetching data:");
      }
    };
    fetchDataName();
  }, []);

  const columns = [
    {
      title: "CategoryId",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (item, row) => {
        return <p className="pl-2">{row?.categoryId}</p>;
      },
    },
    {
      title: "Name",
      dataIndex: "materialType",
      key: "materialType",
      render: (item, row) => {
        console.log(row);
        return (
          <span>
            {materialName?.map?.(
              (item) => item.id === row?.materialTypeId && item.name
            )}
          </span>
        );
      },
    },
    {
      title: "Admin",
      dataIndex: "userDto",
      key: "userDto",
      render: (item, row) => {
        return <span>{row?.userId}</span>;
      },
    },
    {
      title: "Miqdori",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Holati",
      key: "holati",
      dataIndex: "actionType",
      render: (status) => getStatus(status),
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
  ];

  return (
    <Table
      columns={columns}
      dataSource={material}
      pagination={false}
      rowKey="id"
    />
  );
};

export default Materials;
