import './Navbar.css'

type Props = {
  selected: string
  onSelect: (type: any) => void
}

const impostos = [
  'CBS', 'IBS', 'ICMS', 'ICMSDIFAL', 'ICMSST', 'IPI', 'ISS', 'PISCOFINS'
]

const labels: Record<string, string> = {
  'PISCOFINS': 'PIS/COFINS',
}

export default function Navbar({ selected, onSelect }: Props) {
  return (
    <div className="navbar">
      {impostos.map((imp) => (
        <button
          key={imp}
          onClick={() => onSelect(imp)}
          className={`nav-btn ${selected === imp ? 'active' : ''}`}
        >
          {labels[imp] || imp}
        </button>
      ))}
    </div>
  )
}