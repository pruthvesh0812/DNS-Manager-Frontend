
import Home from './pages/Home'
import { Route, Routes} from 'react-router-dom'
import Settings from './pages/Settings'
import BulkUpload from './pages/BulkUpload'
import ManageDomain from './pages/ManageDomain'
import { RecoilRoot } from 'recoil'
// export const BASE_URL = import.meta.env.VITE_APP_BASE_URL
import LoginSignup from './pages/LogSign'
export const ENV= import.meta.env

export default function App() {
  // console.log(BASE_URL, "bu")
 
  return (
    <div>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manage" element={<ManageDomain />} />
          {/* <Route path={`/manage:domainName`} element={<ManageDomain />} /> */}
          <Route path="/setting" element={<Settings />} />
          <Route path="/bulk" element={<BulkUpload />} />
          <Route path="/signup-login" element={<LoginSignup />} />

        </Routes>
      </RecoilRoot>
    </div>
  )
}
