import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import { HomeGroup } from "./components/pages/HomeGroup"
import { ContactPage } from "./components/contact/Page"
import { Facilities } from "./components/facilities/page"


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomeGroup />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/facilities" element={<Facilities />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}


export default App