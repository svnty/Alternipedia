"use client";

import React, { useState, useEffect } from "react";
import { buttonVariants } from "@/app/(components)/ui/button";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { busyLabel?: React.ReactNode };

const FormSubmitButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, busyLabel = "Saving...", className, disabled, onClick, type = "submit", ...props }, ref) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If parent sets disabled to true directly, reflect that
    useEffect(() => {
      if (disabled) setIsSubmitting(true);
    }, [disabled]);

    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ className }))}
        disabled={isSubmitting || disabled}
        aria-busy={isSubmitting}
        onClick={(e) => {
          // optimistic UI: disable immediately to avoid double submits
          setIsSubmitting(true);

          // ensure we trigger a native form submit even when this is a client
          // component. Some frameworks alter the default behaviour; calling
          // requestSubmit on the closest form element guarantees a submit.
          try {
            const el = e.currentTarget as HTMLElement | null;
            const form = el?.closest("form") as HTMLFormElement | null;
            if (form) {
              e.preventDefault();
              // requestSubmit preserves form validation and works like a real submit
              form.requestSubmit();
              return;
            }
          } catch (err) {
            // ignore and fall back to default behavior
          }

          if (typeof onClick === "function") onClick(e);
        }}
        {...props}
      >
        {isSubmitting ? busyLabel : children}
      </button>
    );
  }
);

FormSubmitButton.displayName = "FormSubmitButton";

export default FormSubmitButton;
