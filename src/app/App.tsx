import Home from './Home'
import NotFound from './NotFound'
import { Route, Routes } from 'react-router-dom'
import { ResponsiveProvider } from './context/ResponsiveContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import Blog from './Blog.tsx'
import BlogPost from './BlogPost.tsx'
import Nav from './components/design/Nav.tsx'

const App: FC = () => {
  return (
    <ResponsiveProvider>
      <ThemeProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:name" element={<BlogPost />} />
          <Route path="/contact" element={<div />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </ResponsiveProvider>
  )
}

export default App
