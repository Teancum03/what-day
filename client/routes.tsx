import { Route, createRoutesFromElements } from 'react-router-dom'

import App from '@/components/layout/App'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import About from '@/pages/About'
import Monday from '@/pages/Monday'
import Tuesday from '@/pages/Tuesday'
import Wednesday from '@/pages/Wednesday'
import Thursday from '@/pages/Thursday'
import Friday from '@/pages/Friday'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/monday" element={<Monday />} />
    <Route path="/tuesday" element={<Tuesday />} />
    <Route path="/wednesday" element={<Wednesday />} />
    <Route path="/thursday" element={<Thursday />} />
    <Route path="/friday" element={<Friday />} />
    <Route path="/about" element={<About />} />
    <Route path="/:unknown" element={<NotFound />} />
  </Route>
)
