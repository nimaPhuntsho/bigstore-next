"use client";
import React, { useEffect } from "react";
import { VStack, Text, Input, Button, Card, Heading } from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useSession } from "@/app/store /session/session";
import { useRouter, useSearchParams } from "next/navigation";
import { registerSchema } from "@/app/(auth)/register/registerSchema";
import { PasswordInput } from "../ui/password-input";
import { revalidatePath } from "next/cache";
import { customRevalidatePath } from "@/app/actions/customRevalidatePath";

type RegisterSchemaType = z.infer<typeof registerSchema>;
type LoginType = Pick<RegisterSchemaType, "email" | "password">;

const Login = () => {
  const { register, control, formState, watch, handleSubmit } =
    useForm<LoginType>({
      defaultValues: {
        email: "",
        password: "",
      },
    });

  const { session, updateSession } = useSession();
  useEffect(() => {
    // const getUser = async () => {
    //   const user = await supabase.auth.getUser();
    //   console.log(user);
    // };
    // getUser();
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    const response = await fetch("http://localhost:3000/api/v1/signIn", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response);
      router.push("/login");
    }
    console.log(callbackUrl);

    if (!callbackUrl) {
      customRevalidatePath("/dashboard");
      router.push("/dashboard");

      return;
    }

    router.push(callbackUrl);
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
              <Button type="submit">Login</Button>
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
