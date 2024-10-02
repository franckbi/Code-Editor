"use client";
import CodeEditor from "@/componenets/CodeEditor";
import { WrappedFileExplorer } from "@/componenets/WrappedFileExplorer";
import { fileSystem } from "@/data/fileSystem";
import { Box, systemProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Header } from "@/componenets/Header";

export default function Home() {
  const initialFilePath = "/app.tsx"; // Updated to include leading slash for consistency

  const [currentFile, setCurrentFile] = useState<string>(initialFilePath);
  const [fileContent, setFileContent] = useState<string>(
    fileSystem["/"].children["app.tsx"].content
  );

  const handleFileSelect = (filePath: string) => {
    setCurrentFile(filePath);

    // Retrieve the content of the selected file from the file system
    const pathSegments = filePath.split("/").filter(Boolean);
    let fileNode: any = fileSystem["/"];

    for (const segment of pathSegments) {
      if (fileNode.children && fileNode.children[segment]) {
        fileNode = fileNode.children[segment];
      } else {
        console.error(`File not found: ${filePath}`);
        setFileContent("// File not found");
        return;
      }
    }

    if (fileNode.type === "file") {
      setFileContent(fileNode.content || "// No content available");
    } else {
      console.error(`Selected item is not a file: ${filePath}`);
      setFileContent("// Selected item is not a file");
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    setFileContent(value || "");

    // Update the content in the file system (simulate saving)
    const pathSegments = currentFile.split("/").filter(Boolean);
    let fileNode: any = fileSystem["/"];

    for (const segment of pathSegments) {
      if (fileNode.children && fileNode.children[segment]) {
        fileNode = fileNode.children[segment];
      } else {
        console.error(`File not found while saving: ${currentFile}`);
        return;
      }
    }

    if (fileNode.type === "file") {
      fileNode.content = value || "// No content available";
    }
  };

  return (
    <Box height="100vh" bg="#a28089" color="white" px={6} py={8}>
      <Header />
      <Box display="flex" height="calc(100% - 64px)">
        {" "}
        {/* Adjust height based on Header */}
        <Box width="20%" bg="gray.800" color="white" overflowY="auto" p={4}>
          <WrappedFileExplorer
            fileSystem={fileSystem}
            onSelectFile={handleFileSelect}
          />
        </Box>
        <Box flex="1" p={4}>
          <CodeEditor
            language="typescript"
            value={fileContent}
            onChange={handleEditorChange}
          />
        </Box>
      </Box>
    </Box>
  );
}
