"use client"

import * as React from "react"
import { useTiptapEditor } from "@/app/(components)/hooks/use-tiptap-editor"

export interface UseAddColumnConfig {
  editor?: any
}

export function useAddColumn({ editor: providedEditor }: UseAddColumnConfig) {
  const { editor } = useTiptapEditor(providedEditor)

  const isVisible = Boolean(editor)

  const canAdd = Boolean(editor && editor.isEditable && editor.can().addColumnAfter())

  const handleAddColumn = React.useCallback(() => {
    if (!editor) return
    try {
      editor.chain().focus().addColumnAfter().run()
    } catch (e) {
      console.error('add column failed', e)
    }
  }, [editor])

  const label = "Add column after"

  const Icon = () => (
    <svg className="tiptap-button-icon" viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden>
      <path d="M4 5v14M12 5v14M20 5v14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )

  return { isVisible, canAdd, handleAddColumn, label, Icon }
}
