import styled from "styled-components";
import { useEffect } from "react";
import Spinner from "./Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser.js";

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate(); //this is only used inside a callback or useEffect

	// 1. Load the authenticated user
	const { isLoading, isAuthenticated } = useUser();

	// 2. If there is NO authenticated user, redirect to /login
	useEffect(
		function () {
			// While it is still loading, the user is not yet authenticated;
			// only redirect to login while it's no longer loading & user is
			// not authenticated
			if (!isAuthenticated && !isLoading) navigate("/login");
		},
		[isAuthenticated, isLoading, navigate],
	);

	// 3. While loading, show a full page spinner
	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	// 4. if there is a Auth user, render the app
	if (isAuthenticated) return children;
}

export default ProtectedRoute;
