import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { History } from '@tiptap/extension-history';
import { Placeholder } from '@tiptap/extension-placeholder';
import { CustomBulletList, CustomListItem } from '../nodes/DeliverablesBulletList';

export default function createEditorConfig(placeholder, content) {
  return {
    extensions: [
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          class: 'lg:text-sm 2xl:text-base',
        },
      }),
      Text,
      History,
      CustomListItem, // Use the custom list item
      CustomBulletList.configure({
        HTMLAttributes: {
          class: 'flex flex-col gap-2', // Adjust the class for the bullet list container
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
        emptyEditorClass:
          'before:content-[attr(data-placeholder)] before:text-gray-400 before:float-left before:pointer-events-none',
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none prose-headings:mt-4 prose-headings:mb-2',
      },
    },
    immediatelyRender: false,
    onFocus: ({ editor }) => {
      if (editor.isEmpty) {
        editor.commands.focus('end');
        editor.chain().focus().toggleCustomBulletList().run();
      }
    },
  };
}