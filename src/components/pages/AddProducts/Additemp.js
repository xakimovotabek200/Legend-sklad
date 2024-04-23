import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteProdcts from "./DeleteProdcts";

const Additemm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const response = await axios.post("/material-categories", {
        name: inputValue,
      });

      if (response.status === 200) {
        toast.success("Data added successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchData();
      } else {
        toast.error("Failed to add data. Please try again later.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error adding data:", error);
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
    navigate(`/materials/${itemId}`);
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        className="bg-blue-700"
        onClick={showModal}
      >
        + Qo'shish
      </Button>
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
            label="Write New item name"
            name="Input"
            rules={[
              {
                required: true,
                message: "write input name!",
              },
            ]}
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="maxsulot nomini kriting"
            />
          </Form.Item>
        </Form>
      </Modal>
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {data.map((item, index) => (
          <div
            key={item.id}
            // onClick={() => handleNavigation(item.id)}
            className="bg-white border border-gray-200 rounded-lg shadow cursor-pointer md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="p-4 leading-normal">
              <h5 className="flex justify-between mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{item.name}</p>
                <DeleteProdcts id={item.id} fetchData={fetchData} />
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Additemm;
