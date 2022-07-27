import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { useState } from 'react'
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from "./components/Recommend";

const App = () => {
  const [ token, setToken ] = useState(null)
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <Router>
      <div>
        <Link to="/">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        {token === null ?
            <Link to="/login">
              <button>login</button>
            </Link> :
            <div>
              <Link to="/addbook">
                <button>add book</button>
              </Link>
              <Link to="/recommend">
                <button>recommend</button>
              </Link>
              <button onClick={handleLogout}>logout</button>
            </div>
          }
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/addbook" element={<NewBook />} />
        <Route path="/recommend" element={<Recommend />} />
      </Routes>
    </Router>
  )
}

export default App
