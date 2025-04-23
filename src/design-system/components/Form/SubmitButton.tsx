"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Button } from "../ui/button";

type SubmitButtonProps = ComponentProps<"button"> & {
  loading?: boolean;
};

export function SubmitButton({
  loading,
  disabled,
  children,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading || disabled}
      className={cn("font-semibold", className)}
      {...props}>
      {loading ? "Loading..." : children || "Submit"}
    </Button>
  );
}
