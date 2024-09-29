export const fileSystem = {
  "/": {
    type: "folder",
    children: {
      "app.tsx": {
        type: "file",
        content: `// Your initial Typescript content here`,
      },
      components: {
        type: "folder",
        children: {
          "Header.tsx": {
            type: "file",
            content: `// Header component in TypeScript`,
          },
        },
      },
    },
  },
};
