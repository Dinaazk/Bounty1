import { useState, useEffect } from 'react'
import './index.css'

const imageDatabase = {
  'cyberpunk': 'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?q=80&w=1200',
  'boho': 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200',
  'minimalist': 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1200',
  'industrial': 'https://images.unsplash.com/photo-1512914890251-2f96a9b0bbe2?q=80&w=1200',
  'scandinavian': 'https://images.unsplash.com/photo-1554995207-c18c20360a59?q=80&w=1200',
  'default': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200'
}

function App() {
  const [roomType, setRoomType] = useState('Living Room')
  const [width, setWidth] = useState('12')
  const [length, setLength] = useState('15')
  const [style, setStyle] = useState('')
  const [lighting, setLighting] = useState('Natural')
  const [density, setDensity] = useState(50)

  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingText, setLoadingText] = useState('Generate Vision')
  const [result, setResult] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleGenerate = async () => {
    if (!style) {
      alert('Please enter a design style.')
      return
    }

    setIsGenerating(true)
    setLoadingText('Architecting Space...')
    await new Promise(resolve => setTimeout(resolve, 1500))

    setLoadingText('Optimizing Lighting...')
    await new Promise(resolve => setTimeout(resolve, 1200))

    setLoadingText('Finalizing 3D Render...')
    await new Promise(resolve => setTimeout(resolve, 1800))

    const lowerStyle = style.toLowerCase()
    let imgSource = imageDatabase.default

    for (const key in imageDatabase) {
      if (lowerStyle.includes(key)) {
        imgSource = imageDatabase[key]
        break
      }
    }

    const area = parseFloat(width) * parseFloat(length) || 0

    setResult({
      image: imgSource,
      style: style,
      dimensions: `${width}' x ${length}'`,
      type: roomType,
      stats: {
        area: `${area} sqft`,
        lighting: lighting,
        density: density > 70 ? 'High' : density < 30 ? 'Minimal' : 'Balanced'
      }
    })

    setIsGenerating(false)
    setLoadingText('Generate Vision')
  }

  const handleReset = () => {
    setResult(null)
    setStyle('')
    setDensity(50)
  }

  const selectStyle = (s) => {
    setStyle(s)
  }

  return (
    <div className="app-container">
      <div className="background-blobs">
        <div
          className="blob blob-1"
          style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
        ></div>
        <div
          className="blob blob-2"
          style={{ transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px)` }}
        ></div>
        <div
          className="blob blob-3"
          style={{ transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)` }}
        ></div>
      </div>

      <main className="main-content">
        <header>
          <h1 className="logo">Dream<span>Room</span></h1>
          <p className="subtitle">High-fidelity spatial design visualizer</p>
        </header>

        <section className="visualizer-card">
          <div className="input-group">
            <div className="input-grid">
              <div className="field full-width">
                <label>Room Type</label>
                <div className="input-wrapper">
                  <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                    <option>Living Room</option>
                    <option>Bedroom</option>
                    <option>Home Office</option>
                    <option>Kitchen</option>
                    <option>Gaming Den</option>
                  </select>
                  <span className="input-icon">🏠</span>
                </div>
              </div>

              <div className="field">
                <label>Width (ft)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  />
                  <span className="input-icon">↔️</span>
                </div>
              </div>

              <div className="field">
                <label>Length (ft)</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                  <span className="input-icon">↕️</span>
                </div>
              </div>

              <div className="field full-width">
                <label>Design Style</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="e.g., Cyberpunk, Boho, Japandi"
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                  />
                  <span className="input-icon">✨</span>
                </div>
              </div>

              <div className="field">
                <label>Lighting</label>
                <div className="input-wrapper">
                  <select value={lighting} onChange={(e) => setLighting(e.target.value)}>
                    <option>Natural</option>
                    <option>Warm / Golden</option>
                    <option>Cine-Blue</option>
                    <option>Studio White</option>
                  </select>
                  <span className="input-icon">💡</span>
                </div>
              </div>

              <div className="field">
                <label>Density: {density}%</label>
                <div className="input-wrapper">
                  <input
                    type="range"
                    min="0" max="100"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              className="primary-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              <span>{loadingText}</span>
              {isGenerating && <div className="loader"></div>}
            </button>
          </div>

          <div className="result-container">
            {!result ? (
              <div className="placeholder-content">
                <div className="preview-box">
                  <p>Configure your room parameters to generate a spatial blueprint</p>
                </div>
              </div>
            ) : (
              <div className="generated-content">
                <div className="image-wrapper">
                  <img className="generated-image" src={result.image} alt="Generated Room" />
                  <div className="image-overlay">
                    <h3 className="style-label">{result.style}</h3>
                    <p className="size-label">{result.type} • {result.dimensions}</p>
                  </div>
                </div>

                <div className="room-specs">
                  <div className="spec-item">
                    <label>Total Area</label>
                    <span>{result.stats.area}</span>
                  </div>
                  <div className="spec-item">
                    <label>Atmosphere</label>
                    <span>{result.stats.lighting}</span>
                  </div>
                  <div className="spec-item">
                    <label>Spacing</label>
                    <span>{result.stats.density}</span>
                  </div>
                </div>

                <div className="action-footer">
                  <button className="secondary-btn" onClick={() => window.print()}>Export Specs</button>
                  <button className="secondary-btn" onClick={handleReset}>New Plan</button>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="styles-gallery">
          <h2>Trending Styles</h2>
          <div className="gallery-grid">
            {Object.keys(imageDatabase).filter(k => k !== 'default').map(key => (
              <div
                key={key}
                className="style-card"
                onClick={() => selectStyle(key.charAt(0).toUpperCase() + key.slice(1))}
              >
                <img src={imageDatabase[key]} alt={key} />
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
