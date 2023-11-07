import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";

function CabinModal() {
	return (
		<Modal>
			<Modal.Open opens="cabin-form">
				<Button>Create new cabin</Button>
			</Modal.Open>
			<Modal.Window name="cabin-form">
				<CreateCabinForm />
			</Modal.Window>

            {/* <Modal.Open opens="table">
				<Button>Show table</Button>
			</Modal.Open>
			<Modal.Window name="table">
				<CabinTable />
			</Modal.Window> */}
		</Modal>
	);
}

export default CabinModal;
