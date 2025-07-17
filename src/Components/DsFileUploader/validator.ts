import { ERROR_CODES, type TErrorCodes } from './DsFileUploader.Types'

export const getFileValidator = (
  accept: string,
  minSize: number | undefined = 0,
  maxSize: number | undefined = Infinity
) => {
  const validateFileType = getFileTypeValidator(accept)

  return (file: File): TErrorCodes | undefined => {
    const { size, type } = file

    if (!validateMinSize(size, minSize)) {
      return ERROR_CODES.FILE_SIZE_BELOW_MIN
    }

    if (!validateMaxSize(size, maxSize)) {
      return ERROR_CODES.MAX_FILE_SIZE_EXCEEDED
    }

    if (!validateFileType(type)) {
      return ERROR_CODES.INVALID_FILE_TYPE
    }
  }
}

const validateMinSize = (size: number, minSize: number | undefined = 0) => {
  return size >= minSize
}

const validateMaxSize = (
  size: number,
  maxSize: number | undefined = Infinity
) => {
  return size <= maxSize
}

const getFileTypeValidator = (accept: string) => {
  // Escape dots and replace wildcards with .* for regex
  const typesPattern = accept
    .split(',')
    .map(type => type.trim())
    .map(type => type.replace(/\./g, '\\.').replace(/\*/g, '.*'))
    .join('|')

  // Create a regex with start and end anchors
  const typesRegex = new RegExp(`^(${typesPattern})$`)

  // Validator function
  const validateFileType = (mimeType: string) => {
    return typesRegex.test(mimeType)
  }

  return validateFileType
}
