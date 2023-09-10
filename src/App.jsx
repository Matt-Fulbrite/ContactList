import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [contacts, setContacts] = useState([]);
  const [hash, setHash] = useState(window.location.hash.slice(1)*1)
  // UseEffect is the only way to make an API call
  // useEffect should only be used once
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users')
      const json = await response.json()
      setContacts(json) 
    }
    fetchData()

  }, [])
  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setHash(window.location.hash.slice(1)*1)
    })
  })

  const description = contacts.find(detail => detail.id === hash)
  // console.log(description.company.name)



    
  return (
    <div>
      <h1>Contact List</h1>
      <ul>
        {/* Can only put expressions in curly braces */}
        {
          contacts.map( contact => {
            return (
              // li items need a key
              <li key={contact.id} className={contact.id === hash ? 'selected': ''}>
                <a href={`#${contact.id === hash ? '': contact.id}`}>
                {contact.username}
                </a>
                </li>
            )
          })
        }
      </ul>
      {
        contacts ? (<h2>{description.email}</h2>): null
      }
      {
        contacts ? (<h2>{description.company.name}</h2>): null
      }
      {
        contacts ? (<h2>{description.phone}</h2>): null
      }
      
    </div>
  )
}

export default App
