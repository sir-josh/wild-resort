import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick.js";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-custom);
	border-radius: var(--border-radius-md);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color-dark);
	backdrop-filter: blur(3px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: var(--color-grey-500);
	}
`;

const ModalContext = createContext();

function Modal({ children }) {
	const [modalName, setModalName] = useState("");

	//This close() handler:- sets the modal name back to nothing.
	const close = () => setModalName("");

	//Re-assigns <setModalName> function to "openModal" variable
	const openModal = setModalName;

	return (
		<ModalContext.Provider value={{ modalName, close, openModal }}>
			{children}
		</ModalContext.Provider>
	);
}

function OpenModalBtn({ children, opens: modalNameToOpen }) {
	const { openModal } = useContext(ModalContext);

	//Below, we want to add "openModal" state/prop to the children
	//element(eg. button), this is done using cloneElement() in react
	//[more from the react doc]. Here: the cloned Element will be in
	//form like this
	// <Children onClick={() => openModal(modalNameToOpen)}>
	//     {children element innerText}
	// <Children/>

	// return children;
	return cloneElement(children, {
		onClick: () => openModal(modalNameToOpen),
	});
}

// The modal window
function Window({ children, name }) {
	const { modalName, close } = useContext(ModalContext);
	const ref = useOutsideClick(close);

	if (name !== modalName) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body,
	);
}

Modal.Open = OpenModalBtn;
Modal.Window = Window;

export default Modal;
