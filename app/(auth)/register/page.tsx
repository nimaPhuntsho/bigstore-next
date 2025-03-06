"use client";

import { VStack, Text, Input, Button, Card, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "./registerSchema";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/custom/FormError";
import NewLogo from "@/components/custom/NewLogo";
import { supabase } from "@/app/supabase/supabaseClient";
import { redirect, useRouter } from "next/navigation";
import { callFetch } from "@/app/util/fetch";
// import { useSession } from "@/app/store /session/session";
import { SessionSchema, SignUpSessionSchema } from "./zodSchema";
import { useSession } from "@/app/store /session/session";
import Link from "next/link";
import { startCase, upperCase } from "lodash";

type RegisterType = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const [password, setPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    // console.log(localStorage.getItem(""));
  }, [password]);
  const router = useRouter();

  const { session, updateSession } = useSession();

  const onSubmit: SubmitHandler<RegisterType> = async (signUpData) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        signUpData;
      if (
        password.toLowerCase().trim() !== confirmPassword.toLowerCase().trim()
      ) {
        setPassword(true);
        return;
      }

      const { data, error } = await signUpUser({
        email: email,
        password: password,
      });

      if (!data || error) {
        setAuthError(error);
        return;
      }

      const { session, user } = data;

      if (!user) return;

      const { data: userData, error: userError } = await createUser({
        firstName: startCase(firstName),
        lastName: startCase(lastName),
        email: email,
        userId: user.id,
      });

      console.log(userError);
      if (!session) return;
      updateSession(session);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <VStack alignItems="center" justifyContent="center" height="100dvh">
        <Card.Root width="25rem" size="lg">
          <Card.Header>
            <NewLogo />
            <Card.Title>Login</Card.Title>
          </Card.Header>
          <Card.Body>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
              action=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <VStack alignItems="flex-start">
                <Text>First Name</Text>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </VStack>
              <FormError error={errors} field="firstName" />
              <VStack alignItems="flex-start">
                <Text>Last Name</Text>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
              </VStack>
              <FormError error={errors} field="lastName" />

              <VStack alignItems="flex-start">
                <Text>Email</Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />
                <FormError error={errors} field="email" />
              </VStack>
              <VStack alignItems="flex-start">
                <Text>Password</Text>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <PasswordInput {...field} />}
                />
                <FormError error={errors} field="password" />
              </VStack>

              <VStack alignItems="flex-start">
                <Text>Confirm Password</Text>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => <PasswordInput {...field} />}
                />
                <FormError error={errors} field="confirmPassword" />
                {password && <p>Passwords doesn't match</p>}
              </VStack>
              <Button type="submit">Sign up</Button>
            </form>
            <p>{authError}</p>
            <Link href="/login">
              <Text>Already have an account ?</Text>
            </Link>
          </Card.Body>
        </Card.Root>
      </VStack>
    </>
  );
};

export default Register;

async function signUpUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return {
      error: error.message,
      data: null,
    };
  }

  return {
    error: null,
    data: data,
  };
}

async function createUser({
  firstName,
  lastName,
  userId,
  email,
}: {
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
}) {
  const { data, error } = await supabase
    .from("users")
    .insert({
      first_name: firstName,
      last_name: lastName,
      user_id: userId,
      email: email,
    })
    .select();

  if (error)
    return {
      error: error.message,
      data: null,
    };

  return {
    error: null,
    data: data,
  };
}
