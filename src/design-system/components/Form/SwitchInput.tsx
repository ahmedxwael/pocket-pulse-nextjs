import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { BaseInputProps } from "./BaseInput";

type SwitchInputProps = BaseInputProps;

export function SwitchInput(props: SwitchInputProps) {
  return (
    <div className="flex items-center w-full gap-2">
      <Input type="checkbox" {...props} className="h-4 w-4" />
      <Label htmlFor={props.id} className="text-sm">
        {props.label}{" "}
        {props.required && <span className="text-destructive">*</span>}
      </Label>
      {props.error && (
        <span className="text-destructive text-sm">{props.error}</span>
      )}
    </div>
  );
}
