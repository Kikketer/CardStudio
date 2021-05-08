/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import { ipcRenderer } from 'electron'
import { OpenCallback } from './Types'

const openProject = async (callback: (T: OpenCallback) => void) => {
  try {
    const result = await ipcRenderer.invoke('app:on-fs-dialog-open')
    const projectPath = result.path.substr(0, result.path.indexOf(result.name))
    callback({ path: projectPath, content: result.content, name: result.name })
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

export { openProject, getFiles }
