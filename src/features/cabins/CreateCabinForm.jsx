import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow.jsx";

function CreateCabinForm() {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm();
	const queryClient = useQueryClient();

	const { mutate, isLoading: isCreating } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			toast.success("Cabin created successfully");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	function onSubmit(data) {
		mutate({ ...data, image: data.image[0] });
	}

	function onError(errors) {
		// console.log(errors);
		// Author decided to use Error handling from useForm() hook <react-hook-form>
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
