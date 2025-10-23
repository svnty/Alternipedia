"use client"

import * as React from "react"
import { useAddColumn } from "./use-add-column"
import type { ButtonProps } from "@/app/(components)/ui/tiptap-ui-primitive/button"
import { Button } from "@/app/(components)/ui/tiptap-ui-primitive/button"

export interface AddColumnButtonProps extends Omit<ButtonProps, "type"> {
  text?: string
  editor?: any
}

export const AddColumnButton = React.forwardRef<HTMLButtonElement, AddColumnButtonProps>(
  ({ editor: providedEditor, text, onClick, children, ...buttonProps }: AddColumnButtonProps, ref) => {
    const { isVisible, canAdd, handleAddColumn, label, Icon } = useAddColumn({ editor: providedEditor })

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleAddColumn()
      },
      [handleAddColumn, onClick]
    )

    if (!isVisible) return null

    return (
      <Button
        type="button"
        data-style="ghost"
        role="button"
        tabIndex={-1}
        disabled={!canAdd}
        data-disabled={!canAdd}
        aria-label={label}
        aria-pressed={false}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon />
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </Button>
    )
  }
)

AddColumnButton.displayName = "AddColumnButton"
