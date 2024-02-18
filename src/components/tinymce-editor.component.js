import { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import _ from 'lodash'
import { useAuth } from '@/context/auth.context'
import apiRequest from '@/services/api-request'

const TinyMceEditor = ({value, setValue, contentUrl, title, id, disabled}) => {

    const contentRef    = useRef('')          //Editor content ref
    const editorRef     = useRef(null)        //Editor component ref
    const contentUrlRef = useRef(contentUrl)  //contentUrl ref
    const { getToken }  = useAuth()           // Function to retrieve auth token

    //Function to save new content
    const saveContent = async () => {

      const currentContentUrl = contentUrlRef.current //Access the latest contentUrl value from the ref
        
          if (!currentContentUrl) {
              console.error('File path not found for ', title)
              return;
          }

          // Get user auth token
          const authToken = await getToken()

          // Save changes
          const response = await apiRequest('updateContent', {
            authToken,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
              filePath: currentContentUrl,
              content: contentRef.current
            }
          })

          console.log('RESPONSE: ', response)

          // If response ok
          if (response && response.success) {

            if (editorRef.current) {

              // Set dirty state false to avoid autosave warning
              editorRef.current.setDirty(false)
            }
          }
     }
    
     useEffect(() => {
      contentRef.current = value
     }, [value])

     useEffect(() => {
      contentUrlRef.current = contentUrl
    }, [contentUrl])

      //Construct autosave id
      const autosaveId = `${_.snakeCase(title)}/${id}/`

    return (
        <Editor
          tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={value}
          disabled={disabled}
          init={{
            height: 500,
            menubar: true,
            disabled: true,
            setup: (editor) => {
              editor.on('StoreDraft', () => {
                console.log('Content autosaved at', new Date().toISOString())
              })
              editor.ui.registry.addMenuItem('save', {
              icon: 'save',
              text: 'Save',
              cmd: 'mceSave',
              context: 'file',
              // disabled: true,
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