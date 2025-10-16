"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Button } from "@/app/(components)/ui/button";
import { SimpleEditor } from '@/app/(components)/ui/simple/simple-editor';
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Image from "@tiptap/extension-image";
import { Selection } from "@tiptap/extensions"
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table'
import Typography from "@tiptap/extension-typography";
import { ImageUploadNode } from "@/app/(components)/ui/tiptap-node/image-upload-node"
import { AudioUploadNode } from "@/app/(components)/ui/tiptap-node/audio-upload-node"
import { VideoUploadNode } from "@/app/(components)/ui/tiptap-node/video-upload-node";
import { handleImageUpload, handleAudioUpload, handleVideoUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"
import { debounce } from "@/lib/utils"
import { useId } from "react"
import { Tag, TagInput } from "emblor";

const emptyDoc = {
  type: "doc", content: [
    { type: "paragraph", attrs: { textAlign: null }, content: [{ type: "text", text: "This article is empty, you can help by expanding it" }] }
  ]
};
const resetDoc = {
  type: "doc",
  content: []
};

export default function ContentEditorComponent({ slug, lang, bias, revision }: { slug: string; lang: string; bias: string; revision: any }) {
  const id = useId();
  const [tags, setTags] = useState<Tag[]>([]);
  const [allCategories, setAllCategories] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [serverData, setServerData] = useState<any>();
  const [isSaving, setIsSaving] = useState(false);
  const [articleId, setArticleId] = useState(0);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const debouncedSave = useCallback(
    debounce((content: any) => {
      console.log("Auto-saving draft to localStorage:", content);
      localStorage.setItem(`wiki-draft-${slug}-${bias}-${lang}`, JSON.stringify(content));
    }, 500),
    [slug, bias, lang]
  );

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      const content = editor.getJSON();

      let isSame = false;

      if (JSON.stringify(content) === JSON.stringify(emptyDoc)) {
        isSame = true;
      }

      if (JSON.stringify(content) === JSON.stringify(resetDoc)) {
        isSame = true;
      }

      if (JSON.stringify(content) === JSON.stringify(serverData)) {
        isSame = true;
      }

      if (!isSame) {
        debouncedSave(content);
      }
    },
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        underline: false,
        strike: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Table.configure({
        resizable: false,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      AudioUploadNode.configure({
        accept: "audio/*",
        maxSize: MAX_FILE_SIZE,
        limit: 1,
        upload: handleAudioUpload,
        onError: (error: Error) => console.error("Audio upload failed:", error),
      }),
      VideoUploadNode.configure({
        accept: "video/*",
        maxSize: MAX_FILE_SIZE,
        limit: 1,
        upload: handleVideoUpload,
        onError: (error: Error) => console.error("Video upload failed:", error),
      }),
    ],
  });

  useEffect(() => {
    // When a new revision arrives, normalize the blocks into a proper doc
    // but only call editor.commands.setContent if the editor instance exists.
    setIsLoaded(false);
    if (revision) {
      console.log("Revision received:", revision);
      
      let tags = [];
      const revCategories = revision?.article?.categories || [];
      for (const tag of revCategories) {
        tags.push({ id: String(tag.category.id), text: tag.category.name });
      }
      setTags(tags);
      
      let blocks: any[] = [];
      const revisionBlocks = revision?.revisionBlocks || [];
      for (const revisionBlock of revisionBlocks) {
        blocks.push(revisionBlock.block.content);
      }

      // Normalize into a doc object so tiptap always receives the correct shape
      const doc = (blocks && blocks.length > 0) ? { type: "doc", content: [...blocks] } : emptyDoc;

      setServerData(doc);
      setArticleId(revision?.article?.id || 0);

      if (editor) {
        editor.commands.setContent(doc);
        setIsLoaded(true);
      } else {
        // Editor not ready yet; a separate effect will apply serverData once editor is initialized
        // Keep isLoaded false until content is applied to avoid showing an empty editor briefly
      }
    }
  }, [revision, editor]);

  // If serverData exists but the editor wasn't ready when revision arrived, apply it now
  useEffect(() => {
    if (editor && serverData && !isLoaded) {
      try {
        editor.commands.setContent(serverData);
      } catch (err) {
        console.error("Failed to set content on editor after init:", err);
      }
      setIsLoaded(true);
    }
  }, [editor, serverData, isLoaded]);

  const handleReset = () => {
    localStorage.removeItem(`wiki-draft-${slug}-${bias}-${lang}`);
    console.log("Resetting editor to server content");

    editor?.commands.setContent(serverData.length > 0 ? {
      type: "doc",
      content: [...serverData]
    } : resetDoc);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const blocks = editor?.getJSON().content || [];
      console.log("Saving blocks:", blocks);
      await fetch(`/api/${lang}/wiki/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blocks: blocks,
          bias: bias,
          lang: lang,
          categories: tags.map((t) => t.text)
        }),
      });
      localStorage.removeItem(`wiki-draft-${slug}-${bias}-${lang}`);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
      window.location.reload();
    }
  };

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    );
  }

  // Show error state
  if (editorError) {
    return (
      <div className="p-4 border border-destructive/20 rounded-md bg-destructive/5">
        <div className="text-destructive font-medium">Editor Error</div>
        <div className="text-sm text-muted-foreground mt-1">{editorError}</div>
        <Button
          onClick={() => {
            setEditorError(null);
            window.location.reload();
          }}
          variant="outline"
          size="sm"
          className="mt-2 cursor-pointer"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="min-h-[200px] border rounded-md p-1 bg-background">
        <SimpleEditor editor={editor} />
      </div>

      <div className="mt-2">
        <TagInput
          id={id}
          tags={tags}
          setTags={setTags}
          placeholder="Categories..."
          styleClasses={{
            inlineTagsContainer:
              "border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 p-1 gap-1",
            input: "w-full min-w-[80px] shadow-none px-2 h-7",
            tag: {
              body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
              closeButton:
                "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
            },
          }}
          activeTagIndex={activeTagIndex}
          setActiveTagIndex={setActiveTagIndex}
        />
      </div>

      <div className="gap-6 flex justify-end">
        <Button
          onClick={handleReset}
          disabled={isSaving}
          variant="destructive"
          className="mt-4 cursor-pointer"
        >
          Reset
        </Button>

        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="mt-4 cursor-pointer bg-gray-800 hover:bg-gray-600"
        >
          {isSaving ? "Saving..." : "Submit Changes"}
        </Button>
      </div>
    </div>
  );
}
