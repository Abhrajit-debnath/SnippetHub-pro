"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import {
  docco,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

type CodeBlockProps = {
  code: string;
  language?: string;
  theme?: "light" | "dark";
};

const themes = {
  light: docco,
  dark: atomOneDark,
};

export default function CodeBlock({
  code,
  language = "text",
  theme = "dark",
}: CodeBlockProps) {
  return ( 
    <div className=" overflow-auto code-scrollbar">
    <SyntaxHighlighter
      language={language}
      style={themes[theme]}
      wrapLongLines
      customStyle={{
        height:"180px",
        borderRadius: "0.75rem",
        padding: "1rem",
        fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
        maxWidth: "100%",
      }}
      codeTagProps={{
        style: {
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
    </div>
  );
}
