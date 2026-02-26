import { useState } from 'react'
// both logos are static SVG files; React can treat them as modules when
// they live inside `src`. Vite will bundle them and give us a URL string.
//
// The default template imports the React logo from `src/assets` and
// the Vite logo from the `public` folder via an absolute path
// (`/vite.svg`). In some setups the absolute path may fail (for example
// if the base href is modified), which results in a broken image icon and
// the logos not appearing. To avoid that uncertainty we copy the Vite SVG
// into the same `assets` directory and import it relatively as well.
//
// If your logos still don't show up, open the browser DevTools network
// tab and look for 404 errors on the SVG URLs or check the console for
// import-related warnings.
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'    // ← now imported from src/assets

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // log the URLs that Vite resolved for each asset so we can verify they're
  // valid at runtime. Open the browser console; if you see something like
  // "/assets/vite.12345.svg" then the import worked, but if you see an
  // empty string or 404 later, the path is wrong and that's why the image
  // is not rendering.
  console.log('viteLogo URL:', viteLogo)
  console.log('reactLogo URL:', reactLogo)

  return (
  //   <>
  //     {/* render Vite + React logos by referencing the imported URLs */}
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>

  <h1>HELLO WORLD THIS IS MY FIRST REACT APP</h1>
)
}

export default App
