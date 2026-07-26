export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content: string;
  children: FileNode[];
}

export type FileAction =
  | { type: 'CREATE_FILE'; parentId: string; name: string }
  | { type: 'CREATE_FOLDER'; parentId: string; name: string }
  | { type: 'DELETE'; id: string }
  | { type: 'RENAME'; id: string; name: string }
  | { type: 'UPDATE_CONTENT'; id: string; content: string }
  | { type: 'MOVE'; id: string; targetParentId: string }
  | { type: 'IMPORT_FILE'; parentId: string; name: string; content: string }
  | { type: 'IMPORT_FOLDER'; path: string; content: string }; // path is relative like "src/components/App.tsx"

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function createFileSystem(): FileNode[] {
  const src: FileNode = {
    id: generateId(),
    name: 'src',
    type: 'folder',
    content: '',
    children: [
      {
        id: generateId(),
        name: 'index.ts',
        type: 'file',
        content: `console.log('Hello, world!');`,
        children: [],
      },
      {
        id: generateId(),
        name: 'app.tsx',
        type: 'file',
        content: `import React from 'react';\n\nexport const App = () => {\n  return (\n    <div>\n      <h1>Hello, world!</h1>\n    </div>\n  );\n};`,
        children: [],
      },
    ],
  };

  const shared: FileNode = {
    id: generateId(),
    name: 'shared',
    type: 'folder',
    content: '',
    children: [
      {
        id: generateId(),
        name: 'utils.ts',
        type: 'file',
        content: `export const greet = (name: string): string => {\n  return \`Hello, \${name}!\`;\n};`,
        children: [],
      },
    ],
  };

  return [
    src,
    shared,
    {
      id: generateId(),
      name: 'README.md',
      type: 'file',
      content: `# Project\n\nThis is a demo project.`,
      children: [],
    },
  ];
}

function findNode(nodes: FileNode[], id: string): FileNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

function removeNode(nodes: FileNode[], id: string): FileNode[] {
  return nodes
    .filter((n) => n.id !== id)
    .map((n) => ({
      ...n,
      children: n.type === 'folder' ? removeNode(n.children, id) : n.children,
    }));
}

function addToFolder(
  nodes: FileNode[],
  parentId: string,
  newNode: FileNode
): FileNode[] {
  return nodes.map((n) => {
    if (n.id === parentId && n.type === 'folder') {
      return { ...n, children: [...n.children, newNode] };
    }
    if (n.children) {
      return { ...n, children: addToFolder(n.children, parentId, newNode) };
    }
    return n;
  });
}

function renameNode(nodes: FileNode[], id: string, name: string): FileNode[] {
  return nodes.map((n) => {
    if (n.id === id) return { ...n, name };
    if (n.children) {
      return { ...n, children: renameNode(n.children, id, name) };
    }
    return n;
  });
}

function updateContent(
  nodes: FileNode[],
  id: string,
  content: string
): FileNode[] {
  return nodes.map((n) => {
    if (n.id === id) return { ...n, content };
    if (n.children) {
      return { ...n, children: updateContent(n.children, id, content) };
    }
    return n;
  });
}

function moveNode(
  nodes: FileNode[],
  id: string,
  targetParentId: string
): FileNode[] {
  const nodeToMove = findNode(nodes, id);
  if (!nodeToMove) return nodes;

  const withoutSource = removeNode(nodes, id);
  const movedNode = { ...nodeToMove };

  return addToFolder(withoutSource, targetParentId, movedNode);
}

function getOrCreateFolder(nodes: FileNode[], pathParts: string[], rootId: string): FileNode[] {
  if (pathParts.length === 0) return nodes;

  const folderName = pathParts[0];
  // Find existing folder with this name under rootId
  const root = findNode(nodes, rootId);

  // Actually, we need to walk through the tree following the path
  let currentNodes = nodes;
  for (let i = 0; i < pathParts.length; i++) {
    const name = pathParts[i];
    const existing = currentNodes.find((n) => n.name === name && n.type === 'folder');
    if (existing) {
      currentNodes = existing.children;
    } else if (currentNodes.length > 0) {
      // Create folder under last found parent
      const parent = currentNodes[0].type === 'folder' ? currentNodes[0] : currentNodes.find(n => n.type === 'folder');
      if (parent) {
        // Can't easily add here without parent ID
        return nodes;
      }
    }
  }
  return nodes;
}

function ensurePath(nodes: FileNode[], path: string, rootId: string): [FileNode[], string] {
  const parts = path.split('/');
  const fileName = parts.pop()!;
  let currentId = rootId;
  let result = nodes;

  for (const part of parts) {
    const parent = findNode(result, currentId);
    if (!parent || parent.type !== 'folder') return [result, ''];

    let folder = parent.children.find((n) => n.type === 'folder' && n.name === part);
    if (!folder) {
      folder = { id: generateId(), name: part, type: 'folder', content: '', children: [] };
      result = addToFolder(result, currentId, folder);
    }
    currentId = folder.id;
  }

  return [result, currentId];
}

export function fileReducer(
  state: FileNode[],
  action: FileAction
): FileNode[] {
  switch (action.type) {
    case 'CREATE_FILE': {
      const newNode: FileNode = {
        id: generateId(),
        name: action.name,
        type: 'file',
        content: '',
        children: [],
      };
      return addToFolder(state, action.parentId, newNode);
    }
    case 'CREATE_FOLDER': {
      const newNode: FileNode = {
        id: generateId(),
        name: action.name,
        type: 'folder',
        content: '',
        children: [],
      };
      return addToFolder(state, action.parentId, newNode);
    }
    case 'DELETE':
      return removeNode(state, action.id);
    case 'RENAME':
      return renameNode(state, action.id, action.name);
    case 'UPDATE_CONTENT':
      return updateContent(state, action.id, action.content);
    case 'MOVE':
      return moveNode(state, action.id, action.targetParentId);
    case 'IMPORT_FILE': {
      const newNode: FileNode = {
        id: generateId(),
        name: action.name,
        type: 'file',
        content: action.content,
        children: [],
      };
      return addToFolder(state, action.parentId, newNode);
    }
    case 'IMPORT_FOLDER': {
      const rootFolder = state.find((n) => n.type === 'folder');
      const rootId = rootFolder?.id || '';
      if (!rootId) return state;
      const [newState, parentId] = ensurePath(state, action.path, rootId);
      const fileName = action.path.split('/').pop()!;
      const fileNode: FileNode = {
        id: generateId(),
        name: fileName,
        type: 'file',
        content: action.content,
        children: [],
      };
      return addToFolder(newState, parentId, fileNode);
    }
    default:
      return state;
  }
}

export function getAllFiles(nodes: FileNode[]): FileNode[] {
  const result: FileNode[] = [];
  function walk(list: FileNode[]) {
    for (const node of list) {
      if (node.type === 'file') result.push(node);
      if (node.children) walk(node.children);
    }
  }
  walk(nodes);
  return result;
}

export function flattenTree(nodes: FileNode[]): Array<{ path: string; content: string }> {
  const result: Array<{ path: string; content: string }> = [];

  function walk(list: FileNode[], prefix: string) {
    for (const node of list) {
      const fullPath = prefix ? `${prefix}/${node.name}` : node.name;
      if (node.type === 'file') {
        result.push({ path: fullPath, content: node.content });
      }
      if (node.children) {
        walk(node.children, fullPath);
      }
    }
  }

  walk(nodes, '');
  return result;
}

export function downloadAsZip(files: Array<{ path: string; content: string }>, projectName: string = 'project'): void {
  // Simple ZIP creation without compression (store method)
  // Based on the ZIP file format specification

  const encoder = new TextEncoder();

  // Helper to write a Uint32LE value
  function writeUint32(view: DataView, offset: number, value: number) {
    view.setUint32(offset, value, true);
  }
  function writeUint16(view: DataView, offset: number, value: number) {
    view.setUint16(offset, value, true);
  }

  // Encode file entries and build central directory
  const localHeaders: ArrayBuffer[] = [];
  const centralEntries: ArrayBuffer[] = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.path);
    const contentBytes = encoder.encode(file.content);

    // Local file header
    const localSize = 30 + nameBytes.byteLength + contentBytes.byteLength;
    const localBuf = new ArrayBuffer(localSize);
    const localView = new DataView(localBuf);
    // Signature
    writeUint32(localView, 0, 0x04034b50);
    // Version needed
    writeUint16(localView, 4, 20);
    // General purpose bit flag
    writeUint16(localView, 6, 0);
    // Compression method (0 = store)
    writeUint16(localView, 8, 0);
    // Last mod file time
    writeUint16(localView, 10, 0);
    // Last mod file date
    writeUint16(localView, 12, 0);
    // CRC-32
    writeUint32(localView, 14, 0);
    // Compressed size
    writeUint32(localView, 18, contentBytes.byteLength);
    // Uncompressed size
    writeUint32(localView, 22, contentBytes.byteLength);
    // File name length
    writeUint16(localView, 26, nameBytes.byteLength);
    // Extra field length
    writeUint16(localView, 28, 0);
    // File name
    new Uint8Array(localBuf, 30, nameBytes.byteLength).set(nameBytes);
    // File data
    new Uint8Array(localBuf, 30 + nameBytes.byteLength, contentBytes.byteLength).set(contentBytes);

    localHeaders.push(localBuf);

    // Central directory entry
    const centralSize = 46 + nameBytes.byteLength;
    const centralBuf = new ArrayBuffer(centralSize);
    const centralView = new DataView(centralBuf);
    writeUint32(centralView, 0, 0x02014b50);
    writeUint16(centralView, 4, 20); // Version made by
    writeUint16(centralView, 6, 20); // Version needed
    writeUint16(centralView, 8, 0);  // General purpose bit flag
    writeUint16(centralView, 10, 0); // Compression method
    writeUint16(centralView, 12, 0); // Last mod time
    writeUint16(centralView, 14, 0); // Last mod date
    writeUint32(centralView, 16, 0); // CRC-32
    writeUint32(centralView, 20, contentBytes.byteLength); // Compressed size
    writeUint32(centralView, 24, contentBytes.byteLength); // Uncompressed size
    writeUint16(centralView, 28, nameBytes.byteLength); // File name length
    writeUint16(centralView, 30, 0); // Extra field length
    writeUint16(centralView, 32, 0); // File comment length
    writeUint16(centralView, 34, 0); // Disk number start
    writeUint16(centralView, 36, 0); // Internal file attributes
    writeUint32(centralView, 38, 0); // External file attributes
    writeUint32(centralView, 42, offset); // Relative offset of local header
    new Uint8Array(centralBuf, 46, nameBytes.byteLength).set(nameBytes);

    centralEntries.push(centralBuf);
    offset += localSize;
  }

  // End of central directory record
  const centralOffset = offset;
  const centralSize = centralEntries.reduce((s, b) => s + b.byteLength, 0);
  const eocdSize = 22;
  const eocdBuf = new ArrayBuffer(eocdSize);
  const eocdView = new DataView(eocdBuf);
  writeUint32(eocdView, 0, 0x06054b50);
  writeUint16(eocdView, 4, 0);  // Disk number
  writeUint16(eocdView, 6, 0);  // Disk number with central dir
  writeUint16(eocdView, 8, files.length); // Number of entries on this disk
  writeUint16(eocdView, 10, files.length); // Total number of entries
  writeUint32(eocdView, 12, centralSize); // Size of central directory
  writeUint32(eocdView, 16, centralOffset); // Offset of central directory
  writeUint16(eocdView, 20, 0); // Comment length

  // Combine all buffers
  const totalSize = localHeaders.reduce((s, b) => s + b.byteLength, 0) +
    centralEntries.reduce((s, b) => s + b.byteLength, 0) + eocdSize;
  const finalBuf = new ArrayBuffer(totalSize);
  const finalArr = new Uint8Array(finalBuf);
  let pos = 0;

  for (const buf of localHeaders) {
    finalArr.set(new Uint8Array(buf), pos);
    pos += buf.byteLength;
  }
  for (const buf of centralEntries) {
    finalArr.set(new Uint8Array(buf), pos);
    pos += buf.byteLength;
  }
  finalArr.set(new Uint8Array(eocdBuf), pos);

  // Trigger download
  const blob = new Blob([finalBuf], { type: 'application/zip' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
