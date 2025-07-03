import { useState } from "react";

const useForm = ({ onSubmit, initial_form_state }) => {
  const [form_state, setFormState] = useState(initial_form_state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit();
    setFormState(initial_form_state);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    const field_name = e.target.name;

    setFormState((prevFormState) => {
      return {
        ...prevFormState,
        [field_name]: value,
      };
    });
  };

  return {
    form_state,
    handleSubmit,
    handleChange,
  };
};
export default useForm;
