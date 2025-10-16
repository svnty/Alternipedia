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
import { VideoIcon } from "@/app/(components)/ui/tiptap-icons/video-icon"

export const VIDEO_UPLOAD_SHORTCUT_KEY = "mod+shift+v"

/**
 * Configuration for the video upload functionality
 */
export interface UseVideoUploadConfig {
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
   * Callback function called after a successful video insertion.
   */
  onInserted?: () => void
}

/**
 * Checks if video can be inserted in the current editor state
 */
export function canInsertVideo(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (
    !isExtensionAvailable(editor, "videoUpload") ||
    isNodeTypeSelected(editor, ["video"])
  )
    return false

  return editor.can().insertContent({ type: "videoUpload" })
}

/**
 * Checks if video is currently active
 */
export function isVideoActive(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  return editor.isActive("videoUpload")
}

/**
 * Inserts a video in the editor
 */
export function insertVideo(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (!canInsertVideo(editor)) return false

  try {
    return editor
      .chain()
      .focus()
      .insertContent({
        type: "videoUpload",
      })
      .run()
  } catch {
    return false
  }
}

/**
 * Determines if the video button should be shown
 */
export function shouldShowVideoButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false
  if (!isExtensionAvailable(editor, "videoUpload")) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canInsertVideo(editor)
  }

  return true
}

/**
 * Custom hook that provides video functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage - no params needed
 * function MySimpleVideoButton() {
 *   const { isVisible, handleVideo } = useVideo()
 *
 *   if (!isVisible) return null
 *
 *   return <button onClick={handleVideo}>Add Video</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedVideoButton() {
 *   const { isVisible, handleVideo, label, isActive } = useVideo({
 *     editor: myEditor,
 *     hideWhenUnavailable: true,
 *     onInserted: () => console.log('Video inserted!')
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       onClick={handleVideo}
 *       aria-pressed={isActive}
 *       aria-label={label}
 *     >
 *       Add Video
 *     </MyButton>
 *   )
 * }
 * ```
 */
export function useVideoUpload(config?: UseVideoUploadConfig) {
  const {
    editor: providedEditor,
    hideWhenUnavailable = false,
    onInserted,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = React.useState<boolean>(true)
  const canInsert = canInsertVideo(editor)
  const isActive = isVideoActive(editor)

  const handleVideo = React.useCallback(() => {
    if (!insertVideo(editor)) return

    onInserted?.()
  }, [editor, onInserted])

  React.useEffect(() => {
    setIsVisible(shouldShowVideoButton({ editor, hideWhenUnavailable }))
  }, [editor, hideWhenUnavailable])

  // Register keyboard shortcut
  useHotkeys(
    VIDEO_UPLOAD_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleVideo()
    },
    {
      enableOnFormTags: true,
      enableOnContentEditable: true,
    },
    [handleVideo]
  )

  return {
    isVisible,
    canInsert,
    handleVideo,
    label: "Insert video",
    isActive,
    shortcutKeys: VIDEO_UPLOAD_SHORTCUT_KEY,
    Icon: VideoIcon,
  }
}