const SignUp = () => {
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
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Name
                </label>
                <input placeholder="Enter Name" name="name" type="text" />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <input placeholder="Enter Email" name="email" type="email" />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  placeholder="Enter Phone Number"
                  name="phone"
                  type="number"
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
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[10px] w-[93%] justify-between flex items-center gap-[10px]">
          <button
            type="button"
            className="text-sm/6 font-semibold text-gray-900 bg-[#705e46] w-[100%]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-sm/6 font-semibold text-gray-900 bg-[#705e46] w-[100%]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
