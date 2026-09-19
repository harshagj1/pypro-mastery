/* ==========================================================================
   PYPRO MASTERY - CODE EDITOR
   Syntax Highlighting, Line Gutter, Smart Auto-Indent & Keyboard Shortcuts
   ========================================================================== */

class CodeEditor {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.textarea = null;
    this.highlightEl = null;
    this.gutterEl = null;
    this.lineColEl = document.getElementById("editor-line-col");
    this.onRunCallback = null;
    this.onSaveCallback = null;
    
    this.init();
  }

  init() {
    this.textarea = document.getElementById("code-input");
    this.highlightEl = document.getElementById("code-highlight");
    this.gutterEl = document.getElementById("editor-gutter");

    if (!this.textarea || !this.highlightEl || !this.gutterEl) return;

    // Synchronize scrolling
    this.textarea.addEventListener("scroll", () => this.syncScroll());
    
    // Real-time input handler
    this.textarea.addEventListener("input", () => {
      this.updateHighlighting();
      this.updateGutter();
      this.updateCursorPosition();
    });

    // Cursor click/selection handler
    this.textarea.addEventListener("keyup", () => this.updateCursorPosition());
    this.textarea.addEventListener("click", () => this.updateCursorPosition());

    // Tab key & Auto-indentation
    this.textarea.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  handleKeydown(e) {
    // Run code shortcut: Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (this.onRunCallback) this.onRunCallback();
      return;
    }

    // Save shortcut: Ctrl+S
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      if (this.onSaveCallback) this.onSaveCallback();
      return;
    }

    // Smart Tab indentation (4 spaces)
    if (e.key === "Tab") {
      e.preventDefault();
      const start = this.textarea.selectionStart;
      const end = this.textarea.selectionEnd;
      const val = this.textarea.value;

      if (e.shiftKey) {
        // Shift+Tab: Unindent current line
        const lineStart = val.lastIndexOf("\n", start - 1) + 1;
        if (val.slice(lineStart, lineStart + 4) === "    ") {
          this.textarea.value = val.slice(0, lineStart) + val.slice(lineStart + 4);
          this.textarea.selectionStart = this.textarea.selectionEnd = Math.max(lineStart, start - 4);
        }
      } else {
        // Regular Tab: Insert 4 spaces
        this.textarea.value = val.substring(0, start) + "    " + val.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 4;
      }

      this.updateHighlighting();
      this.updateGutter();
      return;
    }

    // Auto-indent on Enter
    if (e.key === "Enter") {
      const pos = this.textarea.selectionStart;
      const text = this.textarea.value;
      const curLineStart = text.lastIndexOf("\n", pos - 1) + 1;
      const curLine = text.substring(curLineStart, pos);

      // Find current indentation
      const match = curLine.match(/^(\s*)/);
      let indent = match ? match[1] : "";

      // If line ends with a colon, add 4 extra spaces
      if (curLine.trim().endsWith(":")) {
        indent += "    ";
      }

      if (indent.length > 0) {
        e.preventDefault();
        const insert = "\n" + indent;
        this.textarea.value = text.substring(0, pos) + insert + text.substring(pos);
        this.textarea.selectionStart = this.textarea.selectionEnd = pos + insert.length;
        this.updateHighlighting();
        this.updateGutter();
      }
    }
  }

  syncScroll() {
    this.highlightEl.scrollTop = this.textarea.scrollTop;
    this.highlightEl.scrollLeft = this.textarea.scrollLeft;
    this.gutterEl.scrollTop = this.textarea.scrollTop;
  }

  setValue(code) {
    if (!this.textarea) return;
    this.textarea.value = code;
    this.updateHighlighting();
    this.updateGutter();
    this.updateCursorPosition();
  }

  getValue() {
    return this.textarea ? this.textarea.value : "";
  }

  updateGutter() {
    if (!this.gutterEl || !this.textarea) return;
    const linesCount = (this.textarea.value.match(/\n/g) || []).length + 1;
    let gutterHTML = "";
    for (let i = 1; i <= linesCount; i++) {
      gutterHTML += `<div class="editor-gutter-line">${i}</div>`;
    }
    this.gutterEl.innerHTML = gutterHTML;
  }

  updateCursorPosition() {
    if (!this.textarea || !this.lineColEl) return;
    const pos = this.textarea.selectionStart;
    const text = this.textarea.value.substring(0, pos);
    const lines = text.split("\n");
    const lineNum = lines.length;
    const colNum = lines[lines.length - 1].length + 1;
    this.lineColEl.textContent = `Ln ${lineNum}, Col ${colNum}`;
  }

  updateHighlighting() {
    if (!this.highlightEl || !this.textarea) return;
    const code = this.textarea.value;
    this.highlightEl.innerHTML = this.highlightPython(code) + "\n";
  }

  escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  highlightPython(code) {
    const escaped = this.escapeHTML(code);

    // Python Keywords
    const keywords = [
      "def", "class", "return", "if", "elif", "else", "while", "for", "in",
      "import", "from", "as", "try", "except", "finally", "raise", "with",
      "lambda", "pass", "break", "continue", "and", "or", "not", "is", "None",
      "True", "False", "global", "yield", "assert"
    ];
    const kwRegex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");

    // Built-in functions
    const builtins = [
      "print", "len", "range", "type", "str", "int", "float", "bool",
      "list", "dict", "set", "tuple", "input", "round", "sum", "max", "min",
      "abs", "enumerate", "zip", "super", "sorted", "filter", "map"
    ];
    const biRegex = new RegExp(`\\b(${builtins.join("|")})(?=\\()`, "g");

    // Line by line parsing for strings and comments
    const lines = escaped.split("\n");
    const highlightedLines = lines.map(line => {
      // Check for comments
      let commentPart = "";
      let codePart = line;
      const commentIndex = line.indexOf("#");
      if (commentIndex !== -1) {
        codePart = line.substring(0, commentIndex);
        commentPart = `<span class="hl-comment">${line.substring(commentIndex)}</span>`;
      }

      // Strings (double quotes, single quotes, f-strings)
      codePart = codePart.replace(/(f?["'])(.*?)(["'])/g, '<span class="hl-string">$1$2$3</span>');

      // Numbers
      codePart = codePart.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="hl-number">$1</span>');

      // Function/Class definition names
      codePart = codePart.replace(/\b(def|class)\s+([a-zA-Z_]\w*)/g, '<span class="hl-keyword">$1</span> <span class="hl-defname">$2</span>');

      // Keywords
      codePart = codePart.replace(kwRegex, '<span class="hl-keyword">$1</span>');

      // Builtins
      codePart = codePart.replace(biRegex, '<span class="hl-builtin">$1</span>');

      return codePart + commentPart;
    });

    return highlightedLines.join("\n");
  }
}
