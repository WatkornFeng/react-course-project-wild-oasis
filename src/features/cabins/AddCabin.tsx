import Button from "../../ui/Button";

import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>

        {/* <Modal.Open opens="Table">
          <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window name="Table">
          <CabinTable />
        </Modal.Window> */}
      </Modal>
    </div>
  );
}
