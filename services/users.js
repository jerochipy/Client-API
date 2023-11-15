import pkg from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const { PrismaClient } = pkg

const prisma = new PrismaClient()

export const findAllUsers = async () => {
  const data = await prisma.user.findMany({
    where: {
      is_deleted: false
    }
  })
  return data
}
export const createUserService = async (body) => {
  const password = body.Password
  body.Password = await bcrypt.hash(password, 8)
  const data = await prisma.user.create({ data: body })
  return data
}

export const findUserServiceById = async (id) => {
  const data = await prisma.user.findUnique({
    where: {
      Id: Number(id)
    }
  }
  )
  return data
}

export const updateUserService = async (id, body) => {
  const data = await prisma.user.update({
    where: {
      Id: Number(id)
    },
    data: body
  })

  return data
}

  export const loginService = async (body) => {
    // Buscar el usuario por su correo electrónico
    const user = await prisma.user.findUnique({
        where: {
            Email: body.Email,
        },
    });

    // Verificar si el usuario existe y si la contraseña es correcta
    if (!user || !bcrypt.compareSync(body.Password, user.Password)) {
        return null;
    }

    const token = jwt.sign(
        {
            userId: user.Id,
            email: user.Email,
            username: user.Username,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    );

    return {
        token,
        email: user.Email,
        username: user.Username,
        userId: user.Id,
        firstName: user.FirstName,
        lastName: user.LastName,
        country: user.Country
    };
};

export const deleteUserService = async (id) => {
  const data = await prisma.user.update({
    where: { Id: Number(id) },
    data: {
      is_deleted: true
    }
  })

  return data
}