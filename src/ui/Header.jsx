import styled from "styled-components";
import UserAvatar from "../features/authentication/UserAvatar.jsx";
import HeaderMenu from "./HeaderMenu.jsx";

const StyledHeader = styled.header`
	background-color: var(--color-grey-0);
	padding: 1.2rem 4.8rem;
	border-bottom: 1px solid var(--color-grey-100);
`;

const Header = () => {
	return (
		<StyledHeader>
			<UserAvatar />
			<HeaderMenu />
		</StyledHeader>
	);
};

export default Header;
