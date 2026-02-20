import { useState, useEffect } from 'react'
import './index.css'

const stylePalettes = {
  'Cyberpunk': ['#ff00ff', '#00ffff', '#3d1c5c', '#000000', '#f9fe0e'],
  'Boho': ['#e3b04b', '#8b5e34', '#606c38', '#fefae0', '#dda15e'],
  'Minimalist': ['#ffffff', '#f5f5f5', '#e0e0e0', '#333333', '#bdbdbd'],
  'Industrial': ['#4a4e69', '#22223b', '#9a8c98', '#c9ada7', '#f2e9e4'],
  'Scandinavian': ['#8ecae6', '#219ebc', '#023047', '#ffb703', '#fb8500'],
  'Japandi': ['#f7f1e5', '#e7d4b5', '#a69080', '#63564c', '#ffffff']
}

function App() {
  const [roomType, setRoomType] = useState('Living Room')
  const [width, setWidth] = useState('12')
  const [length, setLength] = useState('15')
  const [style, setStyle] = useState('Modern Minimalist')
  const [lighting, setLighting] = useState('Natural')
  const [density, setDensity] = useState(50)
  const [flooring, setFlooring] = useState('Light Wood')

  const [imageLoading, setImageLoading] = useState(false)

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
      alert('Please enter a design style or prompt.')
      return
    }

    setIsGenerating(true)
    setResult(null) // clear previous
    const phases = [
      'Scanning Perimeter...',
      'Mapping Spatial Geometry...',
      'Synthesizing Textures...',
      'Architectural AI Rendering...'
    ]

    for (const phase of phases) {
      setLoadingText(phase)
      await new Promise(resolve => setTimeout(resolve, 600))
    }

    const seed = Math.floor(Math.random() * 1000000)
    // Refined prompt for maximum quality
    const refinedPrompt = `professional 3D interior design render, ${roomType}, ${style} style, ${lighting} lighting, ${flooring} flooring, architectural photography, 8k, highly detailed, realistic.`

    // Using the dedicated image API subdomain
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(refinedPrompt)}?width=1024&height=768&seed=${seed}&nologo=true`

    console.log('Fetching:', imageUrl)

    const area = parseFloat(width) * parseFloat(length) || 0
    const estCost = Math.round(area * 45)

    let matchedKey = 'Minimalist'
    for (const key in stylePalettes) {
      if (style.toLowerCase().includes(key.toLowerCase())) {
        matchedKey = key
        break
      }
    }

    setResult({
      image: imageUrl,
      style: style,
      dimensions: `${width}' x ${length}'`,
      type: roomType,
      palette: stylePalettes[matchedKey],
      stats: {
        area: `${area} sqft`,
        lighting: lighting,
        flooring: flooring,
        cost: `$${estCost.toLocaleString()}`,
        density: density > 70 ? 'High' : density < 30 ? 'Minimal' : 'Balanced'
      }
    })

    setIsGenerating(false)
    setImageLoading(true) // Start loading the actual image
    setLoadingText('Generate Vision')
  }

  const handleReset = () => {
    setResult(null)
    setDensity(50)
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
          <p className="subtitle">Real-time AI spatial design suite</p>
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
                    <option>Dining Room</option>
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
                <label>Design Prompt / Style</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="e.g., Luxury Cyberpunk with neon accents"
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
                    <option>Natural Daylight</option>
                    <option>Golden Hour</option>
                    <option>Moody Neon</option>
                    <option>Soft Studio</option>
                    <option>Warm Twilight</option>
                  </select>
                  <span className="input-icon">💡</span>
                </div>
              </div>

              <div className="field">
                <label>Flooring</label>
                <div className="input-wrapper">
                  <select value={flooring} onChange={(e) => setFlooring(e.target.value)}>
                    <option>Polished Oak</option>
                    <option>Grey Concrete</option>
                    <option>White Marble</option>
                    <option>Checkered Tile</option>
                    <option>Walnut Hardwood</option>
                  </select>
                  <span className="input-icon">🪵</span>
                </div>
              </div>

              <div className="field full-width">
                <label>Furniture density: {density}%</label>
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
                  <p>Configure your room and click generate for a custom AI design.</p>
                </div>
              </div>
            ) : (
              <div className="generated-content">
                <div className="image-wrapper">
                  {imageLoading && (
                    <div className="image-skeleton">
                      <div className="loader"></div>
                      <p>Finalizing render textures...</p>
                    </div>
                  )}
                  <img
                    className={`generated-image ${imageLoading ? 'loading' : ''}`}
                    src={result.image}
                    alt="Generated Room Visualization"
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      alert("The AI provider is currently busy. Please try another prompt or style!");
                    }}
                  />
                  {!imageLoading && (
                    <div className="image-overlay">
                      <h3 className="style-label">{result.style}</h3>
                      <p className="size-label">{result.type} • {result.dimensions}</p>
                    </div>
                  )}
                </div>

                <div className="palette-section">
                  <label>AI Suggested Color Palette</label>
                  <div className="palette-grid">
                    {result.palette.map((color, i) => (
                      <div key={i} className="color-swatch" style={{ backgroundColor: color }} title={color}></div>
                    ))}
                  </div>
                </div>

                <div className="room-specs">
                  <div className="spec-item">
                    <label>Area</label>
                    <span>{result.stats.area}</span>
                  </div>
                  <div className="spec-item">
                    <label>Est. Renovation</label>
                    <span>{result.stats.cost}</span>
                  </div>
                  <div className="spec-item">
                    <label>Layout</label>
                    <span>{result.stats.density}</span>
                  </div>
                </div>

                <div className="action-footer">
                  <button className="secondary-btn" onClick={() => window.print()}>Save Design</button>
                  <button className="secondary-btn" onClick={handleReset}>New Version</button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
