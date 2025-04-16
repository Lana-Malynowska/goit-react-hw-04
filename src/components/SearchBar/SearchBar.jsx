import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    const trimmedQuery = values.query.trim();

    if (!trimmedQuery) {
      toast.error("Please enter your query");
      return;
    }

    onSubmit(trimmedQuery);
    actions.resetForm();
  };

  return (
    <header>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
