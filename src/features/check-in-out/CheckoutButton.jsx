import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout.js";

function CheckoutButton({ bookingId }) {
	const { isCheckingOut, checkout } = useCheckout();

	return (
		<Button
			$variation="primary"
			$sizes="small"
			onClick={() => checkout(bookingId)}
			disabled={isCheckingOut}>
			Check out
		</Button>
	);
}

export default CheckoutButton;
