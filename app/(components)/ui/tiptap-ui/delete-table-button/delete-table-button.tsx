"use client"

import * as React from "react"
import { useDeleteTable } from "./use-delete-table"
import type { ButtonProps } from "@/app/(components)/ui/tiptap-ui-primitive/button"
import { Button } from "@/app/(components)/ui/tiptap-ui-primitive/button"

export interface DeleteTableButtonProps extends Omit<ButtonProps, "type"> {
  text?: string
  editor?: any
}

export const DeleteTableButton = React.forwardRef<HTMLButtonElement, DeleteTableButtonProps>(
  ({ editor: providedEditor, text, onClick, children, ...buttonProps }: DeleteTableButtonProps, ref) => {
    const { isVisible, canDelete, handleDelete, label, Icon } = useDeleteTable({ editor: providedEditor })

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleDelete()
      },
      [handleDelete, onClick]
    )

    if (!isVisible) return null

    return (
      <Button
        type="button"
        data-style="ghost"
        role="button"
        tabIndex={-1}
        disabled={!canDelete}
        data-disabled={!canDelete}
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

DeleteTableButton.displayName = "DeleteTableButton"
