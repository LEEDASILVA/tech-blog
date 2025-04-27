import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import CodeEditor from '../components/design/CodeEditor.tsx'

interface MarkdownRendererProps {
  md: string
}
interface MarkdownComponentProps {
  node: any
  inline?: boolean
  [key: string]: any
  language?: string
  className?: string
  children: React.ReactNode
}

const components: Record<string, FC<MarkdownComponentProps>> = {
  // override the pre so that the code editor is not wrapped with the pre tag
  pre: ({ node, children, ...props }) => {
    if (
      React.isValidElement(children) &&
      (children.type === CodeEditor ||
        children?.props?.className?.includes('editor'))
    ) {
      return children
    }
    return <pre {...props}>{children}</pre>
  },
  // the {language}-editor will display the code editor with the content inside
  // otherwise it will display the normal code tag
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)(?:\s+editor)?/.exec(className || '')

    if (!inline && match) {
      const language = match[1]
      const isEditor = className?.includes('editor')

      if (isEditor) {
        return (
          <CodeEditor language={language}>
            {String(children).replace(/\n$/, '')}
          </CodeEditor>
        )
      }
      return (
        <pre className={className} {...props}>
          <code>{children}</code>
        </pre>
      )
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ md }) => (
  <Markdown
    remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
    rehypePlugins={[rehypeRaw]}
    components={components}
  >
    {md}
  </Markdown>
)

export default MarkdownRenderer
