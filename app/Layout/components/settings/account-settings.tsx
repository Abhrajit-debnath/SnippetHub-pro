"use client";

import React, { useState } from "react";
import axios from "@/app/config/axios.config";
import { Pencil, Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuthStore } from "@/app/store/authStore";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import hotToast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/app/schema/resetPasswordSchema";
import z from "zod";
import { useSnippetStore } from "@/app/store/snippetStore";

type ResetPasswordForm = {
  password: string;
};
const AccountSettings = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { user, clearUser, updateUser } = useAuthStore();

  const router = useRouter();

  const [edit, setEdit] = useState<boolean>(false);
  const [username, setUsername] = useState(user?.username ?? "");

  const [editEmail, setEditEmail] = useState<boolean>(false);
  const [showResetPassword, setShowResetPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);

  const handeldeleteAccount = async () => {
    try {
      const response = await axios.delete("/auth/delete/");

      if (response.status === 200) {
        hotToast.success("Account has been deleted");
        clearUser();
        useSnippetStore.persist.clearStorage();
        router.push("/auth/signin");
      }
    } catch (error) {}
  };

  const updateUsernameHandeler = async () => {
    try {
      const response = await axios.put("/account/update-uname", { username });
      if (response.status === 200) {
        toast.success("Username has been updated");
        setEdit(false);
        updateUser({ username });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update username");
    }
  };

  const updateEmailHandeler = async () => {
    try {
      const response = await axios.put("/account/update-email", { email });
      if (response.status === 200) {
        toast.success("Username has been updated");
        setEditEmail(false);
        updateUser({ email });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update username");
    }
  };

  const onResetPassword = async (data: ResetPasswordForm) => {
    try {
      const response = await axios.put("/account/reset-password", {
        password: data.password,
      });
      setLoading(true);

      if (response.status === 200) {
        toast.success("Password reset successfully");
      }

      reset();
      setShowResetPassword(false);
    } catch {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-foreground px-4 py-6 min-h-full items-center flex justify-center">
      <div className="w-full max-w-xl md:max-w-2xl space-y-6">
        <Card className="bg-sidebarBg border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm sm:text-base text-white font-poppins">
              Account Settings
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-zinc-400 font-inter">
              Manage your personal information and security
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white font-poppins text-xs sm:text-sm">
                Username
              </Label>

              <div className="relative flex items-center gap-2">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!edit}
                  className={`bg-zinc-800 border-zinc-700 text-white pr-20 ${
                    edit && "border-primary"
                  }`}
                />

                {!edit && (
                  <button
                    onClick={() => setEdit(true)}
                    className="absolute right-4 text-white cursor-pointer"
                  >
                    <Pencil size={15} />
                  </button>
                )}

                {edit && (
                  <div className="absolute right-2 flex gap-2">
                    <button
                      onClick={updateUsernameHandeler}
                      className="text-green-500 hover:text-green-400 cursor-pointer"
                    >
                      <Check size={16} />
                    </button>

                    <button
                      onClick={() => {
                        setUsername(user?.username ?? "");
                        setEdit(false);
                      }}
                      className="text-red-500 hover:text-red-400 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white font-poppins text-xs sm:text-sm">
                Email
              </Label>

              <div className="relative flex items-center gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!editEmail}
                  className={`bg-zinc-800 border-zinc-700 text-white pr-20 ${
                    editEmail && "border-primary"
                  }`}
                />

                {!editEmail && (
                  <button
                    onClick={() => setEditEmail(true)}
                    className="absolute right-4 text-white cursor-pointer"
                  >
                    <Pencil size={15} />
                  </button>
                )}

                {editEmail && (
                  <div className="absolute right-2 flex gap-2">
                    <button
                      onClick={updateEmailHandeler}
                      className="text-green-500 hover:text-green-400 cursor-pointer"
                    >
                      <Check size={16} />
                    </button>

                    <button
                      onClick={() => {
                        setEmail(user?.email ?? "");
                        setEditEmail(false);
                      }}
                      className="text-red-500 hover:text-red-400 cursor-pointer"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-sidebarBg border-zinc-800">
          <CardHeader>
            <CardTitle className="text-sm sm:text-base text-white font-poppins">
              Security
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-zinc-400 font-inter">
              Manage your password and authentication
            </CardDescription>
          </CardHeader>

          <CardContent>
            {showResetPassword && errors.password && touchedFields.password && (
              <p className="text-xs font-inter text-red-500 pb-3">
                {errors.password.message}
              </p>
            )}

            <form
              onSubmit={handleSubmit(onResetPassword)}
              className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"
            >
              {showResetPassword ? (
                <div className="relative w-full">
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    className="bg-zinc-800 text-white pr-10"
                  />

                  <button
                    className="absolute right-4 top-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4  lg:w-5 lg:h-5 text-white" />
                    ) : (
                      <EyeClosed className="h-4 w-4  lg:w-5 lg:h-5 text-white" />
                    )}
                  </button>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-zinc-400 font-inter">
                  Forgot your password or want to reset it?
                </p>
              )}
              <div className="flex  flex-col sm:flex-row sm:space-x-2 sm:space-y-0 space-y-2">
                <Button
                  onClick={() => {
                    if (!showResetPassword) setShowResetPassword(true);
                  }}
                  type={showResetPassword ? "submit" : "button"}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-buttonColor capitalize hover:bg-buttonColorHover font-poppins cursor-pointer"
                >
                  {showResetPassword
                    ? "reset"
                    : loading
                      ? "reseting.."
                      : "reset password"}
                </Button>

                <Button
                  onClick={() => {
                    setShowResetPassword(false);
                    reset();
                  }}
                  className={`w-full sm:w-auto bg-red-600 hover:bg-red-700 font-poppins cursor-pointer ${
                    showResetPassword ? "block" : "hidden"
                  }`}
                >
                  cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Separator className="bg-zinc-800" />

        <Card className="bg-sidebarBg border-red-900">
          <CardHeader>
            <CardTitle className="text-sm sm:text-base text-red-500 font-poppins">
              Danger Zone
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-zinc-400 font-inter">
              These actions are irreversible
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <p className="text-xs sm:text-sm text-zinc-400 font-inter">
              Permanently delete your account
            </p>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full sm:w-auto font-poppins cursor-pointer"
                >
                  Delete Account
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-white font-poppins">
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-zinc-400 font-inter">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer bg-buttonColor text-white border-none hover:text-white font-poppins hover:bg-buttonColorHover">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handeldeleteAccount();
                    }}
                    className="bg-red-600 hover:bg-red-700 cursor-pointer font-poppins"
                  >
                    Yes, delete account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSettings;
