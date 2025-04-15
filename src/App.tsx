import Counter from './components/Counter'

const App: FC = () => {
  return (
    <div className="app">
      <header>
        <h1>My React TypeScript App with esbuild</h1>
      </header>
      <main>
        <p>Welcome to your new React + TypeScript application!</p>
        <Counter label="My Counter" initialValue={5} />
      </main>
    </div>
  )
}

export default App
