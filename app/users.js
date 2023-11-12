import { z } from 'zod'

const userShema = z.object({
  Username: z.string({
    required_error: 'Username is required'
  }).refine(value => /^[a-zA-Z0-9_]+$/.test(value), {
    message: 'The username contains invalid characters'
  }),
  FirstName: z.string({
    required_error: 'Name is required'
  }),

  LastName: z.string({
    required_error: 'Last name is required.'
  }),
  Email: z.string({
    required_error: 'Email is required'
  }).email(),
  Country: z.string({
    required_error: 'Country is required'
  }),
  password: z.string({
    required_error: 'Password is required'
  })
})

export function validateUser (user) {
  return userShema.safeParse(user)
}

export function validatePartialUser (user) {
  return userShema.partial().safeParse(user)
}
