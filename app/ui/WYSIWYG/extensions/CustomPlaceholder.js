import { Extension } from '@tiptap/core';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { Plugin, PluginKey } from '@tiptap/pm/state'

const CustomPlaceholder = Extension.create({
  name: 'customPlaceholder',

  addOptions() {
    return {
      placeholder: 'Enter some text...', // Default placeholder text
      emptyEditorClass: 'is-editor-empty', // Class to apply when the editor is empty
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('customPlaceholder'),
        props: {
          decorations: ({ doc, selection }) => {
            const { placeholder, emptyEditorClass } = this.options;
            const decorations = [];
  
            // Check if the document is empty
            const isEmptyDoc = doc.textContent === '';
  
            // Add a class to the editor when it's empty
            if (isEmptyDoc) {
              this.editor.view.dom.classList.add(emptyEditorClass);
            } else {
              this.editor.view.dom.classList.remove(emptyEditorClass);
            }
  
            // Add placeholder decorations for empty nodes
            doc.descendants((node, pos) => {
              const isEmpty = !node.isLeaf && node.content.size === 0; // Check if the node is empty
  
              if (isEmpty) {
                const placeholderNode = document.createElement('div');
                placeholderNode.classList.add('custom-placeholder');
                placeholderNode.innerHTML = placeholder; // Use HTML string as placeholder
  
                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: 'custom-placeholder-container',
                    'data-placeholder': placeholder,
                  })
                );
  
                // Alternatively, use Decoration.widget if you want to render a widget
                decorations.push(
                  Decoration.widget(pos, placeholderNode, {
                    side: -1, // Render at the start of the node
                  })
                );
              }
  
              return true; // Continue iterating through child nodes
            });
  
            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});

export default CustomPlaceholder;