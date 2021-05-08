/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import { ipcRenderer } from 'electron'

const openFile = async (setProjectPath: (path: string) => void) => {
  try {
    const result = await ipcRenderer.invoke('app:on-fs-dialog-open')
    const projectPath = result.path.substr(0, result.path.indexOf(result.name))
    console.log('Path: ', projectPath)
    setProjectPath(projectPath)
  } catch (err) {
    console.error(err)
  }
}

const getFiles = async () => {
  console.log('Do it...')
  try {
    const result = await ipcRenderer.invoke('app:get-files')
    console.log(result)
  } catch (err) {
    console.error(err)
  }
}

export { openFile, getFiles }
