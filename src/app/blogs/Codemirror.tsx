import { useState, useEffect } from 'react'
import MarkdownRenderer from '../components/MarkdownRender.tsx'

const Codemirror = () => {
  const [md, setMd] = useState()

  useEffect(() => {
    fetch('/static/CODEMIRROR.md')
      .then(res => res.text())
      .then(setMd)
      .catch(err => setMarkdown(`Error loading markdown: ${err}`))
  }, [])

  return (
    <div>
      <MarkdownRenderer md={md} />
    </div>
  )
}

export default Codemirror
