import { useState } from "react";

const Admin = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div>
        <div>
          <div className="mt-2 flex flex-row mt-[16px] ml-[20px] gap-[10px]">
            <input
              id="price"
              name="price"
              type="text"
              placeholder="Search by theatre name"
              className="flex-[0.7] rounded-[10px] p-7 shadow-[0_4px_20px_rgba(16,1,1,0.9)] bg-[white] border-white-100"
            />
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded "
              onClick={openModal}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {/* ✅ Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-[black] bg-[white] ">
            <h2 className="text-xl font-bold mb-4">Add Theatre</h2>
            <p className="text-gray-600 mb-4">
              You can add a new theatre here.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <table className="table-auto text-left text-sm w-[92vw] px-4 py 6 rounded-[10px] mx-[20px] my-[20px] shadow-[0_4px_20px_rgba(16,1,1,0.9)] bg-[white] text-[black] p-[10px] ">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Job</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b">
            <td className="px-4 py-2">John</td>
            <td className="px-4 py-2">Engineer</td>
            <td className="px-4 py-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Admin;
