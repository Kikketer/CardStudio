// import { ipcMain } from 'electron'
import path from 'path'
import fs from 'fs-extra'
import os from 'os'
import open from 'open'
import chokidar from 'chokidar'

// local dependencies
// const notification = require('./notification')

// get application directory
const appDir = path.resolve(os.homedir(), 'electron-app-files')

declare interface File {
  name: string
  path: string
}

/** ************************* */

// get the list of files
const getFiles = (projectDirectory: string) => {
  const files = fs.readdirSync(projectDirectory)

  return files.map((filename) => {
    const filePath = path.resolve(projectDirectory, filename)
    const fileStats = fs.statSync(filePath)

    return {
      name: filename,
      path: filePath,
      size: Number(fileStats.size / 1000).toFixed(1), // kb
    }
  })
}

/** ************************* */

// add files
const addFiles = (files: File[] = []) => {
  // ensure `appDir` exists
  fs.ensureDirSync(appDir)

  // copy `files` recursively (ignore duplicate file names)
  files.forEach((file) => {
    const filePath = path.resolve(appDir, file.name)

    if (!fs.existsSync(filePath)) {
      fs.copyFileSync(file.path, filePath)
    }
  })

  // display notification
  // notification.filesAdded(files.length)
}

// delete a file
const deleteFile = (filename: string) => {
  const filePath = path.resolve(appDir, filename)

  // remove file from the file system
  if (fs.existsSync(filePath)) {
    fs.removeSync(filePath)
  }
}

// open a file
const openFile = (filename: string) => {
  const filePath = path.resolve(appDir, filename)

  // open a file using default application
  if (fs.existsSync(filePath)) {
    open(filePath)
  }
}

/*-----*/

// watch files from the application's storage directory
const watchFiles = (win: { webContents: { send: (message: string, path: string) => void } }) => {
  chokidar.watch(appDir).on('unlink', (filepath) => {
    win.webContents.send('app:delete-file', path.parse(filepath).base)
  })
}

export { getFiles, addFiles, deleteFile, openFile, watchFiles }
