const z = require('zod')

const userShema = z.object({
  username: z.string({
    required_error: 'Username is required'
  }).refine(value => /^[a-zA-Z0-9_]+$/.test(value), {
    message: 'The username contains invalid characters'
  }),
  name: z.string({
    required_error: 'Name is required'
  }),
  lastName: z.string({
    required_error: 'Last name is required'
  }),
  email: z.string({
    required_error: 'Email is required'
  }).email(),
  country: z.string({
    required_error: 'Country is required'
  })
})

function validateUser (user) {
  return userShema.safeParse(user)
}

function validatePartialUser (user) {
  return userShema.partial().safeParse(user)
}

module.exports = { validateUser, validatePartialUser }
