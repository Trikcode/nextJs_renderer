'use'
import React from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

async function readPdf(file) {
  const reader = new FileReader()
  reader.onload = async (e) => {
    const buffer = e.target.result
    const pdf = await pdfjsLib.getDocument(new Uint8Array(buffer)).promise
    const numPages = pdf.numPages

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const textItems = textContent.items.map((item) => item.str)
      const text = textItems.join(' ') // Join text items on the page
      console.log('Text on page', i, ':', text)
    }
  }
  reader.readAsArrayBuffer(file)
}

export default function HomePage() {
  return (
    <div>
      <h1>PDF to Text</h1>
      <input type='file' onChange={(e) => readPdf(e.target.files[0])} />
    </div>
  )
}
