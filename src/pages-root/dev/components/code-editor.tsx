"use client";

import React, { useRef, useCallback, useEffect, useState, useMemo } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const KEYWORDS = new Set([
  // JavaScript / TypeScript
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'do', 'switch', 'case', 'break', 'continue', 'class', 'extends', 'new',
  'this', 'super', 'import', 'export', 'from', 'default', 'as', 'try',
  'catch', 'finally', 'throw', 'async', 'await', 'yield', 'of', 'in',
  'typeof', 'instanceof', 'void', 'delete', 'with', 'debugger', 'interface',
  'type', 'enum', 'implements', 'abstract', 'private', 'protected', 'public',
  'static', 'readonly', 'declare', 'namespace', 'module', 'global',
  'undefined', 'null', 'true', 'false', 'NaN', 'Infinity',
  // Python
  'def', 'elif', 'except', 'finally', 'lambda', 'nonlocal', 'pass', 'raise',
  'yield', 'and', 'or', 'not', 'is', 'True', 'False', 'None', 'self', 'cls',
  'with', 'as',
  // Java
  'package', 'import', 'synchronized', 'volatile', 'transient', 'native',
  'strictfp', 'assert', 'throws', 'throw', 'final', 'finally',
  // C / C++
  '#include', '#define', '#ifdef', '#ifndef', '#endif', '#pragma',
  'struct', 'union', 'typedef', 'const', 'volatile', 'register',
  'extern', 'inline', 'friend', 'virtual', 'override', 'explicit',
  'mutable', 'typename', 'template', 'operator', 'namespace', 'using',
  'goto', 'sizeof', 'auto', 'register',
  // Rust
  'fn', 'mut', 'pub', 'crate', 'mod', 'impl', 'trait', 'where', 'ref',
  'match', 'move', 'dyn', 'loop', 'unsafe', 'extern',
  'Some', 'None', 'Ok', 'Err',
  // Go
  'package', 'func', 'defer', 'go', 'chan', 'select', 'range', 'map',
  'fallthrough', 'nil', 'true', 'false', 'iota',
  // C#
  'get', 'set', 'value', 'partial', 'readonly', 'event', 'delegate',
  'checked', 'unchecked', 'fixed', 'unsafe', 'stackalloc', 'sizeof',
  'nameof', 'is', 'as', 'in', 'out', 'ref', 'params',
  // Ruby
  'def', 'end', 'module', 'yield', 'alias', 'undef', 'begin', 'rescue',
  'ensure', 'redo', 'retry', 'nil', 'self', 'super',
  // Swift
  'let', 'var', 'func', 'guard', 'defer', 'where', 'associatedtype',
  'rethrows', 'subscript', 'indirect', 'convenience', 'didSet', 'willSet',
  'lazy', 'dynamic', 'optional', 'required', 'unowned', 'weak',
  // Kotlin
  'val', 'var', 'fun', 'data', 'sealed', 'inner', 'companion', 'object',
  'init', 'constructor', 'by', 'lateinit', 'tailrec', 'operator',
  'infix', 'crossinline', 'noinline', 'reified', 'suspend',
  // PHP
  'echo', 'print', 'die', 'exit', 'include', 'require', 'once',
  'clone', 'instanceof', '__construct', '__destruct', '__call',
  // Haskell / Elm
  'data', 'type', 'class', 'instance', 'where', 'let', 'in', 'of',
  'case', 'if', 'then', 'else', 'do', 'module', 'import', 'hiding',
  'qualified', 'deriving', 'infix', 'infixl', 'infixr',
  // Lua
  'local', 'repeat', 'until', 'goto', 'and', 'or', 'not',
  'nil', 'true', 'false',
  // Dart
  'var', 'final', 'late', 'required', 'deferred', 'factory', 'mixin',
  'covariant', 'typedef', 'extension', 'show', 'hide',
  // Scala
  'val', 'var', 'def', 'trait', 'object', 'case', 'sealed', 'implicit',
  'match', 'do', 'yield', 'macro',
  // Assembly (common directives)
  'section', 'global', 'extern', 'align', 'db', 'dw', 'dd', 'dq',
  'mov', 'add', 'sub', 'mul', 'div', 'jmp', 'call', 'ret', 'cmp',
  'je', 'jne', 'jg', 'jl', 'jge', 'jle', 'push', 'pop', 'int', 'syscall',
]);

const TYPES = new Set([
  // JavaScript / TypeScript
  'string', 'number', 'boolean', 'object', 'array', 'any', 'void',
  'never', 'unknown', 'Record', 'Partial', 'Required', 'Pick', 'Omit',
  'Promise', 'Map', 'Set', 'Array',
  // Python
  'int', 'float', 'str', 'bool', 'list', 'dict', 'tuple', 'set', 'bytes',
  'bytearray', 'frozenset', 'NoneType',
  // Java
  'String', 'Integer', 'Boolean', 'Double', 'Float', 'Long', 'Short',
  'Byte', 'Character', 'Object', 'List', 'Map', 'Set', 'ArrayList',
  'HashMap', 'HashSet', 'Optional',
  // Rust
  'i8', 'i16', 'i32', 'i64', 'i128', 'u8', 'u16', 'u32', 'u64', 'u128',
  'f32', 'f64', 'bool', 'char', 'String', 'Vec', 'HashMap', 'Option',
  'Result',
  // Go
  'string', 'int', 'int8', 'int16', 'int32', 'int64', 'uint', 'uint8',
  'uint16', 'uint32', 'uint64', 'float32', 'float64', 'bool', 'byte',
  'rune', 'error', 'any',
  // C# / .NET
  'int', 'long', 'short', 'byte', 'bool', 'string', 'char', 'float',
  'double', 'decimal', 'object', 'dynamic',
  // Swift
  'Int', 'Double', 'Float', 'Bool', 'String', 'Character', 'Array',
  'Dictionary', 'Set', 'Optional',
  // Kotlin
  'Int', 'Long', 'Short', 'Byte', 'Double', 'Float', 'Boolean', 'Char',
  'String', 'Array', 'List', 'Set', 'Map',
  // C / C++
  'size_t', 'int8_t', 'int16_t', 'int32_t', 'int64_t', 'uint8_t',
  'uint16_t', 'uint32_t', 'uint64_t', 'ptrdiff_t', 'wchar_t',
  'int', 'long', 'short', 'char', 'float', 'double', 'bool', 'void',
  // Dart
  'int', 'double', 'num', 'bool', 'String', 'List', 'Set', 'Map',
  'dynamic', 'void', 'Never',
  // PHP
  'int', 'float', 'string', 'bool', 'array', 'void', 'iterable',
  'callable', 'mixed', 'object',
]);

function highlightCode(code: string): string {
  const lines = code.split('\n');
  return lines
    .map((line) => {
      let escaped = '';
      let i = 0;
      while (i < line.length) {
        // Comments
        if (line[i] === '/' && line[i + 1] === '/') {
          escaped += `<span class="hl-comment">${escapeHtml(line.slice(i))}</span>`;
          break;
        }
        if (line[i] === '/' && line[i + 1] === '*') {
          const end = line.indexOf('*/', i + 2);
          if (end !== -1) {
            escaped += `<span class="hl-comment">${escapeHtml(line.slice(i, end + 2))}</span>`;
            i = end + 2;
            continue;
          }
        }

        // Strings
        if (line[i] === '"' || line[i] === "'") {
          const quote = line[i];
          let j = i + 1;
          while (j < line.length && line[j] !== quote) {
            if (line[j] === '\\') j++;
            j++;
          }
          escaped += `<span class="hl-string">${escapeHtml(line.slice(i, j + 1))}</span>`;
          i = j + 1;
          continue;
        }

        // Template literals
        if (line[i] === '`') {
          let j = i + 1;
          let depth = 0;
          while (j < line.length) {
            if (line[j] === '\\') { j += 2; continue; }
            if (line[j] === '$' && line[j + 1] === '{') depth++;
            if (depth > 0 && line[j] === '}') depth--;
            if (depth === 0 && line[j] === '`') break;
            j++;
          }
          const inner = line.slice(i + 1, j);
          let processed = '';
          let k = 0;
          while (k < inner.length) {
            if (inner[k] === '$' && inner[k + 1] === '{') {
              let depth2 = 1;
              let exprStart = k + 2;
              let pos = exprStart;
              while (pos < inner.length && depth2 > 0) {
                if (inner[pos] === '{') depth2++;
                if (inner[pos] === '}') depth2--;
                pos++;
              }
              processed += highlightCode(inner.slice(exprStart, pos - 1));
              k = pos;
            } else {
              processed += escapeHtml(inner[k]);
              k++;
            }
          }
          escaped += `<span class="hl-string">\`${processed}\`</span>`;
          i = j + 1;
          continue;
        }

        // Numbers
        if (/\d/.test(line[i]) && (i === 0 || /[\s()\[\]{}\+\-\*/=,;:]/.test(line[i - 1]))) {
          let j = i;
          while (j < line.length && /[\d.]/.test(line[j])) j++;
          escaped += `<span class="hl-number">${escapeHtml(line.slice(i, j))}</span>`;
          i = j;
          continue;
        }

        // JSX tags
        if (line[i] === '<' && /[A-Za-z]/.test(line[i + 1])) {
          let j = i + 1;
          while (j < line.length && !/>/.test(line[j]) && line[j] !== '\n') j++;
          const tagEnd = line[j] === '>' ? j + 1 : j;
          const tag = line.slice(i, tagEnd);
          const isClosing = tag.startsWith('</');
          // const tagName = tag.replace(/[<\/>\s].*$/, '').replace(/^\//, '');
          const tagName =  tag.match(/^<\/?([^\s>\/]+)/)?.[1] || ''
          const hasClosingBracket = line[j] === '>';
          if (isClosing) {
            escaped += `<span class="hl-tag">&lt;/</span><span class="hl-tag-name">${escapeHtml(tagName)}</span>`;
            if (hasClosingBracket) escaped += `<span class="hl-tag">&gt;</span>`;
          } else {
            escaped += `<span class="hl-tag">&lt;</span><span class="hl-tag-name">${escapeHtml(tagName)}</span>`;
            const attrPartStart = tagName.length + 1;
            const attrPartEnd = hasClosingBracket
              ? (tag.endsWith('/>') ? -2 : -1)
              : undefined;
            const attrPart = attrPartEnd !== undefined
              ? tag.slice(attrPartStart, attrPartEnd)
              : tag.slice(attrPartStart);
            if (attrPart) {
              const attrMatch = attrPart.match(/(\w+)(?:=(?:"[^"]*"|'[^']*'|\S+))?/g);
              if (attrMatch) {
                for (const attr of attrMatch) {
                  const [name, ...val] = attr.split('=');
                  escaped += ` <span class="hl-attr">${escapeHtml(name)}</span>`;
                  if (val.length) {
                    escaped += `=<span class="hl-string">${escapeHtml(val.join('='))}</span>`;
                  }
                }
              }
            }
            if (tag.endsWith('/>')) {
              escaped += `<span class="hl-tag"> /&gt;</span>`;
            } else if (hasClosingBracket) {
              escaped += `<span class="hl-tag">&gt;</span>`;
            }
          }
          i = tagEnd;
          continue;
        }

        // Brackets / parentheses content
        if (line[i] === '(' || line[i] === '[') {
          const close = line[i] === '(' ? ')' : ']';
          let depth = 1;
          let j = i + 1;
          while (j < line.length && depth > 0) {
            if (line[j] === line[i]) depth++;
            if (line[j] === close) depth--;
            if (depth > 0) j++;
          }
          const inner = line.slice(i + 1, j);
          const innerHighlighted = inner ? highlightCode(inner) : '';
          escaped += `<span class="hl-bracket">${escapeHtml(line[i])}${innerHighlighted}${escapeHtml(line[j] || '')}</span>`;
          i = (j < line.length ? j : j - 1) + 1;
          continue;
        }

        // Closing JSX tags
        if (line[i] === '<' && line[i + 1] === '/') {
          let j = i + 2;
          while (j < line.length && line[j] !== '>') j++;
          const hasClosingBracket = line[j] === '>';
          const tagContent = escapeHtml(line.slice(i + 2, hasClosingBracket ? j : j));
          escaped += `<span class="hl-tag">&lt;/</span><span class="hl-tag-name">${tagContent}</span>`;
          if (hasClosingBracket) escaped += `<span class="hl-tag">&gt;</span>`;
          i = (hasClosingBracket ? j : j - 1) + 1;
          continue;
        }

        // Words (keywords, types)
        if (/[A-Za-z_]/.test(line[i])) {
          let j = i;
          while (j < line.length && /[\w$]/.test(line[j])) j++;
          const word = line.slice(i, j);
          if (KEYWORDS.has(word)) {
            escaped += `<span class="hl-keyword">${escapeHtml(word)}</span>`;
          } else if (TYPES.has(word) || (word[0] >= 'A' && word[0] <= 'Z')) {
            escaped += `<span class="hl-type">${escapeHtml(word)}</span>`;
          } else if (i > 0 && line[i - 1] === '.') {
            escaped += `<span class="hl-property">${escapeHtml(word)}</span>`;
          } else {
            const afterWord = line.slice(j).trimStart();
            if (afterWord[0] === '(') {
              escaped += `<span class="hl-function">${escapeHtml(word)}</span>`;
            } else {
              escaped += escapeHtml(word);
            }
          }
          i = j;
          continue;
        }

        escaped += escapeHtml(line[i]);
        i++;
      }
      return escaped;
    })
    .join('\n');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  fileName?: string;
  fontSize?: number;
  showSearch?: boolean;
  onToggleSearch?: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  fileName,
  fontSize = 13,
  showSearch = false,
  onToggleSearch,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);
  const [scrollTop, setScrollTop] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMatch, setCurrentMatch] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  const matchCount = useMemo(() => {
    if (!searchQuery) return 0;
    let count = 0;
    let idx = 0;
    while (true) {
      idx = value.indexOf(searchQuery, idx);
      if (idx === -1) break;
      count++;
      idx += searchQuery.length;
    }
    return count;
  }, [value, searchQuery]);

  const lines = value.split('\n');
  const lineCount = lines.length;

  // Sync textarea when value changes externally (file switch)
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    if (value !== valueRef.current) {
      const prevLen = valueRef.current.length;
      valueRef.current = value;
      ta.value = value;
      // Keep cursor at end if text was replaced externally
      if (Math.abs(value.length - prevLen) > 1) {
        ta.selectionStart = ta.selectionEnd = value.length;
      }
    }
  }, [value]);

  const updateActiveLine = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const currentVal = valueRef.current;
    const line = currentVal.substring(0, ta.selectionStart).split('\n').length - 1;
    setActiveLine(line);
  }, []);

  useEffect(() => {
    updateActiveLine();
  }, [value, updateActiveLine]);

  const syncValue = useCallback((newValue: string) => {
    valueRef.current = newValue;
    onChange(newValue);
  }, [onChange]);

  const handleScroll = useCallback(() => {
    if (textareaRef.current) {
      setScrollTop(textareaRef.current.scrollTop);
    }
  }, []);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.addEventListener('scroll', handleScroll);
    const onSelectionChange = () => {
      if (document.activeElement === ta) updateActiveLine();
    };
    document.addEventListener('selectionchange', onSelectionChange);
    return () => {
      ta.removeEventListener('scroll', handleScroll);
      document.removeEventListener('selectionchange', onSelectionChange);
    };
  }, [handleScroll, updateActiveLine]);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLTextAreaElement>) => {
      const newValue = (e.target as HTMLTextAreaElement).value;
      valueRef.current = newValue;
      syncValue(newValue);
    },
    [syncValue]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const ta = e.currentTarget;
      const currentVal = valueRef.current;

      // Ctrl+F / Cmd+F to toggle search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        onToggleSearch?.();
        return;
      }

      if (e.key === 'Tab') {
        e.preventDefault();
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newValue = currentVal.substring(0, start) + '  ' + currentVal.substring(end);
        ta.value = newValue;
        valueRef.current = newValue;
        syncValue(newValue);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 2;
          updateActiveLine();
        });
        return;
      }

      // Auto-close JSX/HTML tags on >
      if (e.key === '>') {
        e.preventDefault();
        const start = ta.selectionStart;
        const end = ta.selectionEnd;

        const beforeCursor = currentVal.substring(0, start);
        const tagMatch = beforeCursor.match(/<([a-zA-Z][a-zA-Z0-9]*)(?:\s[^>]*)?$/);
        const emptyTagMatch = !tagMatch && beforeCursor.match(/<$/);

        let insertText = '>';

        if (tagMatch) {
          const tagName = tagMatch[1];
          insertText = '>' + `</${tagName}>`;
        } else if (emptyTagMatch) {
          insertText = '></>';
        }

        const newValue = currentVal.substring(0, start) + insertText + currentVal.substring(end);
        ta.value = newValue;
        valueRef.current = newValue;
        syncValue(newValue);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 1;
          updateActiveLine();
        });
        return;
      }

      const pairs: Record<string, string> = {
        '(': ')', '[': ']', '{': '}',
      };
      if (e.key in pairs) {
        e.preventDefault();
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newValue = currentVal.substring(0, start) + e.key + pairs[e.key] + currentVal.substring(end);
        ta.value = newValue;
        valueRef.current = newValue;
        syncValue(newValue);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 1;
          updateActiveLine();
        });
        return;
      }
    },
    [syncValue, updateActiveLine, onToggleSearch]
  );

  const highlighted = highlightCode(value);

  // Search highlight layer on top of syntax highlight
  const searchHighlighted = useMemo(() => {
    if (!searchQuery || !value) return '';
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedQuery, 'gi');
    let result = '';
    let lastIndex = 0;
    let matchIdx = 0;
    let copy = value;
    let m;
    while ((m = regex.exec(copy)) !== null) {
      const before = escapeHtml(copy.slice(lastIndex, m.index));
      const matched = escapeHtml(copy.slice(m.index, m.index + m[0].length));
      const isCurrent = matchIdx === currentMatch;
      result += before + `<mark class="${isCurrent ? 'hl-search-current' : 'hl-search'}">${matched}</mark>`;
      lastIndex = m.index + m[0].length;
      matchIdx++;
    }
    result += escapeHtml(copy.slice(lastIndex));
    return result;
  }, [value, searchQuery, currentMatch]);

  return (
    <div className="h-full flex flex-col bg-[var(--ui-background-tertiary)]">
      {fileName && (
        <div className="flex items-center gap-2 px-4 py-2 bg-[var(--ui-background)] border-b border-[var(--ui-border)]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--ui-error)]/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--ui-warning)]/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--ui-success)]/70" />
          </div>
          <span className="text-xs text-[var(--ui-text-secondary)] ml-2 font-mono">
            {fileName}
          </span>
          <span className="text-[10px] text-[var(--ui-text-muted)] ml-auto opacity-50">
            {lineCount} lines
          </span>
        </div>
      )}

      {/* Search bar */}
      {showSearch && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--ui-background)] border-b border-[var(--ui-border)] shrink-0">
          <FiSearch className="w-3 h-3 text-[var(--ui-text-muted)]" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentMatch(0); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (e.shiftKey) {
                  setCurrentMatch((prev) => (prev - 1 + matchCount) % matchCount || 0);
                } else {
                  setCurrentMatch((prev) => (prev + 1) % matchCount || 0);
                }
              }
              if (e.key === 'Escape') {
                onToggleSearch?.();
              }
            }}
            placeholder="Search..."
            className="flex-1 text-xs bg-transparent border-none outline-none text-[var(--ui-text)] placeholder-[var(--ui-text-muted)]"
            autoFocus
          />
          <span className="text-[11px] text-[var(--ui-text-muted)] select-none whitespace-nowrap">
            {searchQuery ? `${currentMatch + 1}/${matchCount}` : ''}
          </span>
          <button
            onClick={onToggleSearch}
            className="rounded hover:bg-[var(--ui-text)]/5 text-[var(--ui-text-muted)] hover:text-[var(--ui-primary)] transition-all p-0.5"
          >
            <FiX className="w-3 h-3" />
          </button>
        </div>
      )}

      <div className="flex-1 relative overflow-hidden" style={{ font: `600 ${fontSize}px/1.6 'Geist Mono','JetBrains Mono','Fira Code',monospace` }}>
        {/* Background octopus watermark */}
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: 'url(/icon.ico)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            opacity: 0.06,
            transform: 'scale(0.7)',
            imageRendering: 'pixelated',
          }}
        />
        <div className="absolute inset-0 flex">
          {/* Line numbers */}
          <div
            className="select-none text-right overflow-hidden shrink-0 border-r border-[var(--ui-border)]"
            style={{ width: 52, minWidth: 52, padding: '0px 0' }}
          >
            <div style={{ transform: `translateY(-${scrollTop}px)` }}>
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i}
                  className={`px-1 ${
                    i === activeLine
                      ? 'text-[var(--ui-primary)] font-semibold'
                      : 'text-[var(--ui-text-muted)]/40'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Editor area */}
          <div className="flex-1 relative">
            {/* Active line highlight */}
            <div
              className="absolute pointer-events-none bg-[var(--ui-primary)]/5 border-l-2 border-[var(--ui-primary)]/40"
              style={{
                top: `${activeLine * 1.6}em`,
                height: '1.6em',
                left: 0,
                right: 0,
                transform: `translateY(-${scrollTop}px)`,
              }}
            />

            {/* Highlight layer (behind textarea) */}
            <div
              ref={highlightRef}
              className="absolute inset-0 overflow-hidden pointer-events-none"
              aria-hidden="true"
              style={{ padding: '0 0 0 8px', boxSizing: 'border-box' }}
            >
              <div style={{ transform: `translateY(-${scrollTop}px)` }}>
              <pre
                style={{ margin: 0, padding: 0, border: 0, background: 'transparent', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
              >
                <code
                  style={{ color: 'var(--ui-text)', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              </pre>
              </div>
            </div>

            {/* Search highlight layer */}
            {searchHighlighted && (
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                aria-hidden="true"
                style={{ padding: '0 0 0 8px', boxSizing: 'border-box' }}
              >
                <div style={{ transform: `translateY(-${scrollTop}px)` }}>
                <pre
                  style={{ margin: 0, padding: 0, border: 0, background: 'transparent', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
                >
                  <code
                    style={{ color: 'transparent', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
                    dangerouslySetInnerHTML={{ __html: searchHighlighted }}
                  />
                </pre>
                </div>
              </div>
            )}

            {/* Textarea for input (in front) */}
            <textarea
              ref={textareaRef}
              defaultValue={value}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                padding: '0 0 0 8px',
                margin: 0,
                border: 0,
                outline: 'none',
                background: 'transparent',
                color: 'transparent',
                caretColor: 'var(--ui-text)',
                resize: 'none',
                overflow: 'auto',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                boxShadow: 'none',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        .hl-keyword { color: var(--ui-primary); }
        .hl-string { color: var(--ui-success); }
        .hl-number { color: var(--ui-warning); }
        .hl-comment { color: var(--ui-text-muted); font-style: italic; }
        .hl-function { color: var(--ui-info); }
        .hl-type { color: var(--ui-info); }
        .hl-tag { color: var(--ui-error); }
        .hl-tag-name { color: var(--ui-warning); }
        .hl-attr { color: var(--ui-primary-hover); }
        .hl-property { color: var(--ui-primary-hover); }
        .hl-bracket { color: var(--ui-warning); }
        .hl-search { background: rgba(255, 255, 0, 0.25); border-radius: 2px; }
        .hl-search-current { background: rgba(255, 200, 0, 0.5); border-radius: 2px; outline: 1px solid rgba(255, 200, 0, 0.8); }
      `}</style>
    </div>
  );
};
