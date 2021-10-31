import { Input } from "antd";
import { useField } from "formik";

const InputFields = ({label, props, placeholder}) => {
 const [field, meta] = useField(props);
 console.log("field: ", field, "\nmeta: ", meta, "\nlabel: ", label, "\nplaceholder: ", placeholder)
  return (
    <div>
      <div>{label !== "" ? label : ""}</div>
      <Input
        placeholder={placeholder}
        {...field}

      />
    </div>
  );
};
export default InputFields;
