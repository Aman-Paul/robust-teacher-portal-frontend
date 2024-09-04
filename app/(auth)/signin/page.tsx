'use client';
import React, { useEffect, useState } from 'react';
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
import { signIn } from '@/utils/endPoint';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { RootState, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { logIn } from '@/redux/slice/auth-slice';

const formSchema = z.object({
    email: z
        .string()
        .email(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length
        .max(20, { message: "Password must be no more than 20 characters long" }) // Maximum length
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // At least one lowercase letter
        .regex(/[0-9]/, { message: "Password must contain at least one number" }) // At least one number
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character (@$!%*?&#)" }) // At least one special character

})

const SignIn = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const auth = useAppSelector((state: RootState) => state.auth.value);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth.token) {
          router.push("/");
        }
      }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const response = await signIn(values);
        
        if(response.success) {
            // localStorage.setItem("token", response.data.access_token);
            dispatch(logIn({ token: response.data.access_token}));
            router.push("/")
            toast.success(response.message);
        } else {
            toast.warn(response?.response?.data?.message);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
      };
    return (
        <div className='card-component'>
            <ToastContainer/>
            <Card className='auth-form'>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col justify-between items-center">
                            <div className='input-fields'>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="field">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl> 
                                                <Input placeholder="username" {...field} leftIcon={<CiUser className='mr-[10px]'/>}/>
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
                                                        <FaEye onClick={togglePasswordVisibility} className="cursor-pointer" /> // Eye icon on the right
                                                      }
                                                    />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className='min-w-64 rounded-sm items-center submit-btn '>Login</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </CardFooter>
            </Card>

        </div>
    )
}

export default SignIn;
