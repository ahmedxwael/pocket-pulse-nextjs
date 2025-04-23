import { BaseInput, BaseInputProps } from "./BaseInput";

type EmailInputProps = BaseInputProps;

export function EmailInput(props: EmailInputProps) {
  return <BaseInput type="email" {...props} />;
}
