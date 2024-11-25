import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    full_name: vine.string().trim(),
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(32).confirmed()
  })
)