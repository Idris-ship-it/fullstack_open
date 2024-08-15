import axios from 'axios'
import { useEffect, useState } from 'react'
import phoneBookServices from '../services/phonebook'
import '../index.css'

const Filter = ({ onChange }) => <> Search Phonebook : <input onChange={onChange} /> </>

const PersonForm = ({ addNewPerson, handleNewName, handlePhoneNumber, newName, newPhoneNumber }) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input onChange={handleNewName} value={newName} /> <br />
        Phone: <input onChange={handlePhoneNumber} value={newPhoneNumber} />

      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}


const Notification = ({ message, type }) => {

  console.log(message);
  console.log(type);

  const notificationClass = type === 'success' ? 'success' : 'error'

  return <div className={notificationClass}>{message}</div>
}

const Persons = ({ persons, onDelete }) => {

  return (
    <ul>
        {persons.map((person, id) =>
          <li key={id}>
            {person.name}
            {person.number}
            <button onClick={() => onDelete(person)}> delete </button>
          </li>
        )}
      </ul>
  )
}


const Phonebook = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })


  useEffect(() => {
    axios
      .get('/api/persons')
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => 
        setNotification({
          message: `OOPs! Could not retrieve data from the server.`,
          type: 'error'
        })
      )

      setTimeout(() => {
        setNotification('')
      }, 5000)

  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)

  }

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value)
  }


  const handleAddNewPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: phoneNumber }
    const found = persons.find(person => person.name === newPerson.name);

    if (found !== undefined) {
      persons.forEach(person => {
        if (person.name === newPerson.name) {
          if (window.confirm(`${newName} is already added to the phonebook
            replace the old number with the new one?`)) {

            const changedPerson = { ...person, number: phoneNumber }

            phoneBookServices
              .changePhoneNumber(person.id, changedPerson)
              .then(returnedPerson =>
                setNotification({
                  message: `${returnedPerson.name} phone number has been changed successfully.`,
                  type: 'success'
                })

              )
              .catch(error =>
                setNotification({
                  message: `OOPs! An error has occured while trying to update ${person.name} phone number`,
                  type: 'error',
                })


              )
          }
        }
      })


    } else {

      phoneBookServices
        .addNewPerson(newPerson)
        .then(returnedPerson => {
          setPersons([
            ...persons,
            returnedPerson
          ])

          setNotification({
            message: `${returnedPerson.name} has been added successfully.`,
            type: 'success'
          })

        }).catch(returnedPerson => 
          setNotification({
            message: `OOPs! Could not add person ${returnedPerson.name} to the phonebook`,
            type: 'error'
          })
        )
    }


    setTimeout(() => {
      setNotification('')
    }, 5000)

  }

  const handleSearch = (event) => {

    const filteredPersons = []

    for (let i = 0; i < persons.length; i++) {
      const personName = persons[i]['name'].toLowerCase()
      const searchName = event.target.value.toLowerCase()

      if (personName.startsWith(searchName)) {
        filteredPersons.push(persons[i])
      }


    }

    setPersons(filteredPersons)

  }

  const handleDelete = (personObject) => {
    if (window.confirm(`Are sure you want to delete ${personObject.name}?`)) {
      phoneBookServices
        .deletePerson(personObject.id, personObject)
        .then(result =>
          setNotification({
            message: `${result.name} deleted succesfully`,
            type: 'success'
          })
        )
        .catch(error => 
          setNotification({
            message: `OOPs! ${personObject.name} has already been deleted.`,
            type: 'error'
          })
        )

        setTimeout(() => {
          setNotification('')
        }, 5000)

      setPersons(persons.filter(person => person.id !== personObject.id))
    }

  }




  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message && (
        <Notification message={notification.message} type={notification.type} />
      )}


      <Filter onChange={handleSearch} />

      <h2>Add new</h2>

      <PersonForm
        addNewPerson={handleAddNewPerson}
        handleNewName={handleNewName}
        handlePhoneNumber={handlePhoneNumber}
        newName={newName}
        newPhoneNumber={phoneNumber}
        onDelete={handleDelete} />


      <h2>Numbers</h2>
      <Persons persons={persons} onDelete={handleDelete}/>
    </div>
  )
}



export default Phonebook