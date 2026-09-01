import Home from './pages/Home/Home'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Signin from './components/Signin/Signin'
import Signup from './components/Signup/Signup'
import AboutBook from './pages/AboutBook/AboutBook'
import Results from './pages/Results/Results'
import MostPopular from './pages/MostPopular/MostPopular'
import NotFound from './components/NotFound/NotFound'
import Contact from './pages/Contact/Contact'
import Profile from './pages/Profile/Profile'
import ComingSoon from './components/ComingSoon/ComingSoon'
import FAQ from './pages/FAQ/FAQ'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="book/:isbn13" element={<AboutBook />} />
          <Route path="results" element={<Results />} />
          <Route path="popular" element={<MostPopular />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<FAQ />} />
        </Route>
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
