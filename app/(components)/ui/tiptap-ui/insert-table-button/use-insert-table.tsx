"use client"

import * as React from "react"
import { useTiptapEditor } from "@/app/(components)/hooks/use-tiptap-editor"

export interface UseInsertTableConfig {
  editor?: any
  hideWhenUnavailable?: boolean
  onInserted?: () => void
}

export function useInsertTable({ editor: providedEditor }: UseInsertTableConfig) {
  const { editor } = useTiptapEditor(providedEditor)

  const isVisible = Boolean(editor)

  const canInsert = Boolean(editor && editor.isEditable)

  const handleInsert = React.useCallback(() => {
    if (!editor) return
    // default table: 3x3 with header
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }, [editor])

  const label = "Insert table"

  const Icon = () => (
    <svg className="tiptap-button-icon" viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h18M9 4v16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )

  return {
    isVisible,
    canInsert,
    handleInsert,
    label,
    Icon,
  }
}
