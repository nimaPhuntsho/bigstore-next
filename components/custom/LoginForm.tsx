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
} from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useSession } from "@/app/store /session/session";
import { useRouter, useSearchParams } from "next/navigation";
import { registerSchema } from "@/app/(auth)/register/registerSchema";
import { PasswordInput } from "../ui/password-input";
import { customRevalidatePath } from "@/app/actions/customRevalidatePath";
import { development } from "@/mode";
import { callFetch } from "@/app/util/fetch";

type RegisterSchemaType = z.infer<typeof registerSchema>;
type LoginType = Pick<RegisterSchemaType, "email" | "password">;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<{
    hasError: boolean;
    message: string | null;
  }>({
    hasError: false,
    message: "",
  });

  const { register, control, formState, watch, handleSubmit } =
    useForm<LoginType>({
      defaultValues: {
        email: "",
        password: "",
      },
    });

  // const { session, updateSession } = useSession();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    try {
      setLoading(true);
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

      console.log(signInData);

      if (!signInData) {
        return;
      }

      if (!signInData.success) {
        setLoginError((state) => ({
          ...state,
          hasError: true,
          message: signInData.error,
        }));
        return;
      }

      customRevalidatePath("dashboard");

      if (!callbackUrl) {
        router.push("/dashboard");
        return;
      }

      router.push(callbackUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <VStack alignItems="center" justifyContent="center" height="100dvh">
          <Card.Root>
            <Card.Header>
              <Heading>Login</Heading>
            </Card.Header>
            <Card.Body>
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
              <Button type="submit">Login {loading && <Spinner />}</Button>
              {loginError.hasError && <p> {loginError.message} </p>}
              <Link href="/register">
                <Text>Create an account</Text>
              </Link>
            </Card.Body>
          </Card.Root>
        </VStack>
      </form>
    </>
  );
};

export default Login;
