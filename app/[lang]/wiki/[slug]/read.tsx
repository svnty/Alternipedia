import { generateHTML } from '@tiptap/html';
import ClientLoadedSignal from "@/app//[lang]/wiki/[slug]/(client-renders)/load-signal";
import StarterKit from "@tiptap/starter-kit";
import Heading from '@tiptap/extension-heading'
import Blockquote from '@tiptap/extension-blockquote'
import Superscript from "@tiptap/extension-superscript";
// Paragraph styling moved to wrapper to avoid styling nested paragraphs
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


export default function Read({ slug, lang, bias, revision }: { slug: string, lang: string, bias: string, revision: any }) {
  const doc = {
    type: "doc",
    content: !!revision?.revisionBlocks ? revision.revisionBlocks.map((rb: any) => rb.block.content) : [],
  }

  if (!revision) {
    return (
      <div>
        <ClientLoadedSignal />
      </div>
    );
  }

  return (
    <>
      <ClientLoadedSignal />
      <div
        className="[&>p]:mb-[20px]"
        dangerouslySetInnerHTML={{
          __html: generateHTML(doc,
            [
              // disable starter kit's built-in heading so we can provide a custom one
              StarterKit.configure({
                underline: false,
                strike: false,
                link: {
                  openOnClick: false,
                  enableClickSelection: true,
                },
                heading: false,
              }),
              // custom heading extension that adds Tailwind classes to h2
              Heading.extend({
                renderHTML({ node, HTMLAttributes }) {
                  const level = node.attrs.level || 1;
                  const tag = `h${level}`;
                  const title = node.textContent;
                  const id = title.replace(/\s+/g, '_');
                  const existing = HTMLAttributes.class ? HTMLAttributes.class + ' ' : '';
                  if (level == 1) {
                    return [tag, { ...HTMLAttributes, class: `${existing}text-2xl font-bold mt-8 mb-4 heading-anchor`, id: id }, 0];
                  }
                  if (level === 2) {
                    return [tag, { ...HTMLAttributes, class: `${existing}text-xl font-semibold mt-6 mb-2 heading-anchor`, id: id }, 0];
                  }
                  if (level == 3) {
                    return [tag, { ...HTMLAttributes, class: `${existing}text-lg font-semibold mt-4 mb-2 heading-anchor`, id: id }, 0];
                  }
                  return [tag, HTMLAttributes, 0];
                }
              }),
              // custom blockquote styling (Tailwind classes)
              Blockquote.extend({
                renderHTML({ HTMLAttributes }) {
                  const existing = HTMLAttributes.class ? HTMLAttributes.class + ' ' : '';
                  return ['blockquote', { ...HTMLAttributes, class: `${existing}border-l-4 pl-4 italic text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-md py-2 my-4` }, 0];
                }
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
            ]
          )
        }} />
    </>
  )
}