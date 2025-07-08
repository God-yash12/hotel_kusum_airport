import { Route, Routes } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Home from "./components/pages/Home"
import About from "./components/pages/About"


function App() {
  return (
    <>
      <Navbar />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} /> 
        </Routes>
      </div>
    </>
  )
}


export default App