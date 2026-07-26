"use client";

import React, { useState, useRef, useCallback } from 'react';
import {
  FiFile,
  FiFolder,
  FiFolderPlus,
  FiFilePlus,
  FiTrash2,
  FiEdit2,
  FiChevronRight,
  FiUpload,
  FiDownload,
} from 'react-icons/fi';
import { FileNode, FileAction, flattenTree, downloadAsZip } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface FileExplorerProps {
  files: FileNode[];
  dispatch: React.Dispatch<FileAction>;
  activeFileId: string | null;
  onSelectFile: (id: string) => void;
}

interface TreeNodeProps {
  node: FileNode;
  depth: number;
  dispatch: React.Dispatch<FileAction>;
  activeFileId: string | null;
  onSelectFile: (id: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  depth,
  dispatch,
  activeFileId,
  onSelectFile,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(node.name);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isActive = activeFileId === node.id;

  const handleRename = useCallback(() => {
    if (renameValue.trim() && renameValue !== node.name) {
      dispatch({ type: 'RENAME', id: node.id, name: renameValue.trim() });
    }
    setIsRenaming(false);
  }, [dispatch, node.id, node.name, renameValue]);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', node.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (node.type === 'folder') {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const draggedId = e.dataTransfer.getData('text/plain');
    if (draggedId && draggedId !== node.id) {
      dispatch({ type: 'MOVE', id: draggedId, targetParentId: node.id });
    }
  };

  const paddingLeft = 12 + depth * 16;

  if (node.type === 'folder') {
    return (
      <div>
        <div
          className={`flex items-center gap-1 px-2 py-1.5 cursor-pointer rounded-lg transition-all duration-150 group select-none
            ${isDragOver ? 'bg-[var(--ui-primary)]/20 ring-1 ring-[var(--ui-primary)]' : 'hover:bg-[var(--ui-text)]/5'}`}
          style={{ paddingLeft }}
          onClick={() => setExpanded(!expanded)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <FiChevronRight className="w-3.5 h-3.5 text-[var(--ui-text-muted)]" />
          </motion.div>
          <FiFolder className="w-4 h-4 text-[var(--ui-warning)] shrink-0" />
          {isRenaming ? (
            <input
              ref={inputRef}
              autoFocus
              className="flex-1 bg-[var(--ui-background-tertiary)] text-[var(--ui-text)] text-xs px-1.5 py-0.5 rounded border border-[var(--ui-primary)] outline-none"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename();
                if (e.key === 'Escape') setIsRenaming(false);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="text-xs text-[var(--ui-text-secondary)] truncate flex-1">
              {node.name}
            </span>
          )}
          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const name = prompt('Enter file name:');
                if (name) dispatch({ type: 'CREATE_FILE', parentId: node.id, name });
              }}
              className="p-1 rounded hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-success)] transition-colors"
              title="New file"
            >
              <FiFilePlus className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const name = prompt('Enter folder name:');
                if (name) dispatch({ type: 'CREATE_FOLDER', parentId: node.id, name });
              }}
              className="p-1 rounded hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-info)] transition-colors"
              title="New folder"
            >
              <FiFolderPlus className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsRenaming(true);
                setRenameValue(node.name);
                setTimeout(() => inputRef.current?.select(), 0);
              }}
              className="p-1 rounded hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-info)] transition-colors"
              title="Rename"
            >
              <FiEdit2 className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Delete folder?')) dispatch({ type: 'DELETE', id: node.id });
              }}
              className="p-1 rounded hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-error)] transition-colors"
              title="Delete"
            >
              <FiTrash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              {node.children.map((child) => (
                <TreeNode
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  dispatch={dispatch}
                  activeFileId={activeFileId}
                  onSelectFile={onSelectFile}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-lg transition-all duration-150 group select-none
        ${isActive
          ? 'bg-[var(--ui-primary)]/15 text-[var(--ui-primary)] ring-1 ring-[var(--ui-primary)]/30'
          : 'hover:bg-[var(--ui-text)]/5 text-[var(--ui-text-secondary)]'}`}
      style={{ paddingLeft }}
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelectFile(node.id)}
    >
      <FiFile className="w-4 h-4 shrink-0 text-[var(--ui-info)]" />
      {isRenaming ? (
        <input
          ref={inputRef}
          autoFocus
          className="flex-1 bg-[var(--ui-background-tertiary)] text-[var(--ui-text)] text-xs px-1.5 py-0.5 rounded border border-[var(--ui-primary)] outline-none"
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename();
            if (e.key === 'Escape') setIsRenaming(false);
          }}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className="text-xs truncate flex-1">{node.name}</span>
      )}
      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsRenaming(true);
            setRenameValue(node.name);
            setTimeout(() => inputRef.current?.select(), 0);
          }}
          className="p-1 rounded hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-info)] transition-colors"
          title="Rename"
        >
          <FiEdit2 className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm('Delete file?')) dispatch({ type: 'DELETE', id: node.id });
          }}
          className="p-1 rounded hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-error)] transition-colors"
          title="Delete"
        >
          <FiTrash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  dispatch,
  activeFileId,
  onSelectFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleFileImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const rootFolder = files.find((n) => n.type === 'folder');
    const rootId = rootFolder?.id || '';

    Array.from(selectedFiles).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string || '';
        dispatch({
          type: 'IMPORT_FILE',
          parentId: rootId,
          name: file.name,
          content,
        });
      };
      reader.readAsText(file);
    });

    e.target.value = '';
  }, [dispatch, files]);

  const handleFolderImport = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    Array.from(selectedFiles).forEach((file) => {
      // Get relative path by removing the first directory segment
      const fullPath = (file as any).webkitRelativePath || file.name;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string || '';
        dispatch({
          type: 'IMPORT_FOLDER',
          path: fullPath,
          content,
        });
      };
      reader.readAsText(file);
    });

    e.target.value = '';
  }, [dispatch]);

  const handleDownload = useCallback(() => {
    const flat = flattenTree(files);
    if (flat.length === 0) return;
    downloadAsZip(flat, 'project');
  }, [files]);

  return (
    <div className="h-full flex flex-col">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileImport}
        style={{ display: 'none' }}
      />
      <input
        ref={folderInputRef}
        type="file"
        multiple
        /* @ts-ignore */
        webkitdirectory=""
        onChange={handleFolderImport}
        style={{ display: 'none' }}
      />

      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[var(--ui-border)]">
        <span className="text-xs font-semibold tracking-wider text-[var(--ui-text-muted)] uppercase">
          Explorer
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 rounded-lg hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-primary)] transition-all"
            title="Import files"
          >
            <FiUpload className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => folderInputRef.current?.click()}
            className="p-1.5 rounded-lg hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-primary)] transition-all"
            title="Import folder"
          >
            <FiFolderPlus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-info)] transition-all"
            title="Download all"
          >
            <FiDownload className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-[var(--ui-border)] mx-0.5 self-center" />
          <button
            onClick={() => {
              const name = prompt('Enter file name:');
              if (name) dispatch({ type: 'CREATE_FILE', parentId: files[0]?.id || '', name });
            }}
            className="p-1.5 rounded-lg hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-success)] transition-all"
            title="New file"
          >
            <FiFilePlus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              const name = prompt('Enter folder name:');
              if (name)
                dispatch({ type: 'CREATE_FOLDER', parentId: files[0]?.id || '', name });
            }}
            className="p-1.5 rounded-lg hover:bg-[var(--ui-text)]/10 text-[var(--ui-text-muted)] hover:text-[var(--ui-info)] transition-all"
            title="New folder"
          >
            <FiFolderPlus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5 custom-scroll">
        {files.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            dispatch={dispatch}
            activeFileId={activeFileId}
            onSelectFile={onSelectFile}
          />
        ))}
      </div>
    </div>
  );
};
