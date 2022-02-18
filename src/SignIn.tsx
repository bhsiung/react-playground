import React, { useState } from 'react'

// import { useSearchParams } from 'react-router-dom'

function ThePage() {
  // const [searchParams, setSearchParams] = useSearchParams()
  // const isSignUp = mode === PageMode.signUp
  return (
    <>
      <button>log in</button>
      <button>log out</button>
      <button>sign up</button>
      <SignUp onSave={onSave} />
      <SignIn />
    </>
  )
  function onSave(username: string, password: string, email?: string) {
    console.log(username, password, email)
  }
}

export function SignUp({
  onSave,
}: {
  onSave: (username: string, password: string, email?: string) => void
}) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form>
      <h1>sign up</h1>
      <input
        aria-label="username"
        value={username}
        onInput={onChangeUserName}
        placeholder="your user name. e.g. john"
      />
      <input
        aria-label="email"
        type="email"
        value={email}
        onInput={onChangeEmail}
        placeholder="abc@gmail.com"
      />
      <input
        aria-label="password"
        type="password"
        value={password}
        onInput={onChangePassword}
        placeholder="the password, as complicated as possible"
      />
      <button type="button" onClick={() => onSave(username, password, email)}>
        Sign Up
      </button>
    </form>
  )

  function onChangeUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }
  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }
  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }
}

export function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form>
      <h1>sign in</h1>
      <input
        aria-label="username"
        value={username}
        onInput={onChangeUserName}
        placeholder="your user name. e.g. john"
      />
      <input
        aria-label="password"
        type="password"
        value={password}
        onInput={onChangePassword}
        placeholder="the password, as complicated as possible"
      />
      <button type="button">Sign In</button>
    </form>
  )

  function onChangeUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }
  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }
}

export default ThePage
