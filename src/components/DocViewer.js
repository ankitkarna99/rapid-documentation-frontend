import React from "react";
import { Remarkable } from "remarkable";
import parse from "html-react-parser";
const md = new Remarkable();

export default function DocViewer({ content, type }) {
  
  React.useEffect(() => {
    if (window.reRenderCode) {
      window.reRenderCode();
    }
    if (window.reRenderMermaid) {
      window.reRenderMermaid()
    }
  }, []);

  return <div>{parse(type === "md" ? md.render(content) : content)}</div>;
}
