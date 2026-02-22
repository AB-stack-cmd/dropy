import * as z from "zod"

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
).refine((data)=>{data.password === data.passwordConfirmation},{
    message : "Password do not match",
    path:["passwordConfirmation"]
})
