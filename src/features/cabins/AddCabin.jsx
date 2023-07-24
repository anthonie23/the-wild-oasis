import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="form-cabin">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.Window name="form-cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );

  //   const [showForm, setShowForm] = useState(false);
  //   return (
  //     <>
  //       <Button onClick={() => setShowForm((prev) => !prev)}>
  //         Add new Cabin
  //       </Button>
  //       {showForm && (
  //         <Modal onCloseModal={() => setShowForm((prev) => !prev)}>
  //           <CreateCabinForm onCloseModal={() => setShowForm((prev) => !prev)} />
  //         </Modal>
  //       )}
  //     </>
  //   );
}

export default AddCabin;
