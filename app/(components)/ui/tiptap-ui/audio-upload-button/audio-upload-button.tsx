"use client"

import * as React from "react"

// --- Lib ---
import { parseShortcutKeys } from "@/lib/tiptap-utils"

// --- Hooks ---
import { useTiptapEditor } from "@/app/(components)/hooks/use-tiptap-editor"

// --- Tiptap UI ---
import type { UseAudioUploadConfig } from "./use-audio-upload"
import {
  AUDIO_UPLOAD_SHORTCUT_KEY,
  useAudioUpload,
} from "./use-audio-upload"

// --- UI Primitives ---
import type { ButtonProps } from "@/app/(components)/ui/tiptap-ui-primitive/button"
import { Button } from "@/app/(components)/ui/tiptap-ui-primitive/button"
import { Badge } from "@/app/(components)/ui/tiptap-ui-primitive/badge"

export interface AudioUploadButtonProps
  extends Omit<ButtonProps, "type">,
    UseAudioUploadConfig {
  /**
   * Optional text to display alongside the icon.
   */
  text?: string
  /**
   * Optional show shortcut keys in the button.
   * @default false
   */
  showShortcut?: boolean
}

export function AudioShortcutBadge({
  shortcutKeys = AUDIO_UPLOAD_SHORTCUT_KEY,
}: {
  shortcutKeys?: string
}) {
  return <Badge>{parseShortcutKeys({ shortcutKeys })}</Badge>
}

/**
 * Button component for uploading/inserting audio in a Tiptap editor.
 *
 * For custom button implementations, use the `useAudio` hook instead.
 */
export const AudioUploadButton = React.forwardRef<
  HTMLButtonElement,
  AudioUploadButtonProps
>(
  (
    {
      editor: providedEditor,
      text,
      hideWhenUnavailable = false,
      onInserted,
      showShortcut = false,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const {
      isVisible,
      canInsert,
      handleAudio,
      label,
      isActive,
      shortcutKeys,
      Icon,
    } = useAudioUpload({
      editor,
      hideWhenUnavailable,
      onInserted,
    })

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        handleAudio()
      },
      [handleAudio, onClick]
    )

    if (!isVisible) {
      return null
    }

    return (
      <Button
        type="button"
        data-style="ghost"
        data-active-state={isActive ? "on" : "off"}
        role="button"
        tabIndex={-1}
        disabled={!canInsert}
        data-disabled={!canInsert}
        aria-label={label}
        aria-pressed={isActive}
        tooltip={label}
        onClick={handleClick}
        {...buttonProps}
        ref={ref}
      >
        {children ?? (
          <>
            <Icon className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
            {showShortcut && <AudioShortcutBadge shortcutKeys={shortcutKeys} />}
          </>
        )}
      </Button>
    )
  }
)

AudioUploadButton.displayName = "AudioUploadButton"