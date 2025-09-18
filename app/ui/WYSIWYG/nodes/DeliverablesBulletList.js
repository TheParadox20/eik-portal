import { Node } from '@tiptap/core';

export const CustomBulletList = Node.create({
  name: 'customBulletList',
  group: 'block',
  content: 'customListItem+',
  parseHTML() {
    return [{ tag: 'div.custom-bullet-list' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return ['div', { class: 'custom-bullet-list flex flex-col gap-2' }, 0];
  },
  addCommands() {
    return {
      toggleCustomBulletList:
        () =>
        ({ commands }) => {
          if (this.editor.isActive('customBulletList')) {
            return commands.lift('customBulletList');
          }
          return commands.wrapIn('customBulletList');
        },
    };
  },
});

export const CustomListItem = Node.create({
  name: 'customListItem',
  content: 'paragraph block*',
  defining: true,
  parseHTML() {
    return [{ tag: 'div.custom-list-item' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      { class: 'flex items-center gap-2' },
      ['span', { class: 'icon-[mingcute--checkbox-fill] bg-[#71a6e7] w-6 h-6' }],
      ['span', 0],
    ];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem('customListItem'), // Handle Enter key
    };
  },
});