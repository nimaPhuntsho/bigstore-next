"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { registerSchema } from "@/app/(auth)/register/registerSchema";
import { PasswordInput } from "../ui/password-input";
import { customRevalidatePath } from "@/app/actions/customRevalidatePath";
import { development } from "@/mode";
import { callFetch } from "@/app/util/fetch";
import CustomDialog from "./CustomDialog";
import ResetPasswordDialog from "./ResetPasswordDialog";

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
        }),
      });

      if (!signInData) {
        return;
      }

      if (!signInData.success) {
        setLoginState((state) => ({
          ...state,
          hasError: true,
          message: signInData.error,
        }));
        return;
      }
      customRevalidatePath("dashboard");
      if (!callbackUrl || success) {
        router.push("/dashboard");
        setLoginState((state) => ({ ...state, loading: false }));
        return;
      }

      router.push(callbackUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setLoginState((state) => ({ ...state, loading: false }));
    }
  };

  return (
    <>
      <VStack width="100%" height="100dvh" justifyContent="center">
        <Box
          width={{
            base: "90%",
            sm: "400px",
          }}
        >
          <Card.Root padding="1rem">
            <Card.Header>
              <Heading fontWeight={800}>Login</Heading>
            </Card.Header>
            <Card.Body>
              <VStack alignItems="stretch">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <VStack alignItems="stretch">
                    <VStack alignItems="stretch" gap="1rem">
                      <VStack alignItems="start" width="100%">
                        <Text>Email </Text>
                        <Controller
                          name="email"
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                      </VStack>
                      <VStack alignItems="start" width="100%">
                        <Text>Password</Text>
                        <Controller
                          name="password"
                          control={control}
                          render={({ field }) => <PasswordInput {...field} />}
                        />
                      </VStack>
                      <Button type="submit">
                        Login {loginState.loading && <Spinner />}
                      </Button>
                    </VStack>
                    {loginState.hasError && (
                      <Text color="red"> {loginState.message} </Text>
                    )}
                  </VStack>
                </form>
                <ResetPasswordDialog />
                <Link href="/register">
                  <Text>
                    Dont have aaccount? <strong>Sign up here</strong>
                  </Text>
                </Link>
              </VStack>
            </Card.Body>
          </Card.Root>
        </Box>
      </VStack>
    </>
  );
};

export default Login;
