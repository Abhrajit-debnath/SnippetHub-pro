"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
  InputGroupText,
} from "@/components/ui/input-group";
import { LoaderCircle } from "lucide-react";
import { snippetSchema } from "@/app/schema/snippet-form-schema";

import TagInput from "./tags-field";
import { handleAddSnippet } from "@/app/helpers/addSnippet";
import { toast } from "sonner";
import type { Snippet } from "@/app/types/snippet-type";
import { handleUpdateSnippet } from "@/app/helpers/updateSnippet";

type SnippetFormValues = z.infer<typeof snippetSchema>;

type SnippetFormProps = {
  setOpenSnippetForm: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSnippet: React.Dispatch<React.SetStateAction<Snippet | null>>;
  selectedSnippet: Snippet | null;
  onSuccess: () => void;
};

const SnippetForm = ({
  setOpenSnippetForm,
  setSelectedSnippet,
  selectedSnippet,
  onSuccess,
}: SnippetFormProps) => {
  const form = useForm<SnippetFormValues>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: "",
      code: "",
      tags: [],
      language: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    watch,
  } = form;

  useEffect(() => {
    if (selectedSnippet) {
      reset({
        title: selectedSnippet.title,
        code: selectedSnippet.code,
        tags: selectedSnippet.tags || [],
        language: selectedSnippet.language,
      });
    } else {
      reset({
        title: "",
        code: "",
        tags: [],
        language: "",
      });
    }
  }, [selectedSnippet, reset]);

  const codeValue = watch("code");

  const isEditMode = Boolean(selectedSnippet);

  const onSubmit = async (data: SnippetFormValues) => {
    try {
      if (isEditMode && selectedSnippet) {
        const response = await handleUpdateSnippet(
          String(selectedSnippet._id),
          data
        );

        if (response.status === 200) {
          toast.success("Snippet updated successfully");
        } else {
          toast.error("Failed to update snippet");
        }
      } else {
        const response = await handleAddSnippet("/snippets/add", data);

        if (response.status === 201) {
          toast.success("Snippet created successfully");
        } else {
          toast.error("Failed to create snippet");
        }
      }

      reset();
      setSelectedSnippet(null);
      setOpenSnippetForm(false);

      onSuccess();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-full">
      <Card className="w-75 sm:w-md bg-sidebarBg border-zinc-700">
        <CardHeader>
          <CardTitle className="capitalize font-poppins text-white">
            {isEditMode ? "update snippet" : "new snippet"}
          </CardTitle>
          <CardDescription className="font-inter capitalize text-zinc-400">
            {isEditMode
              ? "Update your existing snippet"
              : "Create code snippets with ease"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="snippet-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Title */}
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="capitalize font-poppins text-white">
                      Snippet title
                    </FieldLabel>
                    <Input
                      className="bg-zinc-800! text-white border-zinc-600"
                      {...field}
                      placeholder="Snippet title goes here"
                      autoComplete="off"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Code */}
              <Controller
                name="code"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="capitalize font-poppins text-white">
                      Code
                    </FieldLabel>

                    <InputGroup className="max-h-30 overflow-auto border-zinc-700">
                      <InputGroupTextarea
                        {...field}
                        placeholder="Your snippet code goes here"
                        rows={6}
                        className="resize-none text-white font-mono bg-zinc-800!"
                      />

                      <InputGroupAddon
                        align="block-end"
                        className="bg-zinc-800! "
                      >
                        <InputGroupText className="tabular-nums text-xs text-white">
                          {codeValue?.length || 0} chars
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex flex-col space-y-6 md:flex-row md:space-x-6">
                <Controller
                  name="tags"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="capitalize font-poppins text-white">
                        tags
                      </FieldLabel>

                      <TagInput
                        value={field.value || []}
                        onChange={field.onChange}
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="language"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="capitalize font-poppins text-white">
                        language
                      </FieldLabel>

                      <Input
                        className="bg-zinc-800! border-zinc-700 text-white"
                        {...field}
                        placeholder="your language goes here"
                        autoComplete="off"
                      />

                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            className="bg-zinc-900! capitalize font-poppins border-zinc-700 text-white hover:text-white cursor-pointer hover:bg-zinc-800"
            type="button"
            variant="outline"
            onClick={() => setOpenSnippetForm(false)}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="snippet-form"
            disabled={isSubmitting}
            className="capitalize
             font-poppins bg-buttonColor cursor-pointer hover:bg-buttonColorHover"
          >
            {isSubmitting ? (
              <div className="flex gap-1">
                <LoaderCircle className="animate-spin" />
                <p>{isEditMode ? "updating snippet" : "saving snippet"}</p>
              </div>
            ) : isEditMode ? (
              "Update Snippet"
            ) : (
              "Create Snippet"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SnippetForm;
