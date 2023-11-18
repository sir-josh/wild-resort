import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout.js";

function CheckoutButton({ bookingId }) {
	const { isCheckingOut, checkout } = useCheckout();

	return (
		<Button
			$variation="primary"
			size="small"
			onClick={checkout}
			disabled={() => isCheckingOut(bookingId)}>
			Check out
		</Button>
	);
}

export default CheckoutButton;
