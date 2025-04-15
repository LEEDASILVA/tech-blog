import Counter from './components/Counter'

const App: FC = () => {
  return (
    <div className="app">
      <header>
        <h1>Test</h1>
      </header>
      <main>
        <Counter label="My Counter" initialValue={5} />
      </main>
    </div>
  )
}

export default App
