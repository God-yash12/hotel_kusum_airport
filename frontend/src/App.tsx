import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import { HomeGroup } from "./components/pages/HomeGroup"
import { ContactPage } from "./components/contact/Page"
import { Facilities } from "./components/facilities/page"
import {RoomGroup}  from "./components/pages/rooms/Roomgroup.tsx"


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomeGroup />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/rooms/:roomSlug" element={<RoomGroup />} />
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </>
  )
}


export default App