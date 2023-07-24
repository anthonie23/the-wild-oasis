import { useForm } from "react-hook-form";

import { createEditCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

// function CreateCabinForm({ cabinToEdit = {} }) {
//   const { id: editId, ...editValues } = cabinToEdit;
//   const isEditSession = Boolean(editId);
//   const { register, handleSubmit, reset, getValues, formState } = useForm({
//     defaultValues: isEditSession ? editValues : {},
//   });

//   const { errors } = formState;

//   const queryClient = useQueryClient();

//   const { isLoading: isCreating, mutate: createCabin } = useMutation({
//     mutationFn: createEditCabin,
//     onSuccess: () => {
//       toast.success("Cabin successfully created");
//       queryClient.invalidateQueries({
//         queryKey: ["cabins"],
//       });
//       reset();
//     },
//     onError: (err) => toast.error(err.message),
//   });

// const { isLoading: isEditing, mutate: EditCabin } = useMutation({
//   mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
//   onSuccess: () => {
//     toast.success("Cabin successfully edited");
//     queryClient.invalidateQueries({
//       queryKey: ["cabins"],
//     });
//     reset();
//   },
//   onError: (err) => toast.error(err.message),
// });

//   const isWorking = isCreating || isEditing;

//   function onSubmit(data) {
//     const image = typeof data.image === "string" ? data.image : data.image[0];
//     console.log(data);
//     console.log(image);

//     if (isEditSession) {
//       EditCabin({ newCabin: { ...data, image: image }, id: editId });
//     } else {
//       createCabin({ ...data, image: image });
//     }

//     // mutate({ ...data, image: data.image[0] });
//   }

//   function onError(errors) {
//     console.log(errors);
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit, onError)}>
//       <FormRow label="Cabin name" error={errors?.name?.message}>
//         <Input
//           type="text"
//           id="name"
//           {...register("name", {
//             required: "This field is required",
//           })}
//           disabled={isWorking}
//         />
//       </FormRow>

//       <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           id="maxCapacity"
//           {...register("maxCapacity", {
//             required: "This field is required",
//             min: {
//               value: 1,
//               message: "Capacity should be greater than 1",
//             },
//           })}
//           disabled={isWorking}
//         />
//       </FormRow>

//       <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           id="regularPrice"
//           {...register("regularPrice", {
//             required: "This field is required",
//             min: {
//               value: 100,
//               message: "Regular price should be greater than 100",
//             },
//           })}
//           disabled={isWorking}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           id="discount"
//           defaultValue={0}
//           {...register("discount", {
//             required: "This field is required",
//             validate: (value) =>
//               value <= +getValues().regularPrice ||
//               "Discount should be less than regular price",
//           })}
//           disabled={isWorking}
//         />
//       </FormRow>
//       <FormRow
//         label="Description for website"
//         error={errors?.description?.message}
//       >
//         <Textarea
//           type="number"
//           id="description"
//           defaultValue=""
//           {...register("description", {
//             required: "This field is required",
//           })}
//           disabled={isWorking}
//         />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         <FileInput
//           id="image"
//           accept="image/*"
//           type="file"
//           {...register("image", {
//             required: isEditSession ? false : "This field is required",
//           })}
//           disabled={isWorking}
//         />
//       </FormRow>

//       <FormRow>
//         {/* type is an HTML attribute! */}
//         <Button variation="secondary" type="reset">
//           Cancel
//         </Button>
//         <Button disabled={isWorking}>
//           {isEditSession ? "Edit Cabin" : "Create Cabin"}
//         </Button>
//       </FormRow>
//     </Form>
//   );
// }
function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isEditing || isCreating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabin: { ...data, image: image }, id: editId },
        {
          onSuccess: (data) => {
            console.log(data);
            onCloseModal?.();
            reset();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            console.log(data);
            onCloseModal?.();
            reset();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be greater than 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 100,
              message: "Regular price should be greater than 100",
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= +getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
