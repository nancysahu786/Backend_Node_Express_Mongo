import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleFieldChange = (fields) => (e) => {
    const value = e.target.value;
    setUserData((previousData) => ({
      ...previousData,
      [fields]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/user", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("user data", data);
        navigate("/login");
      })
      .catch((error) => {
        window.alert(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="flex flex-col justify-center items-center  w-[420px] bg-[#422701] rounded-[12px] p-[25px] shadow-[0_4px_20px_rgba(16,1,1,0.9)]">
        <div className="space-y-12 flex w-[390px] items-center justify-center bg-[#705e46] rounded-[12px] py-[25px]">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-1000 text-center">
              SIGN UP
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 input-sty">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
                <input
                  placeholder="Enter Name"
                  type="text"
                  id="name"
                  onChange={handleFieldChange("name")}
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  placeholder="Enter Email"
                  name="email"
                  type="email"
                  onChange={handleFieldChange("email")}
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="phone"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  placeholder="Enter Phone Number"
                  name="phone"
                  type="number"
                  onChange={handleFieldChange("phone")}
                />
              </div>
              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <input
                  placeholder="Enter Password"
                  name="password"
                  type="password"
                  onChange={handleFieldChange("password")}
                />
              </div>
              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Confirm Password
                </label>
                <input
                  placeholder="Enter Confirm Password"
                  name="confirmPassword"
                  type="password"
                  onChange={handleFieldChange("confirmPassword")}
                />
                {userData.confirmPassword !== userData.password && (
                  <div className="text-[red]">
                    Password and confirmPassword is not same
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[10px] w-[93%] justify-between flex items-center gap-[10px]">
          <button
            type="submit"
            className="text-sm/6 font-semibold text-gray-900 bg-[#705e46] w-[100%] disabled: bg-[gray]"
            disabled={
              !userData.name ||
              !userData.email ||
              !userData.phone ||
              !userData.password ||
              !userData.confirmPassword
            }
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
