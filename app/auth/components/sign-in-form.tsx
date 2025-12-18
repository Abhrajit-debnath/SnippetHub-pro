"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "../../schema/login-schema";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { useState } from "react";
import axios from "@/app/config/axios.config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type LoginFormValues = z.infer<typeof loginSchema>;

const SignInComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  
  // Form state initialization

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submit handler

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Validated Data:", data);
    try {
      const response = await axios.post("/auth/login", data);
      const toastId = toast.loading("Signing in...");
      console.log(response);

      if (response.status === 200) {
        toast.success("Login successful", { id: toastId });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <h2 className="font-poppins text-lg font-medium mb-6 md:text-xl lg:text-2xl">
        Login
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full border rounded-xl p-4 border-zinc-300"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-poppins text-sm font-medium md:text-[15px] lg:text-[16px]">
                  email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    className="font-inter text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-inter font-normal text-xs lg:text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-poppins text-sm font-medium md:text-[15px] lg:text-[16px]">
                  password
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center items-center relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      {...field}
                      className="font-inter text-sm   transition-all duration-200 ease-out "
                    />
                    <button
                      type="button"
                      className="absolute right-4"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye className="h-4 w-4 text-muted-foreground lg:w-5 lg:h-5" />
                      ) : (
                        <EyeClosed className="h-4 w-4 text-muted-foreground lg:w-5 lg:h-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="font-inter font-normal text-xs lg:text-sm" />
                <div className="flex justify-end font-poppins text-xs mt-1 md:text-sm">
                  <h2 className="capitalize cursor-pointer text-blue-500">
                    <Link href="/auth/forgot-password">Forgot password ?</Link>
                  </h2>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer font-poppins text-xs md:text-sm lg:text-[16px]"
          >
            Login
          </Button>
        </form>
      </Form>

      <h2 className="font-poppins text-xs mt-3 md:text-sm">
        Dont have an account ?{" "}
        <Link
          href="/auth/register"
          className="capitalize cursor-pointer text-blue-500"
        >
          create one
        </Link>
      </h2>
    </div>
  );
};

export default SignInComponent;
