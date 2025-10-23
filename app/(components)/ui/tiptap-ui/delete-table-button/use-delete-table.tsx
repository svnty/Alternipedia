"use client"

import * as React from "react"
import { useTiptapEditor } from "@/app/(components)/hooks/use-tiptap-editor"

export interface UseDeleteTableConfig {
  editor?: any
  hideWhenUnavailable?: boolean
  onDeleted?: () => void
}

export function useDeleteTable({ editor: providedEditor }: UseDeleteTableConfig) {
  const { editor } = useTiptapEditor(providedEditor)

  const isVisible = Boolean(editor)

  const canDelete = Boolean(editor && editor.isEditable && editor.can().deleteTable())

  const handleDelete = React.useCallback(() => {
    if (!editor) return
    try {
      editor.chain().focus().deleteTable().run()
    } catch (e) {
      console.error('delete table failed', e)
    }
  }, [editor])

  const label = "Delete table"

  const Icon = () => (
    <svg className="tiptap-button-icon" viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden>
      <path d="M6 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 7v10a1 1 0 001 1h4a1 1 0 001-1V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10 11v4M14 11v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
  

  return {
    isVisible,
    canDelete,
    handleDelete,
    label,
    Icon,
  }
}
