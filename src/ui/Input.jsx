import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext.jsx";
import { forwardRef } from "react";

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

const Input = forwardRef(function Input(props, ref) {
	const { isDarkMode } = useDarkMode();

	return <StyledInput $colorDark={isDarkMode} {...props} ref={ref} />;
});

export default Input;
