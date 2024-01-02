import { readPdfText } from 'pdf-text-reader'

async function extractTextFromPDF(pdfPath) {
  try {
    const pdfText = await readPdfText({ url: pdfPath })
    return pdfText
  } catch (error) {
    console.error('Error reading PDF:', error)
    return null
  }
}

export default extractTextFromPDF
