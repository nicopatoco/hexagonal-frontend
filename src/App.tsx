import Login from './components/authentication/Login'
import Register from './components/authentication/Register'

function App() {
  return (
    <>
      <div className="pb-16">
        <h2 className="text-lg text-center">Login page</h2>
        <Login />
      </div>
      <h2 className="text-lg text-center">Register</h2>
      <Register />
    </>
  )
}

export default App
