import { useState } from "react";

//La responsabilidad del el hook useForm es manejar la logica del
//formulario
const useForm = ({ onSubmit, initial_form_state }) => {
  //Logica del estado efecto lo que quieras manejar
  const [form_state, setFormState] = useState({initial_form_state});

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    const field_name = e.target.name;
    // console.log({ value, field_name });

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
