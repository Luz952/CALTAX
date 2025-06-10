import './Navbar.css'

type Props = {
  selected: string
  onSelect: (type: any) => void
}

const impostos = [
  'CBS', 'IBS', 'ICMS', 'ICMSDIFAL', 'ICMSST', 'IPI', 'ISS', 'PISCONFINS'
]

export default function Navbar({ selected, onSelect }: Props) {
  return (
    <div className="navbar">
      {impostos.map((imp) => (
        <button
          key={imp}
          onClick={() => onSelect(imp)}
          className={`nav-btn ${selected === imp ? 'active' : ''}`}
        >
          {imp}
        </button>
      ))}
    </div>
  )
}
