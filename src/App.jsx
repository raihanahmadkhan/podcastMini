import { useState } from 'react'

function App() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const mockSummary = `In this episode, we explored the fascinating world of AI and machine learning. 
  Key highlights include: the evolution of neural networks, practical applications in healthcare, 
  and the ethical considerations of AI deployment. Our guest expert shared insights on how 
  businesses can leverage AI for competitive advantage while maintaining responsible practices.`

  const mockAudioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/wav')) {
      setUploadedFile(file)
      setShowResults(false)
    } else {
      alert('Please upload a valid .mp3 or .wav file')
    }
  }

  const handleGenerateSummary = () => {
    if (!uploadedFile) {
      alert('Please upload a file first!')
      return
    }

    setIsProcessing(true)
    
    setTimeout(() => {
      setIsProcessing(false)
      setShowResults(true)
    }, 2000)
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 p-md-5">
              
              <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-2">
                  🎧 PodcastMini
                </h1>
                <p className="text-muted fs-5">Your Podcast, Simplified</p>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Upload Podcast Audio
                </label>
                <div className="border border-2 border-dashed rounded-3 p-4 text-center" style={{borderColor: '#dee2e6'}}>
                  <input
                    type="file"
                    accept=".mp3,.wav"
                    onChange={handleFileUpload}
                    className="d-none"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer d-flex flex-column align-items-center"
                    style={{cursor: 'pointer'}}
                  >
                    <svg
                      width="48"
                      height="48"
                      className="text-secondary mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="text-secondary">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-muted small mt-1">
                      MP3 or WAV files only
                    </span>
                  </label>
                </div>
                
                {uploadedFile && (
                  <div className="alert alert-success d-flex align-items-center mt-3" role="alert">
                    <svg width="20" height="20" className="me-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      File uploaded successfully: <strong>{uploadedFile.name}</strong>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerateSummary}
                disabled={!uploadedFile || isProcessing}
                className="btn btn-primary btn-lg w-100 mb-4"
                style={{backgroundColor: '#7c3aed', borderColor: '#7c3aed'}}
              >
                {isProcessing ? 'Processing...' : 'Generate Summary'}
              </button>

              {isProcessing && (
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <div className="spinner-border text-primary me-3" role="status" style={{color: '#7c3aed'}}>
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <span className="text-muted">
                    Analyzing your podcast...
                  </span>
                </div>
              )}

              {showResults && (
                <div>
                  <div className="mb-4">
                    <h2 className="h4 fw-semibold mb-3">
                      📝 Summary
                    </h2>
                    <div className="bg-light rounded-3 p-4 border">
                      <p className="mb-0">{mockSummary}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h2 className="h4 fw-semibold mb-3">
                      🎵 Mini Podcast
                    </h2>
                    <div className="bg-light rounded-3 p-4 border">
                      <audio
                        controls
                        className="w-100"
                        src={mockAudioUrl}
                      >
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-center mt-4">
                <p className="text-muted small mb-0">
                  AI Ready • Start generating your podcast summary
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
