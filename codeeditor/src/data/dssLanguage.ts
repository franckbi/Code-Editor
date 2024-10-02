// src/data/dssLanguage.ts
import * as monaco from "monaco-editor";

export const dssLanguage: monaco.languages.IMonarchLanguage = {
  tokenizer: {
    root: [
      [/[a-z_$][\w$]*/, "identifier"],
      [/\d+/, "number"],
      [/[{}()\[\]]/, "@brackets"],
      [/[;,.]/, "delimiter"],
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"/, { token: "string.quote", next: "@string" }],
    ],
    string: [
      [/[^\\"]+/, "string"],
      [/\\./, "string.escape"],
      [/"/, { token: "string.quote", next: "@pop" }],
    ],
  },
  // Define more rules as needed for DSS syntax
};

// Register the DSS language with Monaco
monaco.languages.register({ id: "dss" });
monaco.languages.setMonarchTokensProvider("dss", dssLanguage);

// Optionally, define a theme or other language-specific settings
monaco.editor.defineTheme("dssTheme", {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "identifier", foreground: "a6e22e" },
    { token: "number", foreground: "e6db74" },
    { token: "string", foreground: "e6db74" },
    { token: "delimiter", foreground: "f8f8f2" },
    // Add more rules as needed
  ],
  colors: {
    "editor.background": "#272822",
  },
});
