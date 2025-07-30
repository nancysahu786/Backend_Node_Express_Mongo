import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Admin = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

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

      <MyVerticallyCenteredModal show={open} onHide={() => setOpen(false)} />
    </>
  );
};

export default Admin;
