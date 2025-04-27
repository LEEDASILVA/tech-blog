//import { useRef, useState } from 'react'
import { Suspense, lazy } from 'react'
import { javascript } from '@codemirror/lang-javascript'
import { go } from '@codemirror/lang-go'
import { useTheme } from '../../context/ThemeContext.tsx'

//value,
//autoFocus,
//basicSetup,
//placeholder,
//indentWithTab,
//selection,
//onChange,
//onStatistics,
//onCreateEditor,
//onUpdate,
//extensions,
//initialState,
//readOnly
//editable={false}

const CodeMirror = lazy(() => import('@uiw/react-codemirror'))
const supportedLang = {
  go: [go()],
  js: [javascript()],
}

const CodeEditor = ({
  language,
  children,
}: { language?: string; children: string }) => {
  const { isDarkMode } = useTheme()
  const theme = isDarkMode ? 'dark' : 'light'
  const selectedLanguage = language ? supportedLang[language] : []

  return (
    <div className={`code-editor ${theme}`}>
      <div className="code-editor-header">{language?.toUpperCase()}</div>
      <Suspense fallback={<div>Loading Editor...</div>} />
      <CodeMirror
        value={children}
        height="200px"
        extensions={[...selectedLanguage]}
        theme={theme}
        basicSetup
      />
    </div>
  )
}

export default CodeEditor
