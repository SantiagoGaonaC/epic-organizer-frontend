import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types";
import { AnyZodObject, z } from "zod";

interface Props {
  onSubmit: (data: any) => void;
  onError?: (data: FieldValues) => void;
  zodSchema: AnyZodObject;
  children: ReactNode;
}

const MyForm = ({ zodSchema, onSubmit, onError, children }: Props) => {
  type EntityType = z.infer<typeof zodSchema>;
  const methods = useForm<EntityType>({
    resolver: zodResolver(zodSchema),
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onError)}>{children}</form>
    </FormProvider>
  );
};

export default MyForm;
