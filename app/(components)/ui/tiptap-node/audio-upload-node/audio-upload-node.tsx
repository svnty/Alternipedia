"use client"

import * as React from "react"
import type { NodeViewProps } from "@tiptap/react"
import { NodeViewWrapper } from "@tiptap/react"
import { Button } from "@/app/(components)/ui/tiptap-ui-primitive/button"
import { CloseIcon } from "@/app/(components)/ui/tiptap-icons/close-icon"

export interface FileItem {
  /**
   * Unique identifier for the file item
   */
  id: string
  /**
   * The actual File object being uploaded
   */
  file: File
  /**
   * Current upload progress as a percentage (0-100)
   */
  progress: number
  /**
   * Current status of the file upload process
   * @default "uploading"
   */
  status: "uploading" | "success" | "error"

  /**
   * URL to the uploaded file, available after successful upload
   * @optional
   */
  url?: string
  /**
   * Controller that can be used to abort the upload process
   * @optional
   */
  abortController?: AbortController
}

export interface UploadOptions {
  /**
   * Maximum allowed file size in bytes
   */
  maxSize: number
  /**
   * Maximum number of files that can be uploaded
   */
  limit: number
  /**
   * String specifying acceptable file types (MIME types or extensions)
   * @example ".mp3,.wav,audio/*"
   */
  accept: string
  /**
   * Function that handles the actual file upload process
   */
  upload: (
    file: File,
    onProgress: (event: { progress: number }) => void,
    signal: AbortSignal
  ) => Promise<string>
  /**
   * Callback triggered when a file is uploaded successfully
   */
  onSuccess?: (url: string) => void
  /**
   * Callback triggered when an error occurs during upload
   */
  onError?: (error: Error) => void
}

/**
 * Custom hook for managing multiple file uploads with progress tracking and cancellation
 */
function useFileUpload(options: UploadOptions) {
  const [fileItems, setFileItems] = React.useState<FileItem[]>([])

  const uploadFile = async (file: File): Promise<string | null> => {
    if (file.size > options.maxSize) {
      const error = new Error(
        `File size exceeds maximum allowed (${options.maxSize / 1024 / 1024}MB)`
      )
      options.onError?.(error)
      return null
    }

    const abortController = new AbortController()
    const fileId = crypto.randomUUID()

    const newFileItem: FileItem = {
      id: fileId,
      file,
      progress: 0,
      status: "uploading",
      abortController,
    }

    setFileItems((prev) => [...prev, newFileItem])

    try {
      const url = await options.upload(file, (event) => {
        setFileItems((prev) =>
          prev.map((item) =>
            item.id === fileId ? { ...item, progress: event.progress } : item
          )
        )
      }, abortController.signal)

      setFileItems((prev) =>
        prev.map((item) =>
          item.id === fileId ? { ...item, status: "success", url } : item
        )
      )

      options.onSuccess?.(url)
      return url
    } catch (error) {
      setFileItems((prev) =>
        prev.map((item) =>
          item.id === fileId ? { ...item, status: "error" } : item
        )
      )
      options.onError?.(error as Error)
      return null
    }
  }

  const removeFile = (fileId: string) => {
    setFileItems((prev) => {
      const item = prev.find((item) => item.id === fileId)
      if (item?.status === "uploading") {
        item.abortController?.abort()
      }
      return prev.filter((item) => item.id !== fileId)
    })
  }

  return {
    fileItems,
    uploadFile,
    removeFile,
  }
}

/**
 * A Tiptap node view component for uploading audio files.
 */
const AudioUploadNode = (props: NodeViewProps) => {
  const { accept, limit, maxSize, src } = props.node.attrs
  const extension = props.extension

  // Ensure upload function is available
  if (!extension?.options?.upload) {
    return (
      <NodeViewWrapper>
        <div className="audio-upload-node">
          <div className="text-red-500 p-4">
            Error: Upload function not configured
          </div>
        </div>
      </NodeViewWrapper>
    )
  }

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const uploadOptions: UploadOptions = {
    maxSize,
    limit,
    accept,
    upload: extension.options.upload,
    onSuccess: (url) => {
      props.updateAttributes({ src: url })
    },
    onError: (error) => {
      console.error("Audio upload failed:", error)
    },
  }

  const { fileItems, uploadFile, removeFile } = useFileUpload(uploadOptions)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    for (const file of Array.from(files)) {
      await uploadFile(file)
    }

    // Reset the input
    event.target.value = ""
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleDelete = () => {
    props.deleteNode()
  }

  if (src) {
    return (
      <NodeViewWrapper>
        <div className="audio-upload-node">
          <audio controls src={src} className="w-full" />
          <div className="flex justify-end mt-2">
            <Button
              type="button"
              data-style="ghost"
              onClick={handleDelete}
            >
              <CloseIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper>
      <div className="audio-upload-node">
        <div
          className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
          onClick={handleClick}
        >
          <div className="text-muted-foreground">
            <div className="text-lg font-medium mb-2">Upload Audio</div>
            <div className="text-sm">
              Click to select an audio file ({accept})
            </div>
            {maxSize > 0 && (
              <div className="text-xs mt-1">
                Max size: {maxSize / 1024 / 1024}MB
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={limit > 1}
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {fileItems.length > 0 && (
          <div className="mt-4 space-y-2">
            {fileItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 bg-muted rounded"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {item.file.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.status === "uploading" && `${item.progress}%`}
                    {item.status === "success" && "Uploaded"}
                    {item.status === "error" && "Failed"}
                  </div>
                </div>
                <Button
                  type="button"
                  data-style="ghost"
                  onClick={() => removeFile(item.id)}
                >
                  <CloseIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button
            type="button"
            data-style="ghost"
            onClick={handleDelete}
          >
            <CloseIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export default AudioUploadNode