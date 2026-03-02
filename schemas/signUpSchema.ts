import * as z from "zod"
/**
 * schema to check the input from the auth
 */

export const signUpSchema = z.object({
        email:z.string().min(1,{message : "Error email required"})
        .email({message:"Please enter valid email"}),

        password : z
        .string()
        .min(1,{message : "password required"})
        .min(8,{message : "minimum 8 character passwords"}),

        passwordConfirmation : z
        .string()
        .min(1,{message : "please confirm your password"})
        

    } 
)
// data i stge object checks password match with passwordconfirmation
.refine((data)=>{data.password === data.passwordConfirmation},{
    message : "Password do not match",
    path:["passwordConfirmation"]
})
