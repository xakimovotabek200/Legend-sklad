import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { news, hiri, contact, sumka } from "./icons/index";
import { Card } from "antd";

function Home() {
  const [data, setData] = useState({});
  const [statusData, setStatusData] = useState({
    itemCategories: 0,
    items: 0,
    materialCategories: 0,
    materials: 0,
  });

  async function getData() {
    try {
      const response = await axios.get("/home");
      setData(response.data);
      // console.log(response.data);
    } catch (error) {
      toast.error("Failed to fetch data. Please try again later.");
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Use the properties directly without the need for reduce
    setStatusData({
      itemCategories: data.itemCategories || 0,
      items: data.items || 0,
      materialCategories: data.materialCategories || 0,
      materials: data.materials || 0,
    });
  }, [data]);

  return (
    <div className="mx-auto mt-[8px] flex min-h-[840px] min-w-full max-w-screen-lg flex-col gap-8 rounded-lg bg-white shadow-2xl md:container md:mt-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid grid-cols-3 rounded-xl border bg-white p-2 shadow-md shadow-black/30 transition-all">
          <div className="col-span-2 flex flex-col gap-2">
            <h3 className="whitespace-nowrap text-lg font-semibold text-black/60">
              Item Categories
            </h3>
            <p className="text-2xl">{statusData.itemCategories}</p>
          </div>
          <div className="ml-auto max-w-full">
            <img src={news} alt="Icon" className="max-w-full" />
          </div>
        </div>
        <div className="grid grid-cols-3 rounded-xl border bg-white p-2 shadow-md shadow-black/30 transition-all">
          <div className="col-span-2 flex flex-col gap-2">
            <h3 className="whitespace-nowrap text-lg font-semibold text-black/60">
              Items
            </h3>
            <p className="text-2xl">{statusData.items}</p>
          </div>
          <div className="ml-auto max-w-full">
            <img src={hiri} alt="Icon" className="max-w-full" />
          </div>
        </div>
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="grid grid-cols-3 rounded-xl border bg-white p-2 shadow-md shadow-black/30 transition-all">
          <div className="col-span-2 flex flex-col gap-2">
            <h3 className="whitespace-nowrap text-lg font-semibold text-black/60">
              Material Categories
            </h3>
            <p className="text-2xl">{statusData.materialCategories}</p>
          </div>
          <div className="ml-auto max-w-full">
            <img src={contact} alt="Icon" className="max-w-full" />
          </div>
        </div>
        <div className="grid grid-cols-3 rounded-xl border bg-white p-2 shadow-md shadow-black/30 transition-all">
          <div className="col-span-2 flex flex-col gap-2">
            <h3 className="whitespace-nowrap text-lg font-semibold text-black/60">
              Materials
            </h3>
            <p className="text-2xl">{statusData.materials}</p>
          </div>
          <div className="ml-auto max-w-full">
            <img src={sumka} alt="Icon" className="max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
