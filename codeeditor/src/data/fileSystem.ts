export interface FileNodeBase {
  type: "file" | "folder";
}

export interface FileNodeFile extends FileNodeBase {
  type: "file";
  content: string;
}

export interface FileNodeFolder extends FileNodeBase {
  type: "folder";
  children: Record<string, FileNode>;
}

export type FileNode = FileNodeFile | FileNodeFolder;

export interface FileSystem {
  "/": FileNodeFolder;
}

export const fileSystem: FileSystem = {
  "/": {
    type: "folder",
    children: {
      "app.tsx": {
        type: "file",
        content: `// Your initial TypeScript content here
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
`,
      },
      components: {
        type: "folder",
        children: {
          "Header.tsx": {
            type: "file",
            content: `// Header component in TypeScript
import React from 'react';
import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";

export const Header: React.FC = () => {
  return (
    <Box p={4} bg="gray.900" color="white">
      <Flex align="center" maxW="1200px" mx="auto">
        <Link href="/" _hover={{ textDecoration: "none" }}>
          <Text fontSize="xl" fontWeight="bold">
            Code Editor
          </Text>
        </Link>
        <Spacer />
        <Flex gap={4}>
          <Link href="/About" _hover={{ color: "blue.500" }}>
            About Me
          </Link>
          <Link href="/AboutApp" _hover={{ color: "blue.500" }}>
            App Description
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
`,
          },
        },
      },
      utils: {
        type: "folder",
        children: {
          "helpers.ts": {
            type: "file",
            content: `// Helper functions
export const greet = (name: string): string => {
  return \`Hello, \${name}!\`;
};
`,
          },
        },
      },
      "App.tsx": {
        type: "file",
        content: `// Main App component
import React from 'react';
import { Header } from './components/Header';
import CodeEditor from './components/CodeEditor';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <CodeEditor language="typescript" value="// Start coding..." onChange={(value) => console.log(value)} />
    </div>
  );
};

export default App;
`,
      },
    },
  },
};
