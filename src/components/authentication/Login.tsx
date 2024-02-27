import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLogin } from '../../hooks/useLogin'
import Products from '../Products'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormFields = z.infer<typeof schema>

const Login = () => {
  const { mutateAsync: loginAsync, isSuccess } = useLogin()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: 'cristobal@gmail.com',
      password: 'password',
    },
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await loginAsync({ email: data.email, password: data.password })
    } catch (error) {
      setError('root', {
        message: 'Login fails',
      })
    }
  }

  return (
    <>
      <form className="gap-2 tutorial" onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} type="text" placeholder="Email" />
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}
        <input {...register('password')} type="password" placeholder="Password" />
        {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Loading...' : 'Submit'}
        </button>
        {errors.root && <div className="text-red-500">{errors.root.message}</div>}
      </form>
      {isSuccess && <Products />}
    </>
  )
}

export default Login
