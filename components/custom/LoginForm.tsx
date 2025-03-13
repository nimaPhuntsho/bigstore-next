"use client";
import React, { useState, useTransition } from "react";
import {
  VStack,
  Text,
  Input,
  Button,
  Card,
  Heading,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { registerSchema } from "@/app/(main)/(auth)/register/registerSchema";
import { PasswordInput } from "../ui/password-input";
import { customRevalidatePath } from "@/app/actions/customRevalidatePath";
import { development } from "@/mode";
import { callFetch } from "@/app/util/fetch";
import ResetPasswordDialog from "./ResetPasswordDialog";
import { SessionSchema } from "@/app/(main)/(auth)/register/zodSchema";

type RegisterSchemaType = z.infer<typeof registerSchema>;
type LoginType = Pick<RegisterSchemaType, "email" | "password">;

const Login = () => {
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

  const { register, control, formState, watch, handleSubmit } =
    useForm<LoginType>({
      defaultValues: {
        email: "",
        password: "",
      },
    });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      setLoginState((state) => ({ ...state, loading: true }));
      const { mode } = development;

      const { success, data: signInData } = await callFetch({
        endpoint: `${mode.production}/api/v1/signIn`,
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
        setLoginState((state) => ({
          ...state,
          hasError: true,
          message: "Error loggin in, please try again",
        }));
        setLoginState((state) => ({ ...state, loading: false }));
        return;
      }

      if (!signInData.success) {
        setLoginState((state) => ({
          ...state,
          hasError: true,
          message: signInData.error,
        }));
        setLoginState((state) => ({ ...state, loading: false }));
        return;
      }

      const userId = signInData.data.user.id;

      customRevalidatePath(`/dashboard/${userId}`);
      if (!callbackUrl) {
        startTransition(() => {
          router.push(`/dashboard/${userId}`);
          setLoginState((state) => ({ ...state, loading: false }));
        });
        return;
      }
      router.push(callbackUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <VStack
        minW={370}
        minH="100dvh"
        justifyContent="center"
        alignItems="stretch"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems="stretch">
            <VStack alignItems="stretch" gap="1rem">
              <Heading size="2xl" fontWeight={900}>
                Sign in
              </Heading>
              <VStack alignItems="start" width="100%">
                <Text>Email </Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input size="xl" {...field} />}
                  rules={{
                    required: "Email is required",
                  }}
                />
              </VStack>
              <VStack alignItems="start" width="100%">
                <Text>Password</Text>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <PasswordInput size="xl" {...field} />}
                  rules={{
                    required: "Password is required",
                  }}
                />
              </VStack>
              <Button
                size="xl"
                _active={{
                  bgColor: "#F7F7F7",
                  color: "black",
                  transform: "scale(0.95)",
                }}
                transition="all .1s ease-in-out"
                fontWeight="bold"
                type="submit"
                disabled={!formState.isValid}
              >
                Login {loginState.loading && <Spinner />}
              </Button>
            </VStack>
            {loginState.hasError && (
              <Text color="red">{loginState.message} </Text>
            )}
          </VStack>
        </form>
        <ResetPasswordDialog />
        <Link href={callbackUrl ? "/register?callbackUrl=/cart" : "/register"}>
          <Text>
            Dont have an account?
            <Text
              _active={{
                textDecoration: "underline",
              }}
              transition="all .1s ease-in-out"
              fontWeight="bold"
              as="span"
              ml={1}
              onClick={() => {
                if (callbackUrl) {
                  redirect(`/register?callbackUrl=/cart`);
                }
              }}
            >
              Sign up here
            </Text>
          </Text>
        </Link>
      </VStack>
    </>
  );
};

export default Login;
