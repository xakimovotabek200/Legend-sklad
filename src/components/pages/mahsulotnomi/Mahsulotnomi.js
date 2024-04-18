import React, { useEffect, useState } from "react";

import axios from "axios";
import { Button, Modal, Input, Form } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// import {
//   DeleteOutlined
// } from "@ant-design/icons";

const Mahsulotnomi = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const response = await axios.post("/material-types", {
        name: inputValue,
      });

      fetchData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/material-types");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`/material-types/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <Button
          type="primary"
          size="large"
          className="bg-blue-700"
          onClick={showModal}
        >
          Qo'shish
        </Button>
        {/* <Button
        type="danger"
        size="large"
        className="bg-red-700 text-white"
        
      >
        O'chirish
      </Button> */}
      </div>
      <Modal
        title="Add New Item"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ className: "bg-blue-500" }}
        onCancel={handleCancel}
      >
        <Form
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            label="Maxsulot Nomi"
            name="Input"
            rules={[
              {
                required: true,
                message: "Maxsulot nomini kiriting!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {data.map((item) => (
          <Link
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="p-4 leading-normal">
              <div className=" flex justify-between mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{item.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Mahsulotnomi;
