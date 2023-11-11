import styled from "styled-components";

const StyledCheckbox = styled.div`
	display: flex;
	gap: 1.6rem;
	position: relative;

	& input[type="checkbox"] {
		height: 2.4rem;
		width: 2.4rem;
		outline-offset: 2px;
		transform-origin: 0;
		accent-color: var(--color-brand-600);
	}

	& input[type="checkbox"]:disabled {
		box-shadow: 0 0 3px var(--color-grey-900);
	}
	
	& input[type="checkbox"]:disabled + label:before {
		content: "✓";
		position: absolute;
		margin-left: -3.3rem;
		color: var(--backdrop-color-dark);
	}

	& label {
		flex: 1;

		display: flex;
		align-items: center;
		gap: 0.8rem;
	}
`;

function Checkbox({ checked, onChange, disabled = false, id, children }) {
	return (
		<StyledCheckbox>
			<input
				type="checkbox"
				id={id}
				checked={checked}
				onChange={onChange}
				disabled={disabled}
			/>
			<label htmlFor={!disabled ? id : ""}>{children}</label>
		</StyledCheckbox>
	);
}

export default Checkbox;
