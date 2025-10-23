"use client"

import * as React from "react"
import { useTiptapEditor } from "@/app/(components)/hooks/use-tiptap-editor"

export interface UseAddRowConfig {
  editor?: any
}

export function useAddRow({ editor: providedEditor }: UseAddRowConfig) {
  const { editor } = useTiptapEditor(providedEditor)

  const isVisible = Boolean(editor)

  const canAdd = Boolean(editor && editor.isEditable && editor.can().addRowAfter())

  const handleAddRow = React.useCallback(() => {
    if (!editor) return
    try {
      editor.chain().focus().addRowAfter().run()
    } catch (e) {
      console.error('add row failed', e)
    }
  }, [editor])

  const label = "Add row after"

  const Icon = () => (
    <svg className="tiptap-button-icon" viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M12 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )

  return { isVisible, canAdd, handleAddRow, label, Icon }
}
