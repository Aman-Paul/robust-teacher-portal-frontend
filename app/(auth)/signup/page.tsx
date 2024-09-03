'use client';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import "../authStyle.css";
import { CiUser } from 'react-icons/ci';
import { TbLockOpen } from 'react-icons/tb';
import { FaEye } from 'react-icons/fa';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

const formSchema = z.object({
    username: z
        .string()
        .min(1, { message: "This field has to be filled." }),
    email: z
        .string({message: "Email must be a string"})
        .email(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" }) 
        .max(20, { message: "Password must be no more than 20 characters long" }) 
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) 
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character (@$!%*?&#)" }),
    confirmPassword: z
        .string()

})
.refine((data) => data.password === data.confirmPassword,{
    message: "Password don't match",
    path: ["confirmPassword"]
})

const SignUp = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const togglePasswordVisibility = (type: string) => {
        if(type === "password"){
            setShowPassword((prev) => !prev);
        } else if (type === "confirmPassword") {
            setShowConfirmPassword((prev) => !prev);
        }
      };
    return (
        <div className='card-component'>
            <Card className='auth-form'>
                {/* <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>Sign-in to get students details.</CardDescription>
                </CardHeader> */}
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-between items-center">
                            <div className='input-fields'>
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="field">
                                            <FormLabel>Username</FormLabel>
                                            <FormControl> 
                                                <Input placeholder="username" {...field} leftIcon={<CiUser className='mr-[10px]'/>}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="field">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl> 
                                                <Input placeholder="email" {...field} leftIcon={<MdOutlineMarkEmailRead className='mr-[10px]'/>}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="field">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="password" 
                                                    type={showPassword ? "text" : "password"}
                                                    {...field} 
                                                    leftIcon={<TbLockOpen className='mr-[10px]'/>}
                                                    rightIcon={
                                                        <FaEye onClick={() => togglePasswordVisibility("password")} className="cursor-pointer" /> // Eye icon on the right
                                                      }
                                                    />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="field">
                                            <FormLabel>Confirm password</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    placeholder="confirm password" 
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    {...field} 
                                                    leftIcon={<TbLockOpen className='mr-[10px]'/>}
                                                    rightIcon={
                                                        <FaEye onClick={() => togglePasswordVisibility("confirmPassword")} className="cursor-pointer" /> // Eye icon on the right
                                                      }
                                                    />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className='min-w-64 rounded-sm items-center submit-btn '>Sign up</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <p>Already have an account? <a href="/signin">Sign In</a></p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default SignUp;
