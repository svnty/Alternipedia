"use client"

import * as React from "react"
import { useAddRow } from "./use-add-row"
import type { ButtonProps } from "@/app/(components)/ui/tiptap-ui-primitive/button"
import { Button } from "@/app/(components)/ui/tiptap-ui-primitive/button"

export interface AddRowButtonProps extends Omit<ButtonProps, "type"> {
  text?: string
  editor?: any
}

export const AddRowButton = React.forwardRef<HTMLButtonElement, AddRowButtonProps>(
  ({ editor: providedEditor, text, onClick, children, ...buttonProps }: AddRowButtonProps, ref) => {
    const { isVisible, canAdd, handleAddRow, label, Icon } = useAddRow({ editor: providedEditor })

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleAddRow()
      },
      [handleAddRow, onClick]
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

AddRowButton.displayName = "AddRowButton"
