import { Node } from '@tiptap/core'
import { useRef } from 'react'

export const FileUploadNode = Node.create({
    name: 'filePreview',
    group: 'block',
    atom: true,
  
    addAttributes() {
      return {
        src: '',
        filename: '',
        fileType: '',
        fileSize: '',
      }
    },
  
    parseHTML() {
      return [{ tag: 'div[data-type="file-preview"]' }]
    },
  
    renderHTML({ HTMLAttributes }) {
      const fileType = HTMLAttributes.fileType || '';
      const isImage = fileType.startsWith('image/');
      const isVideo = fileType.startsWith('video/');
      const isAudio = fileType.startsWith('audio/');
      const isPDF = fileType === 'application/pdf';
  
      return ['div', { 
        'data-type': 'file-preview',
        class: 'my-4 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 relative group'
      },
        isImage ? [
          'img', { 
            src: HTMLAttributes.src,
            class: 'w-96 h-auto rounded-lg',
            alt: HTMLAttributes.filename
          }
        ] : isVideo ? [
          'video', {
            src: HTMLAttributes.src,
            controls: true,
            class: 'w-96 rounded-lg'
          }
        ] : isAudio ? [
          'audio', {
            src: HTMLAttributes.src,
            controls: true,
            class: 'w-full'
          }
        ] : isPDF ? [
          'a', { 
            href: HTMLAttributes.src,
            download: HTMLAttributes.filename,
            class: 'flex items-center gap-3 cursor-pointer'
          },
          [
            'div', { class: 'p-3 bg-gray-200 dark:bg-gray-700 rounded' },
            '📄'
          ],
          [
            'div', {},
            [
              'div', { class: 'font-medium' },
              HTMLAttributes.filename
            ],
            [
              'div', { class: 'text-sm text-gray-500 dark:text-gray-400' },
              `${(HTMLAttributes.fileSize / (1024 * 1024)).toFixed(2)} MB`
            ]
          ]
        ] : [
          'a', { 
            href: HTMLAttributes.src,
            download: HTMLAttributes.filename,
            class: 'flex items-center gap-3 cursor-pointer'
          },
          [
            'div', { class: 'p-3 bg-gray-200 dark:bg-gray-700 rounded' },
            '📎'
          ],
          [
            'div', {},
            [
              'div', { class: 'font-medium' },
              HTMLAttributes.filename
            ],
            [
              'div', { class: 'text-sm text-gray-500 dark:text-gray-400' },
              `${(HTMLAttributes.fileSize / (1024 * 1024)).toFixed(2)} MB`
            ]
          ]
        ]
      ]
    },
})

export const FileUploadButton = ({ editor }) => {
    const fileInputRef = useRef(null);
  
    const handleFileUpload = async (event) => {
      const files = event.target.files;
      if (!files) return;
  
      // Handle multiple file uploads
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === 'string') {
            editor.chain().focus().insertContent({
              type: 'filePreview',
              attrs: {
                src: result,
                filename: file.name,
                fileType: file.type,
                fileSize: file.size,
              }
            }).run();
          }
        };
        reader.readAsDataURL(file);
      });
    };
  
    return (
      <>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          multiple
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-2 py-1 rounded icon-[heroicons--paper-clip] w-4 h-4 2xl:w-6 2xl:h-6"
        >
        </button>
      </>
    );
};