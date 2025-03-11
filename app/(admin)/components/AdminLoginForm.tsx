"use client";

import { callFetch } from "@/app/util/fetch";
import { PasswordInput } from "@/components/ui/password-input";
import { Heading, VStack, Text, Input, Button } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { development } from "@/mode";
import { SessionSchema } from "@/app/(main)/(auth)/register/zodSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";

const AdminLoginForm = () => {
  const [loginState, setLoginState] = useState<{
    hasError: boolean;
    message: string | null;
    loading: boolean;
    success: boolean;
  }>({
    hasError: false,
    message: "",
    loading: false,
    success: false,
  });
  const { control, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data
  ) => {
    console.log(data);
    const { mode } = development;

    const { success, data: signInData } = await callFetch({
      endpoint: `${mode.local}/api/v1/signIn`,
      method: "POST",
      body: data,
      schema: z.object({
        message: z.string(),
        success: z.boolean(),
        error: z.string().nullable(),
        data: SessionSchema,
      }),
    });

    if (!signInData) {
      // setLoginState((state) => ({
      //   ...state,
      //   hasError: true,
      //   message: "Error loggin in, please try again",
      // }));
      // setLoginState((state) => ({ ...state, loading: false }));
      return;
    }

    if (!signInData.success) {
      // setLoginState((state) => ({
      //   ...state,
      //   hasError: true,
      //   message: signInData.error,
      // }));
      // setLoginState((state) => ({ ...state, loading: false }));
      return;
    }

    const role = signInData.data.user.user_metadata;
    if (role.role !== "admin") {
      setLoginState((state) => ({
        ...state,
        hasError: true,
        message: "This is only for admin login",
      }));
      return;
    }

    router.push("/super");
  };
  return (
    <>
      <VStack minH="100dvh" alignItems="center" justifyContent="center">
        <VStack gap="2rem">
          <Heading>Admin login</Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap="1rem" alignItems="stretch">
              <VStack alignItems="start">
                <Text>Email</Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </VStack>

              <VStack alignItems="start">
                <Text>Password</Text>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <PasswordInput {...field} />}
                />
              </VStack>
              <Button type="submit"> Login </Button>
              {loginState.hasError && <p> {loginState.message} </p>}
            </VStack>
          </form>
        </VStack>
      </VStack>
    </>
  );
};

export default AdminLoginForm;
