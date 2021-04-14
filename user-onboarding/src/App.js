import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import UserForm from './UserForm'
import User from './User'
import FormSchema from './FormSchema'


const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false
}

const initialFormErrors = {
  name: '',
  email: '',
  password: ''
}

const initialUsers = []
const initialDisabled = true

function App() {

  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewUser = newUser => {
    axios.post("https://reqres.in/api/users", newUser)
      .then(response => {
        console.log(response.data)
        setUsers([response.data, ...users])
        setFormValues(initialFormValues)
      })
      .catch(err => console.log(err))
  }

  const inputChange = (name, value) => {
    console.log(name, value)
    Yup.reach(FormSchema, name)
      .validate(value)
        .then(() => setFormErrors({...formErrors, [name]: ''}))
        .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: ["terms"].filter(terms => !!formValues[terms])
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    FormSchema.isValid(formValues)
      .then(isValid => setDisabled(!isValid))
      .catch(err => console.log(err))
  }, [formValues])


  return (
    <div className='container'>
      <header><h1>User App</h1></header>

      <UserForm 
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}

export default App;
