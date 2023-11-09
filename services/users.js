import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export const findAllUsers = async () => {
   
    const data = await prisma.user.findMany({
      where: {
        is_deleted: false,
      },
    });
 
    return data;
 
}

export const createUserService = async (body) => {  
    const password = body.Password;
    body.Password = await bcrypt.hash(password, 8);
    const data = await prisma.user.create( {data: body });
    return data;
}

export const findUserServiceById = async (id) => {
    const data = await prisma.user.findUnique({
      where: {
        Id: Number(id),
      },}
      );
    return data;
  }
  
  export const updateUserService = async (id,body) =>{
    const data = await prisma.user.update({
      where: {
        Id: Number(id),
      },
      data: body,
    })
  
    return data;
  }
  
  export const deleteUserService = async (id) => {
    const data = await prisma.user.update({
      where: { Id: Number(id) },
      data: {
        is_deleted: true
      }
    });
  
    return data;
  }
  

  export const loginService = async (body) => {
    const data = await prisma.user.findFirst({
      where: {
        email: body.email
      }}
      )
   
    const validPassword = await bcrypt.compare(body.password, data.password);
    if (!validPassword) return false;

    const token = jwt.sign(data, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES
    });

 
      return token;
  }