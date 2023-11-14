import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext.jsx";

const StyledInput = styled.input`
	border: 1px solid
		${(props) =>
			props.$colorDark
				? "var(--color-grey-200)"
				: "var(--color-grey-400)"};
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-sm);
	padding: 0.8rem 1.2rem;
	box-shadow: var(--shadow-sm);
`;

function Input() {
	const { isDarkMode } = useDarkMode();

	return <StyledInput $colorDark={isDarkMode} />;
}

export default Input;
