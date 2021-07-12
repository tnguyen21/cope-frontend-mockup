import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { makeStyles, InputLabel } from "@material-ui/core";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const useStyles = makeStyles({
  textEditor: {
    backgroundColor: "white",
    color: "black",
    border: "thin solid black",
    borderRadius: "5px",
    minHeight: "400px",
    maxHeight: "400px",
  },
});

function MarkdownInput({
  editorState,
  onEditorStateChange,
}: {
  editorState: any;
  onEditorStateChange: any;
}) {
  const classes = useStyles();
  return (
    <>
      <InputLabel>Markdown</InputLabel>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        editorClassName={classes.textEditor}
      ></Editor>
    </>
  );
}

export default MarkdownInput;
