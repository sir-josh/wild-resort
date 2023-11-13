import styled from "styled-components";
import { HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useDeleteBooking } from "./useDeleteBooking.js";
import { useBookingDetail } from "./useBookingDetail.js";
import { useCheckout } from "../check-in-out/useCheckout.js";

import Tag from "../../ui/Tag";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal.jsx";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner.jsx";
import ButtonText from "../../ui/ButtonText";
import BookingDataBox from "./BookingDataBox";
import ButtonGroup from "../../ui/ButtonGroup";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const navigate = useNavigate();
	const moveBack = useMoveBack();
	const { booking, isLoading } = useBookingDetail();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	if (isLoading) return <Spinner />;

	const { status, id: bookingId } = booking;

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>
						{status.replace("-", " ")}
					</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === "unconfirmed" && (
					<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
						Check in
					</Button>
				)}
				{status === "checked-in" && (
					<Button
						icon={<HiArrowUpOnSquare />}
						disabled={isCheckingOut}
						onClick={() => checkout(bookingId)}>
						Check out
					</Button>
				)}
				<Modal>
					<Modal.Open opens="deleteBooking">
						<Button
							$variation="danger"
							icon={<HiTrash />}
							disabled={isDeleting}>
							Delete booking
						</Button>
					</Modal.Open>

					<Modal.Window name="deleteBooking">
						<ConfirmDelete
							resourceName={`Booking #${bookingId}`}
							onConfirm={() =>
								deleteBooking(bookingId, {
									//onSettled happens whether is onSuccess
									// or onError
									onSettled: navigate(-1),
								})
							}
						/>
					</Modal.Window>
				</Modal>
				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;
