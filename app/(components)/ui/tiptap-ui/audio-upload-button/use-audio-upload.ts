"use client"

import * as React from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { type Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "@/app/(components)/hooks/use-tiptap-editor"
import { useIsMobile } from "@/app/(components)/hooks/use-mobile"

// --- Lib ---
import {
  isExtensionAvailable,
  isNodeTypeSelected,
} from "@/lib/tiptap-utils"

// --- Icons ---
import { AudioIcon } from "@/app/(components)/ui/tiptap-icons/audio-icon"

export const AUDIO_UPLOAD_SHORTCUT_KEY = "mod+shift+a"

/**
 * Configuration for the audio upload functionality
 */
export interface UseAudioUploadConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Whether the button should hide when insertion is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Callback function called after a successful audio insertion.
   */
  onInserted?: () => void
}

/**
 * Checks if audio can be inserted in the current editor state
 */
export function canInsertAudio(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (
    !isExtensionAvailable(editor, "audioUpload") ||
    isNodeTypeSelected(editor, ["audio"])
  )
    return false

  return editor.can().insertContent({ type: "audioUpload" })
}

/**
 * Checks if audio is currently active
 */
export function isAudioActive(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  return editor.isActive("audioUpload")
}

/**
 * Inserts an audio in the editor
 */
export function insertAudio(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (!canInsertAudio(editor)) return false

  try {
    return editor
      .chain()
      .focus()
      .insertContent({
        type: "audioUpload",
      })
      .run()
  } catch {
    return false
  }
}

/**
 * Determines if the audio button should be shown
 */
export function shouldShowAudioButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, "audioUpload")) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canInsertAudio(editor)
  }

  return true
}

/**
 * Custom hook that provides audio functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage - no params needed
 * function MySimpleAudioButton() {
 *   const { isVisible, handleAudio } = useAudio()
 *
 *   if (!isVisible) return null
 *
 *   return <button onClick={handleAudio}>Add Audio</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedAudioButton() {
 *   const { isVisible, handleAudio, label, isActive } = useAudio({
 *     editor: myEditor,
 *     hideWhenUnavailable: true,
 *     onInserted: () => console.log('Audio inserted!')
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       onClick={handleAudio}
 *       aria-pressed={isActive}
 *       aria-label={label}
 *     >
 *       Add Audio
 *     </MyButton>
 *   )
 * }
 * ```
 */
export function useAudioUpload(config?: UseAudioUploadConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onInserted,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = React.useState<boolean>(true)
  const canInsert = canInsertAudio(editor)
  const isActive = isAudioActive(editor)

  const handleAudio = React.useCallback(() => {
    if (!insertAudio(editor)) return

    onInserted?.()
  }, [editor, onInserted])

  React.useEffect(() => {
    setIsVisible(shouldShowAudioButton({ editor, hideWhenUnavailable }))
  }, [editor, hideWhenUnavailable])

  // Register keyboard shortcut
  useHotkeys(
    AUDIO_UPLOAD_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleAudio()
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
    },
    [handleAudio]
  )

  return {
    isVisible,
    canInsert,
    handleAudio,
    label: "Insert audio",
    isActive,
    shortcutKeys: AUDIO_UPLOAD_SHORTCUT_KEY,
    Icon: AudioIcon,
  }
}