import { BaseInput, BaseInputProps } from "./BaseInput";

type IntegerInputProps = BaseInputProps;
export function IntegerInput(props: IntegerInputProps) {
  return <BaseInput type="number" {...props} />;
}
