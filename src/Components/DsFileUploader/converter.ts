import type { TContentType, TFile } from './DsFileUploader.Types'

export const fileToFileUploader = async (
  file: File,
  contentType: TContentType
): Promise<TFile<TContentType>> => {
  const { name, type, size } = file

  let content: TFile<TContentType>['content'] = file
  if (contentType === 'BASE64') {
    content = await fileToBase64(file)
    content = content.replace('data:image/png;base64,', '')
  }

  const fileUploader: TFile<TContentType> = {
    name,
    type,
    size,
    content
  }

  return fileUploader
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}