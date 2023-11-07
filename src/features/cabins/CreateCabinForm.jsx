import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow.jsx";
import useCreateCabin from "./useCreateCabin.js";
import useEditCabin from "./useEditCabin.js";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);
	const { isEditing, editCabin } = useEditCabin();
	const { isCreating, createCabin } = useCreateCabin();

	const isExecuting = isCreating || isEditing;

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	function onSubmit(data) {
		const image =
			typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, id: editId },
				{
					onSuccess: () => {
						reset();
						//If this form is used inside a Modal
						onCloseModal?.();
					},
				},
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: (data) => {
						// console.log(data);
						reset();
						//If this form is used inside a Modal
						onCloseModal?.();
					},
				},
			);
	}

	function onError(errors) {
		// console.log(errors);
		// Author decided to use Error handling from useForm() hook <react-hook-form>
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isExecuting}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isExecuting}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular price"
				error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isExecuting}
					{...register("regularPrice", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					defaultValue={0}
					disabled={isExecuting}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							Number(value) < Number(getValues().regularPrice) ||
							"Discount should be less than regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description on the website"
				error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession
							? false
							: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					$variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}>
					Cancel
				</Button>
				<Button disabled={isCreating}>
					{isEditSession ? "Edit cabin" : "Create new cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;

// {
// 	/* <FileInput
// id="image_url"
// accept="image/*"
// {...register("image_url", {
//   validate: (fileData) => {
//     if (typeof fileData === "string" || fileData?.length === 1)
//       return true;
//     return "File is required";
//   },
// })}
// />
// //////////////////////////////
// function onSubmit(data) {
//     let image =
//       typeof data.image === "object" && data.image.length > 0
//         ? data.image[0]
//         : cabinToEdit.image;

//     if (isEditSession) {
//       editCabin({ newCabinData: { ...data, image }, id: editId });
//     } else createCabin({ ...data, image });
//   }
// ///////////////////////////////////
// const { data, error } = await supabase
//     .from("cabins")
//     .select("*")
//     .order("created_at", { ascending: true });

// */
// }
