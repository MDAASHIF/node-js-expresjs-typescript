import { Request, Response, NextFunction } from "express";
import Joi, { boolean } from "joi";
import bcrypt from 'bcrypt';
import UserModel from '../models/user';

interface User{
  name : string;
  email : string;
  password : string;
  avatar?: string;
}

const addUser = async(req:Request, res:Response, next : NextFunction)=>{
    try {
          let validationSchema = Joi.object({
              name : Joi.string().required(),
              email : Joi.string().required(),
              password : Joi.string().required()
          })

          const validData : User = await validationSchema.validateAsync(req.body);
          validData.password = await bcrypt.hash(validData.password,10);
          
           let checkEmail = await UserModel.findOne({email : validData.email});
           if(checkEmail){
            return res.status(400).send({
              status : false,
              message : "Email Already Exists."
            })
           }
          let data = await UserModel.create(validData);

          return res.status(200).send({
            status : true,
            message : "Successfully Added.",
            data : data
          })
    } catch (error:any) {
      return res.status(400).send({
        status : false,
        meesage : error.details[0].message
      })
    }
};

export default {addUser}