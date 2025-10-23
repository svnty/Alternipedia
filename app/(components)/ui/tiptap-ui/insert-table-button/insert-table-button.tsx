"use client"

import * as React from "react"
import { useInsertTable } from "./use-insert-table"
import type { ButtonProps } from "@/app/(components)/ui/tiptap-ui-primitive/button"
import { Button } from "@/app/(components)/ui/tiptap-ui-primitive/button"

export interface InsertTableButtonProps extends Omit<ButtonProps, "type"> {
  text?: string
  editor?: any
}

export const InsertTableButton = React.forwardRef<HTMLButtonElement, InsertTableButtonProps>(
  ({ editor: providedEditor, text, onClick, children, ...buttonProps }: InsertTableButtonProps, ref) => {
    const { isVisible, canInsert, handleInsert, label, Icon } = useInsertTable({ editor: providedEditor })

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleInsert()
      },
      [handleInsert, onClick]
    )

    if (!isVisible) return null

    return (
      <Button
        type="button"
        data-style="ghost"
        role="button"
        tabIndex={-1}
        disabled={!canInsert}
        data-disabled={!canInsert}
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

InsertTableButton.displayName = "InsertTableButton"
