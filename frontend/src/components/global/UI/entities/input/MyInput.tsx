import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  fieldname: string;
  label: string;
  placeholder?: string;
  children?: ReactNode;
  className?: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyInput = ({
  fieldname,
  label,
  placeholder,
  children,
  className,
  type,
  onChange,
}: Props) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  return (
    <FormControl id={fieldname} isInvalid={!!errors[fieldname]}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type || "text"}
        placeholder={placeholder || label}
        {...register(fieldname)}
        className={className}
        onChange={onChange}
      />
      {children}
      <FormErrorMessage>
        {errors[fieldname]?.message as ReactNode}
      </FormErrorMessage>
    </FormControl>
  );
};

export default MyInput;
