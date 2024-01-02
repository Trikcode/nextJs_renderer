// FileUploadComponent.js
'use client'
import React, { useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit'

const HomePage = () => {
  const { speak, cancel } = useSpeechSynthesis()
  const [fileText, setFileText] = useState('')
  const [fileUploaded, setFileUploaded] = useState(false)

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = async (e) => {
      const text = e.target.result
      setFileText(text)
      setFileUploaded(true)
    }

    reader.readAsText(file)
  }

  const handleSpeech = () => {
    speak({ text: fileText })
  }

  const handleStopSpeech = () => {
    cancel()
  }

  return (
    <div>
      <input type='file' onChange={handleFileUpload} />
      {fileUploaded && (
        <div>
          <button onClick={handleSpeech}>Play Text as Speech</button>
          <button onClick={handleStopSpeech}>Stop Speech</button>
        </div>
      )}
    </div>
  )
}

export default HomePage
