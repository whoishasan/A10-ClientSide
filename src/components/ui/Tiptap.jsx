import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from '@tiptap/extension-text-align'
import { GrTextAlignCenter, GrTextAlignLeft, GrTextAlignRight } from "react-icons/gr";
import { RiAlignJustify } from "react-icons/ri";
import { BsListOl } from "react-icons/bs";

const Tiptap = ({content, setContent, defaultContent}) => {

    const editor = useEditor({
        extensions: [
            StarterKit, 
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight
        ],
        content: `${defaultContent || ''}`,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    if (!editor) {
        return <div>Loading editor...</div>;
    }

    return (
        <>
            <div className="border-x border-t rounded-t-xl w-full dark:border-border-1 px-3 py-2 flex flex-wrap gap-2">
                {/* Bold */}
                <Button 
                    tooltip={'Bold'}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                      !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                    }
                    type={'bold'}
                    editor={editor}
                >Ｂ</Button>

                {/* Italic */}
                <Button 
                    tooltip={'Italic'}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                    }
                    type={'italic'}
                    editor={editor}
                >𝓲</Button>

                {/* Highlight */}
                <Button 
                    tooltip={'Highlight'}
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    type={'highlight'}
                    editor={editor}
                >🎨</Button>

                {/* Strike */}
                <Button 
                    tooltip={'Strike'}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                      !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                    }
                    type={'strike'}
                    editor={editor}
                > ̶S̶</Button>

                <Button 
                    tooltip={'Ordered List'}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    type={'orderedList'}
                    editor={editor}
                > <BsListOl /></Button>

                {/* Text Start */}
                <button 
                    type="button"
                    data-tooltip-id="tooltip" 
                    data-tooltip-content={'Text Left'} 
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-600 px-2 rounded-sm ${!editor.isActive({ textAlign: 'left' }) ? 'is-active' : 'dark:!bg-[#0285c750] !bg-[#0285c78b] !text-white'}`}>
                    <GrTextAlignLeft />
                </button>

                {/* Text Center */}
                <button 
                    type="button"
                    data-tooltip-id="tooltip" 
                    data-tooltip-content={'Text Center'} 
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-600 px-2 rounded-sm ${!editor.isActive({ textAlign: 'center' }) ? 'is-active' : 'dark:!bg-[#0285c750] !bg-[#0285c78b] !text-white'}`}>
                    <GrTextAlignCenter />
                </button>
            
                {/* Right */}
                <button 
                    type="button"
                    data-tooltip-id="tooltip" 
                    data-tooltip-content={'Text Right'} 
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-600 px-2 rounded-sm ${!editor.isActive({ textAlign: 'right' }) ? 'is-active' : 'dark:!bg-[#0285c750] !bg-[#0285c78b] !text-white'}`}>
                    <GrTextAlignRight />
                </button>

                {/* Justify */}
                <button 
                    type="button"
                    data-tooltip-id="tooltip" 
                    data-tooltip-content={'Text Justify'} 
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={`bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-600 px-2 rounded-sm ${!editor.isActive({ textAlign: 'justify' }) ? 'is-active' : 'dark:!bg-[#0285c750] !bg-[#0285c78b] !text-white'}`}>
                    <RiAlignJustify />
                </button>

                {/* Heading 2*/}
                <button 
                    type="button"
                    data-tooltip-id="tooltip" 
                    data-tooltip-content={'Heading 2'} 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-600 px-2 rounded-sm ${!editor.isActive('heading', { level: 2 }) ? 'is-active' : 'dark:!bg-[#0285c750] !bg-[#0285c78b] !text-white'}`}>
                    H2
                </button>

                {/* Heading 3*/}
                <button 
                    type="button"
                    data-tooltip-id="tooltip" 
                    data-tooltip-content={'Heading 3'} 
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-600 px-2 rounded-sm ${!editor.isActive('heading', { level: 3 }) ? 'is-active' : 'dark:!bg-[#0285c750] !bg-[#0285c78b] !text-white'}`}>
                    H3
                </button>


                {/* Paragraph */}
                <Button 
                    tooltip={'Paragraph'}
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    type={'paragraph'}
                    editor={editor}
                >P</Button>
            </div>
            <div className="px-3 py-2 border rounded-b-xl dark:border-border-1 h-[300px] overflow-hidden">
                <EditorContent id="editor" editor={editor} />
            </div>
        </>
    );
};

export default Tiptap;

const Button = ({editor , type , tooltip, className , children, ...props}) => (
    <button type="button" data-tooltip-id="tooltip" data-tooltip-content={tooltip} {...props} className={`bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-600 px-2 rounded-sm ${!editor.isActive(type) ? 'is-active' : 'dark:!bg-[#0285c750] !bg-[#0285c78b] !text-white'}`}>
        {children}
    </button>
)