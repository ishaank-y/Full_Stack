import React from 'react'

export default function App() {
  return (
    <main style={{
      display: 'grid',
      placeItems: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
      padding: '2rem'
    }}>
      <section style={{textAlign: 'center', maxWidth: 680}}>
        <h1>React + Docker (Multi‑Stage)</h1>
        <p>
          This is a minimal React app built with Vite and served by Nginx using a
          two‑stage Docker build (Node builder → Nginx runtime).
        </p>
        <ol style={{textAlign: 'left'}}>
          <li>Build stage: install deps &amp; run <code>npm run build</code></li>
          <li>Runtime stage: copy <code>dist/</code> into an Nginx image</li>
        </ol>
        <p>
          Try building the image with <code>docker build -t bytexl-react .</code>
          and run with <code>docker run -p 8080:80 bytexl-react</code>.
        </p>
      </section>
    </main>
  )
}