import Row from "../ui/Row";
import Heading from "../ui/Heading";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm.jsx";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm.jsx";

function Account() {
	return (
		<>
			<Heading as="h1">Update your account</Heading>

			<Row>
				<Heading as="h3">Update user data</Heading>
				<UpdateUserDataForm />
			</Row>
			<hr />
			<Row>
				<Heading as="h3">Update password</Heading>
				<UpdatePasswordForm />
			</Row>
		</>
	);
}

export default Account;
