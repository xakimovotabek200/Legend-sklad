import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const url = "http://37.77.104.188:8080/api/v1/auth/authenticate";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          // You might need to add additional headers if required by your server, such as CSRF tokens.
        },
      });
      if (response.status >= 200 && response.status < 300) {
        const responseData = response.data;
        // Assuming responseData contains necessary information
        sessionStorage.setItem("token", responseData.access_token);
        sessionStorage.setItem("myId", responseData.id);
        sessionStorage.setItem("role", responseData.role);
        navigate("/");
        window.location.reload();
      } else {
        console.error(`Server returned an error: ${response.statusText}`);
      }
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error:", error);
      // Display a user-friendly error message using toast
      toast.error(`Tizimga kira olmadingiz‼️`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="flex w-[100%] h-[100vh]">
        <div className="bg-[#F5F5F5] md:w-[50%] hidden md:flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
            className="h-full"
            alt="Login background"
          />
        </div>
        <div className="w-full md:w-[50%] flex items-center">
          <div className="md:ml-28 w-full px-3 md:w-[440px] md:h-[406px]">
            <form
              onSubmit={onSubmit}
              autoComplete="off"
              className="flex flex-col"
            >
              <h1 className="text-neutral-800 text-5xl font-bold font-sans">
                Tizimga kirish
              </h1>

              <input
                className="md:w-[440px] h-[56px] pl-5 rounded-md border border-stone-300 mt-6"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
              />
              <input
                className="md:w-[440px] h-[56px] pl-5 rounded-md border border-stone-300 mt-6"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
              />
              <button
                type="submit"
                className="cursor-pointer md:w-[440px] h-[52px] bg-neutral-900 rounded-lg flex items-center justify-center text-white text-lg font-bold font-sans mt-6"
              >
                Kirish
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
