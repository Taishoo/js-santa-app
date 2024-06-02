import { useState } from "react"
import axios from "axios";

function App() {
    const[name, setName] = useState("");
    const[gifts, setGifts] = useState("");

    const axiosConfig = {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }

    // Submit form to the server
    function submitForm(e) {
         e.preventDefault();

         const body = {
            name: name,
            wish: gifts
         }

         axios.post('http://localhost:8080/api/v1/send', body, axiosConfig)
         .then(resp => alert(resp.data.message))
         .catch(err => alert(err.response.data.message));
    }

    // Render the letter web page
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

        <button type="submit" id="submit-letter" disabled={name === "" || gifts === ""}>Send</button>

      </form>
    </main>

    </div>
}

export default App