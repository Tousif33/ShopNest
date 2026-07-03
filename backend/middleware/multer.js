import multer from 'multer'

const storage = multer.memoryStorage();

// single upload
export const SingleUpload = multer({storage}).single("file")

// multiple uploads
export const MultipleUpload = multer({storage}).array("files",5)
