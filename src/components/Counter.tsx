import { FC, useState } from 'react'

// Define the props interface
interface CounterProps {
  initialValue?: number
  label: string
}

const Counter: FC<CounterProps> = ({ initialValue = 0, label }) => {
  const [count, setCount] = useState(initialValue)

  return (
    <div className="counter">
      <h2>{label}</h2>
      <p>Count: {count}</p>
      <button
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-bg)',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          margin: '10px',
        }}
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
      <button
        style={{
          backgroundColor: 'var(--color-accent)',
          color: 'var(--color-bg)',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          margin: '10px',
        }}
        onClick={() => setCount(count - 1)}
      >
        Decrement
      </button>
    </div>
  )
}

export default Counter
