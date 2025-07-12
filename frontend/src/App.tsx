import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import { HomeGroup } from "./components/pages/HomeGroup"
import { ContactPage } from "./components/contact/Page"


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomeGroup />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}


export default App