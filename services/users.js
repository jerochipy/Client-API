import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const findAllUsers = async () => {
   
    const data = await prisma.user.findMany();
 
    return data;
 
}

export const createUserService = async (body) => {  
    body.role_Id = Number(body.role_Id) 
    const password = body.password;
    body.password = await bcrypt.hash(password, 8);
    const data = await prisma.user.create( {data: body });
    return data;
}

export const findUserServiceById = async (id) => {
    const data = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },}
      );
    return data;
  }
  
  export const updateUserService = async (id,body) =>{
    body.role_Id = Number(body.role_Id) 

    const data = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: body,
    })
  
    return data;
  }
  
  export const deleteUserService = async(id) =>{
    const data = await prisma.user.delete({
      where: { id: Number(id)}}
    );
  
    return data;
  }