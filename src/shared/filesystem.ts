export async function getFileHandle() {
  const [fileHandle] = await window.showOpenFilePicker();
  return fileHandle;
}

export async function writeFile(suggestedName: string, contents: string) {
  const handle = await window.showSaveFilePicker({
    suggestedName: suggestedName,
    types: [
      {
        description: "StepCode file",
        accept: {
          "text/plain": [".stepcode"]
        },
      },
    ],
  });
  const writable = await handle.createWritable();

  await writable.write(contents);
  await writable.close();

  return handle;
}

export async function readFile(fileHandle: FileSystemFileHandle) {
  const file = await fileHandle.getFile();
  return await file.text();
}

export async function updateFile(fileHandle: FileSystemFileHandle, contents: string) {
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}

export function isFilesystemSupported() {
  return 'showOpenFilePicker' in window;
}
