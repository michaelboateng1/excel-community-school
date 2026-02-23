import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

export default function TextEditor({ value = "", onChange, placeholder = "Write something..." }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Initialize Quill
  useEffect(() => {
    let mounted = true;

    const initQuill = async () => {
      const Quill = (await import("quill")).default;

      if (!mounted) return;

      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: [[{ header: [1, 2, 3, false] }], ["bold", "italic", "underline", "strike"], [{ list: "ordered" }, { list: "bullet" }], ["image", "link", "clean"]],
        },
      });

      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      quillRef.current.on("text-change", () => {
        const html = quillRef.current.root.innerHTML === "<p><br></p>" ? "" : quillRef.current.root.innerHTML;

        if (onChange) onChange(html);
      });
    };

    initQuill();

    return () => {
      mounted = false;
      quillRef.current = null;
    };
  }, []);

  // Sync external value changes (like your $effect)
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      const selection = quillRef.current.getSelection();
      quillRef.current.root.innerHTML = value || "";

      if (selection) {
        quillRef.current.setSelection(selection);
      }
    }
  }, [value]);

  return (
    <div className="rich-text-editor-container h-[300px] w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-gray-500 focus:bg-white/15 transition resize-none  rounded-md overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-slate-500 focus-within:border-transparent transition-all">
      <div ref={editorRef}></div>
    </div>
  );
}
