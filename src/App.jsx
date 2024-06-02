import { useState } from "react"

function App() {

    const[name, setName] = useState("");
    const[gifts, setGifts] = useState("");

    function submitForm(e) {
         e.preventDefault();
         console.log(`${name}  ${gifts}`);
    }

    return <div>

    <header>
      <h1>A letter to Santa</h1>
    </header>

    <main>

      <p className="bold">Ho ho ho, what you want for Christmas?</p>

      <label>who are you?</label>

      <input 
      name="userid" 
      placeholder="charlie.brown"
      value={name} 
      onChange={e => setName(e.target.value)}
      />

      <form onSubmit={submitForm}>

        <label>what do you want for christmas?</label>

        <textarea 
        name="wish" rows="10" 
        cols="45" maxLength="100" 
        placeholder="Gifts!"
        value={gifts} 
        onChange={e => setGifts(e.target.value)}
        />

        <br />

        <button type="submit" id="submit-letter">Send</button>

      </form>
    </main>

    </div>
}

export default App