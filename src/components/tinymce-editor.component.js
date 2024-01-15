import { forwardRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const TinyMceEditor = forwardRef(({value, setValue, saveFn, autosaveId}, ref) => {

    const log = () => {
        if (ref.current) {
            console.log(ref.current.getContent())
        }
    }

    return (
        <Editor
          tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
          onInit={(evt, editor) => (ref.current = editor)}
          value={value}
          init={{
            height: 500,
            menubar: true,
            setup: (editor) => {
              editor.on('StoreDraft', () => {
                console.log('Content autosaved at', new Date().toISOString())
              })
              editor.ui.registry.addMenuItem('save', {
              icon: 'save',
              text: 'Save',
              cmd: 'mceSave',
              context: 'file',
              disabled: true,
              onAction: saveFn,
              onPostRender: () => {
                var self = this
                editor.on('nodeChange', () => {
                  self.disabled(editor.getParam('save_enablewhendirty', true) && !editor.isDirty())
                })
              }
            })
            },
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
              "save",
              "autosave"
            ],
            promotion: false,
            elementpath: false,
            newdocument: false,
            save_onsavecallback: saveFn,
            menu: {
                file: { title: 'File', items: 'restoredraft | save | preview | export print' }
            },
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            autosave_interval: "30s",
            autosave_retention: "20m",
            autosave_prefix: `tinymce-autosave/${autosaveId}`,
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={setValue}
        />
      );

})

export default TinyMceEditor