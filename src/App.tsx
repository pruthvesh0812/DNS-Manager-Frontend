
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Settings from './pages/Settings'
import BulkUpload from './pages/BulkUpload'
import ManageDomain from './pages/ManageDomain'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/manage"  element={<ManageDomain/>}/>
        <Route path="/setting"  element={<Settings/>}/>
        <Route path="/bulk"  element={<BulkUpload/>}/>
      </Routes>
    </div>
  )
}
