import { useState } from 'react'

interface SwitchPropType {
  inital: boolean
  label: string
  onChange: () => void
}

const Switch: FC<SwitchPropType> = ({
  inital = false,
  label = '',
  onChange,
}) => {
  const [checked, setChecked] = useState<boolean>(inital)

  const handleToggle = () => {
    const newState = !checked
    setChecked(newState)
    if (onChange) onChange(newState)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <label
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
          checked={checked}
          onChange={handleToggle}
        />
        <div
          style={{
            position: 'relative',
            width: '3rem',
            height: '1.5rem',
            borderRadius: '9999px',
            backgroundColor: checked
              ? 'var(--color-accent)'
              : 'var(--color-gray)',
            transition: 'background-color 0.3s ease-in-out',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '0.25rem',
              left: checked ? '1.5rem' : '0.25rem',
              width: '1rem',
              height: '1rem',
              borderRadius: '9999px',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
              transform: checked ? 'translateX(0)' : 'translateX(0)',
              transition: 'left 0.3s ease-in-out',
            }}
          />
        </div>
        <span
          style={{
            marginLeft: '0.5rem',
            color: 'var(--color-text)',
            fontSize: '0.875rem',
            minWidth: '4.5rem',
          }}
        >
          {label}
        </span>
      </label>
    </div>
  )
}

export default Switch
