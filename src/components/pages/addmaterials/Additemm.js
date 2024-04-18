import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal, Input } from "antd";

import { toast } from "react-toastify";

const Additemm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  // /material-categories

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const response = await axios.post("/material-categories", {
        name: inputValue,
      });

      // Check if the response status is 200
      if (response.status === 200) {
        // Show success toast
        toast.success("Data added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Fetch data after success
        fetchData();
      } else {
        // If status is not 200, show an error toast
        toast.error("Failed to add data. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error adding data:", error);
      // Show an error toast for any other errors
      toast.error("An error occurred. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
      });
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
      const response = await axios.get("/material-categories");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNavigation = (itemId) => {
    navigate(`/material/${itemId}`);
  };

  // const deleteData = async (id) => {
  //   try {
  //     await axios.delete(` /material-categories/${id}`);
  //     fetchData(); // Fetch data again after deletion to update the list
  //   } catch (error) {
  //     console.error("Error deleting data:", error);
  //   }
  // };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        className="bg-blue-700"
        onClick={showModal}
      >
        Qo'shish
      </Button>
      <Modal
        title="Add New Item"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ className: "bg-blue-500" }}
        onCancel={handleCancel}
      >
        Name:
        <Input
          placeholder="Enter name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {data.map((item, index) => (
          <a
            key={item.id}
            onClick={() => handleNavigation(item.id)}
            className="bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="p-4 leading-normal">
              <h5 className="flex justify-between mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <span> {item.name}</span>
                {/* <Button type="primary" danger onClick={() => deleteData(item.id)}><DeleteOutlined /></Button> */}
              </h5>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Additemm;
