import { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import _ from 'lodash'

const TinyMceEditor = ({value, setValue, contentUrl, title, id}) => {

    const contentRef = useRef('')   //Editor content ref
    const editorRef = useRef(null)  //Editor component ref

    //Function to save new content
    const saveContent = async () => {
        
          if (!contentUrl) {
              console.error('File path not found for ', title)
              return;
          }
  
          try {
  
              //TODO use real firebase
              const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}updateContent`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      filePath: contentUrl,
                      content: contentRef.current
                  })
              })
  
              if (response.ok) {
                  console.log('Content saved successfully')
                  if (editorRef.current) {
  
                      //Set dirty state false to avoid autosave warning
                      editorRef.current.setDirty(false)
                  }
  
              } else {
                  console.error('Failed to save content')
                  console.log('response: ', response)
              }
          } catch (error) {
              console.error('Error saving content:', error)
          }
     }
    
     useEffect(() => {
      contentRef.current = value
     }, [value])

      //Construct autosave id
      const autosaveId = `${_.snakeCase(title)}/${id}/`

    return (
        <Editor
          tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
          onInit={(evt, editor) => (editorRef.current = editor)}
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
              onAction: saveContent,
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
            save_onsavecallback: saveContent,
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

}

export default TinyMceEditor