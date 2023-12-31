import styled from "styled-components";
import { HiTrash, HiPencil, HiSquare2Stack } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm.jsx";
import { useDeleteCabin } from "./useDeleteCabin.js";
import { formatCurrency } from "../../utils/helpers.js";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import useCreateCabin from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	const { isDeleting, deleteCabin } = useDeleteCabin();
	const { createCabin } = useCreateCabin();

	const {
		id: cabinId,
		name,
		image,
		maxCapacity,
		regularPrice,
		description,
		discount,
	} = cabin;

	function handleDuplicate() {
		createCabin({
			name: `Copy of ${name}`,
			image,
			maxCapacity,
			regularPrice,
			description,
			discount,
		});
	}

	return (
		<Table.Row>
			<Img src={image} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity}</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<Modal>
					{/* Cabin Action dropdown Menu (delete, edit, duplicate) */}
					<Menus.Menu>
						<Menus.Toggle id={cabinId} />

						{/* Begining of Menu List */}
						<Menus.List id={cabinId}>
							<Menus.Button
								icon={<HiSquare2Stack />}
								onClick={handleDuplicate}>
								Duplicate
							</Menus.Button>

							{/* Modal popup for editing a cabin in dropdown menu */}
							<Modal.Open opens="edit">
								<Menus.Button icon={<HiPencil />}>
									Edit
								</Menus.Button>
							</Modal.Open>

							{/* Modal popup for deleting a cabin in dropdown menu*/}
							<Modal.Open opens="delete">
								<Menus.Button icon={<HiTrash />}>
									Delete
								</Menus.Button>
							</Modal.Open>
						</Menus.List>
						{/* End of Menu List */}

						<Modal.Window name="edit">
							<CreateCabinForm cabinToEdit={cabin} />
						</Modal.Window>

						<Modal.Window name="delete">
							<ConfirmDelete
								disabled={isDeleting}
								resourceName="cabin"
								onConfirm={() => deleteCabin(cabinId)}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
}

export default CabinRow;
