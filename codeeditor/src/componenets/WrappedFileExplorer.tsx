"use client";
import React from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Icon,
  Text,
  Collapse,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

interface FileNode {
  type: "file" | "folder";
  content?: string;
  children?: Record<string, FileNode>;
}

interface FileExplorerProps {
  fileSystem: Record<string, FileNode>;
  onSelectFile: (filePath: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  fileSystem,
  onSelectFile,
}) => {
  return (
    <VStack align="start" spacing={1}>
      {renderFileTree(fileSystem["/"], "")}
    </VStack>
  );
};

export const renderFileTree = (
  node: FileNode,
  currentPath: string
): JSX.Element => {
  if (node.type === "folder" && node.children) {
    return <Folder name={currentPath || "/"} childrenNodes={node.children} />;
  } else if (node.type === "file") {
    return <File name={currentPath} path={""} />;
  }
  return <></>;
};

interface FolderProps {
  name: string;
  childrenNodes: Record<string, FileNode>;
}

export const Folder: React.FC<FolderProps> = ({ name, childrenNodes }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <Box width="100%">
      <HStack
        spacing={2}
        onClick={toggleOpen}
        cursor="pointer"
        userSelect="none"
      >
        <Icon as={isOpen ? ChevronDownIcon : ChevronRightIcon} />
        <Text fontWeight="bold">{name}</Text>
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" pl={4} spacing={1}>
          {Object.entries(childrenNodes).map(([childName, childNode]) => {
            const childPath =
              name === "/" ? `/${childName}` : `${name}/${childName}`;
            if (childNode.type === "folder") {
              return (
                <Folder
                  key={childPath}
                  name={childName}
                  childrenNodes={childNode.children || {}}
                />
              );
            } else {
              return <File key={childPath} name={childName} path={childPath} />;
            }
          })}
        </VStack>
      </Collapse>
    </Box>
  );
};

interface FileProps {
  name: string;
  path: string;
}

export const File: React.FC<FileProps> = ({ name, path }) => {
  const { onSelectFile } = React.useContext(FileExplorerContext);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSelectFile(path)}
      justifyContent="flex-start"
      width="100%"
    >
      {name}
    </Button>
  );
};

// Context to pass down the onSelectFile function
interface FileExplorerContextProps {
  onSelectFile: (filePath: string) => void;
}

export const FileExplorerContext =
  React.createContext<FileExplorerContextProps>({
    onSelectFile: () => {},
  });

export const FileExplorerProvider: React.FC<{
  onSelectFile: (filePath: string) => void;
  children: React.ReactNode;
}> = ({ onSelectFile, children }) => {
  return (
    <FileExplorerContext.Provider value={{ onSelectFile }}>
      {children}
    </FileExplorerContext.Provider>
  );
};

// Wrap the FileExplorer content with the provider
export const WrappedFileExplorer: React.FC<FileExplorerProps> = ({
  fileSystem,
  onSelectFile,
}) => {
  return (
    <FileExplorerProvider onSelectFile={onSelectFile}>
      <VStack align="start" spacing={1}>
        {renderFileTree(fileSystem["/"], "/")}
      </VStack>
    </FileExplorerProvider>
  );
};

export default WrappedFileExplorer;
