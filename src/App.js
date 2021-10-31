import {
  ErrorMessage,
  FastField,
  FieldArray,
  Form,
  Formik,
  useFormik,
} from "formik";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import React, { useState } from "react";
import { Button, Input } from "antd";
import * as Yup from "yup";
import TextErrors from "./CustomFields/TextErrors";
import ErrorBoundary from "antd/lib/alert/ErrorBoundary";
// Cách 1 và 2
const validationSchema = Yup.object({
  // title: Yup.string().required("Required"),
  email: Yup.string()
    .email(<div style={{ color: "red" }}>Invalid email format</div>)
    .required("Required"),
  password: Yup.string().required("Required"),
});
// Cách 1 và 2
const onSubmit = (values, onSubmitProps) => {
  console.log(values);
  // thêm dòng này vào thì khi submit thành công các field sẽ tự động reset lại thành data của initial
  // onSubmitProps.resetForm();
};
// Cách 1 và 2
const initialValues = {
  title: "123",
  email: "",
  password: "",
  social: {
    fb: "",
  },
  gender: ["", ""],
  dynamicArray: [""],
};
const dataUpdate = {
  title: "Title ne",
  email: "Emailne@gmail.com",
  password: "123456",
  social: {
    fb: "fb",
  },
  gender: ["Male", ""],
  dynamicArray: ["dynamic1"],
};
// Thay vì sử dụng validation của Yup thì mình có thể tự validation từng cái theo cái required validation của mình
const validationTitle = (value) => {
  let error;
  if (!value) {
    error = "Required123";
  }
  return error;
};
function App() {
  const [formValues, setFormValues] = useState(null);
  // Cách 1
  const formik = useFormik({
    // initialValues: {
    //   title: "",
    //   password: "",
    //   email: "",
    // },
    // nhập đủ các form mới vào func submit
    // onSubmit: (values) => {
    //   console.log(values);
    // },
    // sử dụng yup
    // validationSchema,
    // validation chay
    // thiếu input nào thì vào func này
    // validate: (values) => {
    //   let errors = {};
    //   console.log(values);
    //   // trong đây có thể validation các value
    //   if (!values.title) {
    //     errors.title = "Chua nhap title";
    //   }
    //   if (!values.password) {
    //     errors.password = "Chua nhap password";
    //   }
    //   if (!values.email) {
    //     errors.email = "Chua nhap email";
    //   }
    //   return errors;
    // },
  });
  // console.log("Formik", formik.values);
  // console.log("Formik", formik.errors);
  // console.log("Formik", formik.touched);

  return (
    <Formik
      // Cách 2
      initialValues={formValues ? formValues : initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      //  dùng để set giá trị cho các field của form
      enableReinitialize
      // nếu dùng form thì mở 2 thằng dưới là false, nếu cần bắt validation từng input thì 2 thằng dưới là true
      validateOnChange={true}
      validateOnBlur={true}
    >
      {(formikProps) => {
        // do something here ...
        const { values, errors, touched, isSubmitting } = formikProps;
        console.log({ values, errors, touched });
        console.log(formikProps);
        return (
          // cách 1
          // <Form onSubmit={formik.handleSubmit}>
          // cách 2
          <Form>
            <FastField
              validate={validationTitle}
              name="title"
              // cách 1
              // onChange={formik.handleChange}
              // // click vào là bắt value
              // onBlur={formik.handleBlur}
              // value={formik.values.title}
              // 3 dòng trên = thằng này
              // {...formik.getFieldProps("title")}
            >
              {(props) => {
                console.log(props);
                const { field, form, meta } = props;
                return (
                  <div>
                    <FastField placeholder="Title" {...field} />
                    <ErrorMessage name="title" component={TextErrors} />
                    {/* {formik &&
            formik.touched &&
            formik.touched.title &&
            formik.errors &&
            formik.errors.title
              ? formik.errors.title
              : ""} */}
                  </div>
                );
              }}
            </FastField>
            <FastField
              name="email"
              // cách 1
              // onChange={formik.handleChange}
              // // click vào là bắt value
              // onBlur={formik.handleBlur}
              // value={formik.values.title}
              // 3 dòng trên = thằng này
              // {...formik.getFieldProps("title")}
            >
              {(props) => {
                const { field, form, meta } = props;
                return (
                  <div>
                    <FastField placeholder="Email" {...field} />
                    <ErrorMessage name="email" component={TextErrors} />
                    {/* {formik &&
            formik.touched &&
            formik.touched.email &&
            formik.errors &&
            formik.errors.email
              ? formik.errors.email
              : ""} */}
                  </div>
                );
              }}
            </FastField>
            <FastField
              name="password"
              // cách 1
              // onChange={formik.handleChange}
              // // click vào là bắt value
              // onBlur={formik.handleBlur}
              // value={formik.values.title}
              // 3 dòng trên = thằng này
              // {...formik.getFieldProps("title")}
            >
              {(props) => {
                const { field, form, meta } = props;
                return (
                  <div>
                    <Input.Password placeholder="Password" {...field} />
                    <ErrorMessage name="password" component={TextErrors} />
                    {/* {formik &&
            formik.touched &&
            formik.touched.password &&
            formik.errors &&
            formik.errors.password
              ? formik.errors.password
              : ""} */}
                  </div>
                );
              }}
            </FastField>
            <FastField
              name="social.fb"
              // cách 1
              // onChange={formik.handleChange}
              // // click vào là bắt value
              // onBlur={formik.handleBlur}
              // value={formik.values.title}
              // 3 dòng trên = thằng này
              // {...formik.getFieldProps("title")}
            >
              {(props) => {
                const { field, form, meta } = props;
                return (
                  <div>
                    <FastField placeholder="Facebook" {...field} />
                    <ErrorMessage name="social.fb" component={TextErrors} />
                    {/* {formik &&
            formik.touched &&
            formik.touched.password &&
            formik.errors &&
            formik.errors.password
              ? formik.errors.password
              : ""} */}
                  </div>
                );
              }}
            </FastField>
            <FastField
              name="gender[0]"
              // cách 1
              // onChange={formik.handleChange}
              // // click vào là bắt value
              // onBlur={formik.handleBlur}
              // value={formik.values.title}
              // 3 dòng trên = thằng này
              // {...formik.getFieldProps("title")}
            >
              {(props) => {
                const { field, form, meta } = props;
                return (
                  <div>
                    <FastField placeholder="Gender" {...field} />
                    <ErrorMessage name="gender[0]" component={TextErrors} />
                    {/* {formik &&
            formik.touched &&
            formik.touched.password &&
            formik.errors &&
            formik.errors.password
              ? formik.errors.password
              : ""} */}
                  </div>
                );
              }}
            </FastField>
            <FieldArray
              name="dynamicArray"
              // cách 1
              // onChange={formik.handleChange}
              // // click vào là bắt value
              // onBlur={formik.handleBlur}
              // value={formik.values.title}
              // 3 dòng trên = thằng này
              // {...formik.getFieldProps("title")}
            >
              {(props) => {
                // console.log(props)
                const { push, remove, form } = props;

                const { values } = form;
                const { dynamicArray } = values;
                return (
                  <div>
                    {dynamicArray.map((values, index) => {
                      if (dynamicArray.length > 1) {
                        return (
                          <div key={index}>
                            <FastField name={`dynamicArray[${index}]`} />
                            <Button
                              type="primary"
                              onClick={() => remove(index)}
                            >
                              -
                            </Button>
                            <Button type="primary" onClick={() => push("")}>
                              +
                            </Button>
                          </div>
                        );
                      } else {
                        return (
                          <div key={index}>
                            <FastField name={`dynamicArray[${index}]`} />
                            {/* <Button type="primary" onClick={() => remove(index)}>-</Button> */}
                            <Button type="primary" onClick={() => push("")}>
                              +
                            </Button>
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              }}
            </FieldArray>
            <button type="submit">Submit</button>
            {/* dùng để set giá trị cho các field của form */}
            <button type="button" onClick={() => setFormValues(dataUpdate)}>
              Load saved data
            </button>
            <button type="reset">Reset</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default App;
