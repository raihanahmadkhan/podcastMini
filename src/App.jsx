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
    <div className="d-flex h-100">

      <aside className="d-none d-md-flex flex-column p-4 border-end" style={{ width: '280px', borderColor: 'var(--border-color)', background: 'var(--bg-card)' }}>
        <div className="d-flex align-items-center mb-5">
          <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
            <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
          </div>
          <span className="fw-bold fs-5 text-white">PodcastMini</span>
        </div>

        <nav className="nav flex-column gap-2">
          {['Dashboard', 'Library', 'Favorites', 'Settings'].map((item, i) => (
            <a key={item} href="#" className={`nav-link rounded-3 px-3 py-2 ${i === 0 ? 'bg-primary text-white' : 'text-secondary hover-bg-dark'}`} style={{ transition: 'all 0.2s' }}>
              {item}
            </a>
          ))}
        </nav>

        <div className="mt-auto p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <p className="small text-secondary mb-2">Storage Used</p>
          <div className="progress" style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
            <div className="progress-bar bg-primary" style={{ width: '75%' }}></div>
          </div>
          <p className="tiny text-muted mt-2 mb-0">7.5GB / 10GB</p>
        </div>
      </aside>


      <main className="flex-grow-1 d-flex flex-column overflow-hidden">

        <header className="d-flex align-items-center justify-content-between p-4 border-bottom" style={{ borderColor: 'var(--border-color)' }}>
          <h1 className="h4 fw-bold mb-0 text-white">Studio</h1>
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-secondary btn-sm rounded-pill px-3">Help</button>
            <div className="rounded-circle bg-secondary" style={{ width: '32px', height: '32px' }}></div>
          </div>
        </header>


        <div className="flex-grow-1 overflow-auto p-4">
          <div className="row g-4 h-100">

            <div className="col-lg-8 d-flex flex-column gap-4">

              <div className="card border-0 glass-panel flex-grow-1" style={{ minHeight: '400px' }}>
                <div className="card-body d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden">
                  {showResults ? (
                    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                      <div className="d-flex align-items-end gap-1 mb-5" style={{ height: '120px' }}>
                        {[...Array(40)].map((_, i) => (
                          <div
                            key={i}
                            className="waveform-bar"
                            style={{
                              height: `${Math.random() * 100}%`,
                              animationDelay: `${i * 0.05}s`
                            }}
                          ></div>
                        ))}
                      </div>
                      <audio controls className="w-75" src={mockAudioUrl} style={{ filter: 'invert(1) hue-rotate(180deg)' }} />
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="rounded-circle bg-dark d-inline-flex align-items-center justify-content-center border border-secondary" style={{ width: '80px', height: '80px' }}>
                          <svg width="32" height="32" className="text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-white mb-2">Upload your podcast</h3>
                      <p className="text-secondary mb-4">Drag and drop or click to browse</p>

                      <input
                        type="file"
                        accept=".mp3,.wav"
                        onChange={handleFileUpload}
                        className="d-none"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="btn btn-primary-glow text-white px-4 py-2 rounded-pill fw-medium cursor-pointer"
                      >
                        Select File
                      </label>
                      {uploadedFile && <p className="text-success mt-3 small">{uploadedFile.name}</p>}
                    </div>
                  )}
                </div>
              </div>


              <div className="card border-0 glass-panel">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="text-white mb-1">AI Processing</h5>
                    <p className="text-secondary small mb-0">Generate summaries and transcripts instantly</p>
                  </div>
                  <button
                    onClick={handleGenerateSummary}
                    disabled={!uploadedFile || isProcessing}
                    className="btn btn-primary-glow text-white px-4 py-2 rounded-3"
                  >
                    {isProcessing ? (
                      <span><span className="spinner-border spinner-border-sm me-2"></span>Processing...</span>
                    ) : 'Generate Summary'}
                  </button>
                </div>
              </div>
            </div>


            <div className="col-lg-4">
              <div className="card border-0 glass-panel h-100">
                <div className="card-header bg-transparent border-bottom border-secondary p-3">
                  <h5 className="text-white mb-0">Summary</h5>
                </div>
                <div className="card-body overflow-auto">
                  {showResults ? (
                    <div className="text-secondary lh-lg">
                      {mockSummary.split('\n').map((line, i) => (
                        <p key={i} className="mb-3">{line}</p>
                      ))}
                    </div>
                  ) : (
                    <div className="h-100 d-flex align-items-center justify-content-center text-center p-4">
                      <div className="text-muted opacity-50">
                        <svg width="48" height="48" className="mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p>Summary will appear here after processing</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
