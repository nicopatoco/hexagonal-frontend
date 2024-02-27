import { useMutation } from '@tanstack/react-query'
import { User } from '../entities/user'

const URL = 'http://localhost:4000'

// Function to perform the login request using fetch
const login = async ({ email, password }: { email: string; password: string }): Promise<User> => {
  const response = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

// Function to perform the login request using fetch
const register = async ({ email, password }: { email: string; password: string }): Promise<User> => {
  const response = await fetch(`${URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

// Custom hook using useMutation for login
export const useLogin = () => {
  const { data, error, isSuccess, mutateAsync } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
  return {
    user: data,
    error,
    isSuccess,
    mutateAsync,
  }
}

// Custom hook using useMutation for register
export const useRegister = () => {
  const { data, error, isSuccess, mutateAsync } = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
    },
    onError: (error) => {
      console.error('Register failed:', error)
    },
  })
  return {
    user: data,
    error,
    isSuccess,
    mutateAsync,
  }
}
