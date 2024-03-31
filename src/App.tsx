
import Home from './pages/Home'
import { Route, Routes, useParams } from 'react-router-dom'
import Settings from './pages/Settings'
import BulkUpload from './pages/BulkUpload'
import ManageDomain from './pages/ManageDomain'
import { RecoilRoot } from 'recoil'
export default function App() {
  const {domainName } = useParams()
  return (
    <div>
      <RecoilRoot>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage" element={<ManageDomain />} />
          {/* <Route path={`/manage:domainName`} element={<ManageDomain />} /> */}
          <Route path="/setting" element={<Settings />} />
          <Route path="/bulk" element={<BulkUpload />} />
      </Routes>
      </RecoilRoot>
    </div>
  )
}
