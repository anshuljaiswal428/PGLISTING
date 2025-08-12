import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://pglisting.onrender.com/api/ping")
      .then(res => {
        setTimeout(() => {
          setMessage(res.data.msg);
          setLoading(false);
        }, 2000); 
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  

  if (loading) {
    return (
      <div>
        <h1>Backend Says: Loading..... </h1>
      </div>
    )
  }

  return (
    <div>
      <h1>Backend Says: {message} </h1>
    </div>
  )
}

export default App
