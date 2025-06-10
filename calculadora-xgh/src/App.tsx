import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import CBS from './components/CBS'
import IBS from './components/IBS'
import ICMS from './components/ICMS'
import ICMSDIFAL from './components/ICMSDIFAL'
import ISS from './components/ISS'
import ICMSST from './components/ICMSST'
import IPI from './components/IPI'
import PISCONFINS from './components/PISCONFINS'
import logo from './assets/manduxLogo.png'



const componentsMap = {
  CBS: <CBS />,
  IBS: <IBS />,
  ICMS: <ICMS />,
  ICMSDIFAL: <ICMSDIFAL />,
  ICMSST: <ICMSST />,
  IPI: <IPI />,
  ISS: <ISS />,
  PISCONFINS: <PISCONFINS />,

}

function App() {
  const [selected, setSelected] = useState<keyof typeof componentsMap>('CBS')

  return (
    <div className="container">
       <img src={logo} alt="Logo" className="app-logo" />
      <div className="card">
        <Navbar selected={selected} onSelect={setSelected} />
        {componentsMap[selected]}
      </div>
    </div>
  )
}

export default App
