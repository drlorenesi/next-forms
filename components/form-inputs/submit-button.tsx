"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ButtonProps } from "@/components/ui/button";

interface SubmitButtonProps extends ButtonProps {
  isSubmitting: boolean;
  submittingText?: string;
  defaultText: string;
}

export function SubmitButton({
  isSubmitting,
  defaultText,
  submittingText = defaultText,
  className = "",
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className={className}
      disabled={isSubmitting}
      {...props}
    >
      <span className="flex items-center justify-center space-x-2">
        {isSubmitting && <LoaderCircle className="animate-spin h-4 w-4" />}
        <span>{isSubmitting ? submittingText : defaultText}</span>
      </span>
    </Button>
  );
}
