import { useState } from 'react'
import Compressor from 'compressorjs'

export const imgResizeCompress = (file, maxWidth, maxHeight, options = {}) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      maxWidth,
      maxHeight,
      mimeType: 'image/png',
      convertTypes: 'image/png',
      resize: 'contain',
      ...options,
      success: resolve,
      error: reject,
    })
  })
}

export const imgCropResizeCompress = async (
  file,
  width,
  height,
  options = {},
) =>
  await imgResizeCompress(file, undefined, undefined, {
    width,
    height,
    resize: 'cover',
    ...options,
  })

const fileToBlob = (file) =>
  new Promise((resolve) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      if (fileReader.readyState === 2) resolve(fileReader.result)
    }

    fileReader.readAsDataURL(file)
  })

export const useImageCompress = (maxWidthHeight, thumbWidthHeight) => {
  const [{ rawFile, file, thumbFile, thumbBlob }, setFiles] = useState({})

  const updateFile = async (newRaw) => {
    const [newFile, newThumbFile] = await Promise.all([
      imgResizeCompress(newRaw, maxWidthHeight, maxHeight),
      imgCropResizeCompress(newRaw, thumbWidthHeight, thumbHeight),
    ])

    const newThumbBlob = await fileToBlob(newThumbFile)

    setFiles({
      rawFile: newRaw,
      file: newFile,
      thumbFile: newThumbFile,
      thumbBlob: newThumbBlob,
    })
  }

  return { rawFile, file, thumbFile, thumbBlob, updateFile }
}
