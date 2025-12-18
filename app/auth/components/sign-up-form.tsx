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
import { signupSchema } from "../../schema/signup-schema";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { useState } from "react";
import axios from "@/app/config/axios.config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type SignUpFormValues = z.infer<typeof signupSchema>;

const SignUpComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  // Form state initialization

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const payLoad = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post("/auth/register", payLoad);
      const toastId = toast.loading("Signing up...");
      console.log(response);

      if (response.status === 200) {
        toast.success("Signup successful", { id: toastId });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err.response?.data?.error || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <h2 className="font-poppins text-lg capitalize font-medium mb-6 md:text-xl lg:text-2xl">
        Register
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full border rounded-xl p-4 border-zinc-300"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-poppins text-sm font-medium md:text-[15px] lg:text-[16px]">
                  username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize font-poppins text-sm font-medium md:text-[15px] lg:text-[16px]">
                  confirm password
                </FormLabel>
                <FormControl>
                  <div className="flex justify-center items-center relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="re-enter passoword"
                      {...field}
                      className="font-inter text-sm transition-all duration-200 ease-out "
                    />
                    <button
                      className="absolute right-4"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <Eye className="h-4 w-4 text-muted-foreground lg:w-5 lg:h-5" />
                      ) : (
                        <EyeClosed className="h-4 w-4 text-muted-foreground lg:w-5 lg:h-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="font-inter font-normal text-xs lg:text-sm" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer font-poppins capitalize text-xs md:text-sm lg:text-[16px]"
          >
            register
          </Button>
        </form>
      </Form>

      <h2 className="font-poppins text-xs mt-3 md:text-sm">
        Already have an account ?{" "}
        <Link
          href="/auth/signin"
          className="capitalize cursor-pointer text-blue-500"
        >
          sign In
        </Link>
      </h2>
    </div>
  );
};

export default SignUpComponent;
