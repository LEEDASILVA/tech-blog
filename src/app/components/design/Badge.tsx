type BadgeProps = {
  label: string
  color?: string
}

const Badge: FC<BadgeProps> = ({ label, color }) => (
  <span className="badge" style={{ backgroundColor: color }}>
    {label}
  </span>
)

export default Badge
