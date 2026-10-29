import { dishes } from '../data'

// First-launch screen: full-bleed photo, frosted panel on the left, one button.
export default function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <div className="welcome">
      <img className="welcome-bg" src={`${import.meta.env.BASE_URL}welcome.jpg`} alt="" />
      <div className="welcome-panel">
        <img className="welcome-mark" src={`${import.meta.env.BASE_URL}logo.jpg`} alt="" />
        <h1>Off We <span>Go</span></h1>
        <p>Find the dish every place is known for, then keep the memory.</p>
        <p className="welcome-foot">
          From temple sweets to street chaat: {dishes.length.toLocaleString('en-IN')} dishes from every state
        </p>
      </div>
      <a className="welcome-credit" href="https://commons.wikimedia.org/wiki/File:Wazwan_trami_full.jpg" target="_blank" rel="noreferrer">
        Photo: wazwanksa.com, CC BY-SA 4.0
      </a>
      <button className="welcome-go" onClick={onStart}>Let's eat</button>
    </div>
  )
}
