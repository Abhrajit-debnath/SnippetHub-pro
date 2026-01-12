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
import Logo from "./logo";
import Aurora from "./backgrounds/AuroraBackground";

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
        router.push("/dashboard/home");
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
    <div className="w-screen min-h-screen relative">
      <div className="absolute inset-0 overflow-hidden z-0">
        <Aurora
          colorStops={["#9929ea", "#B19EEF", "#5227FF"]}
          amplitude={5.2}
          blend={0.9}
        />
      </div>

    <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center w-full max-w-md  px-4">
          <Logo />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full border rounded-xl text-center p-4 border-zinc-700  bg-backgroundBg/30
    backdrop-blur-3xl
    shadow-2xl"
            >
              <h2 className="font-poppins text-lg font-medium mb-6 md:text-xl lg:text-2xl text-white">
                Login
              </h2>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize font-poppins text-sm font-medium md:text-[15px] lg:text-[16px] text-white">
                      email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        className="font-inter text-sm border-gray-600 text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-inter font-normal text-xs lg:text-sm text-left" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize font-poppins text-sm font-medium md:text-[15px] lg:text-[16px] text-white">
                      password
                    </FormLabel>
                    <FormControl>
                      <div className="flex justify-center items-center relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="password "
                          {...field}
                          className="font-inter text-sm border-gray-600 text-white transition-all duration-200 ease-out "
                        />
                        <button
                          type="button"
                          className="absolute right-4"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4  lg:w-5 lg:h-5 text-white" />
                          ) : (
                            <EyeClosed className="h-4 w-4 lg:w-5 lg:h-5 text-white" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="font-inter text-left font-normal text-xs lg:text-sm" />
                    <div className="flex justify-end font-poppins text-xs mt-1 md:text-sm">
                      <h2 className="capitalize cursor-pointer text-blue-500">
                        <Link href="/auth/forgot-password">
                          Forgot password ?
                        </Link>
                      </h2>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer font-poppins text-xs md:text-sm lg:text-[16px] bg-buttonColor xl:py-5 hover:bg-buttonColorHover"
              >
                Login
              </Button>
            </form>
          </Form>

          <h2 className="font-poppins text-xs mt-3 md:text-sm text-white">
            Dont have an account ?{" "}
            <Link
              href="/auth/register"
              className="capitalize cursor-pointer text-blue-500"
            >
              create one
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
