"use client"

import * as React from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"

// --- UI Primitives ---
import { Button } from "@/app/(components)/ui/tiptap-ui-primitive/button"
import { Spacer } from "@/app/(components)/ui/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/app/(components)/ui/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { ImageUploadNode } from "@/app/(components)/ui/tiptap-node/image-upload-node/image-upload-node-extension"
import { AudioUploadNode } from "@/app/(components)/ui/tiptap-node/audio-upload-node/audio-upload-node-extension"
import { VideoUploadNode } from "@/app/(components)/ui/tiptap-node/video-upload-node/video-upload-node-extension"
import { HorizontalRule } from "@/app/(components)/ui/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import "@/app/(components)/ui/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/app/(components)/ui/tiptap-node/code-block-node/code-block-node.scss"
import "@/app/(components)/ui/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/app/(components)/ui/tiptap-node/list-node/list-node.scss"
import "@/app/(components)/ui/tiptap-node/image-node/image-node.scss"
import "@/app/(components)/ui/tiptap-node/heading-node/heading-node.scss"
import "@/app/(components)/ui/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/app/(components)/ui/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/app/(components)/ui/tiptap-ui/image-upload-button"
import { AudioUploadButton } from "@/app/(components)/ui/tiptap-ui/audio-upload-button"
import { VideoUploadButton } from "@/app/(components)/ui/tiptap-ui/video-upload-button"
import { ListDropdownMenu } from "@/app/(components)/ui/tiptap-ui/list-dropdown-menu"
import { BlockquoteButton } from "@/app/(components)/ui/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@/app/(components)/ui/tiptap-ui/code-block-button"
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/app/(components)/ui/tiptap-ui/link-popover"
import { MarkButton } from "@/app/(components)/ui/tiptap-ui/mark-button"
import { TextAlignButton } from "@/app/(components)/ui/tiptap-ui/text-align-button"

// --- Icons ---
import { ArrowLeftIcon } from "@/app/(components)/ui/tiptap-icons/arrow-left-icon"
import { LinkIcon } from "@/app/(components)/ui/tiptap-icons/link-icon"

// --- Hooks ---
import { useIsMobile } from "@/app/(components)/hooks/use-mobile"
import { useWindowSize } from "@/app/(components)/hooks/use-window-size"
import { useCursorVisibility } from "@/app/(components)/hooks/use-cursor-visibility"

// --- Components ---
import { ThemeToggle } from "@/app/(components)/ui/simple/theme-toggle"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

// --- Styles ---
import "@/app/(components)/ui/simple/simple-editor.scss"

import content from "@/app/(components)/ui/simple/data/content.json"

const MainToolbarContent = ({
  onLinkClick,
  isMobile,
}: {
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <ToolbarGroup className={isMobile ? 'ml-2 mr-6' : ''}>
        <HeadingDropdownMenu levels={[1, 2, 3]} portal={true} />
        <ListDropdownMenu
          types={["bulletList", "orderedList"]}
          portal={true}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="code" />
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="" />
        <AudioUploadButton text="" />
        <VideoUploadButton text="" />
      </ToolbarGroup>

      <Spacer />
    </>
  )
}

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "link"
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        <LinkIcon className="tiptap-button-icon" />
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    <LinkContent />
  </>
)

export function SimpleEditor({ editor }: { editor: any }) {
  const isMobile = useIsMobile()
  const { height } = useWindowSize()
  const [mobileView, setMobileView] = React.useState<
    "main" | "link"
  >("main")
  const toolbarRef = React.useRef<HTMLDivElement>(null)

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          // style={{
          //   ...(isMobile
          //     ? {
          //         bottom: `calc(100% - ${height - rect.y}px)`,
          //       }
          //     : {}),
          // }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={"link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  )
}
