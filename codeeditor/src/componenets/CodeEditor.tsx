"use client";
import React from "react";
import { Editor, OnChange } from "@monaco-editor/react";
import { Box } from "@chakra-ui/react";
import * as monaco from "monaco-editor";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
}) => {
  const handleEditorChange: OnChange = (value) => {
    onChange(value);
  };
  return (
    <Box>
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={handleEditorChange}
        options={{
          automaticLayout: true,
          scrollBeyondLastLine: false,
          theme: "vs-dark",
        }}
      />
    </Box>
  );
};

export default CodeEditor;
