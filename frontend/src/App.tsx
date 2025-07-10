import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import { HomeGroup } from "./components/pages/HomeGroup"


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomeGroup />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}


export default App