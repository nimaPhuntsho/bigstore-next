"use client";

import {
  VStack,
  Text,
  Input,
  Button,
  Card,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/custom/FormError";
import NewLogo from "@/components/custom/NewLogo";

import { useRouter } from "next/navigation";
import { useSession } from "@/app/store /session/session";
import Link from "next/link";
import { startCase } from "lodash";
import { registerSchema } from "@/app/(auth)/register/registerSchema";
import { createClient } from "@/app/supabase/supabaseServer";
import { createUser } from "@/app/actions/createUser";
import { signUpUser } from "@/app/actions/signUpUser";

type RegisterType = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
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

  const [registerState, setRegisterState] = useState<{
    loading: boolean;
    error: boolean;
    errorMessage: string;
    success: boolean;
  }>({
    loading: false,
    error: true,
    errorMessage: "",
    success: false,
  });

  useEffect(() => {}, [password]);
  const router = useRouter();

  const { updateSession } = useSession();

  const onSubmit: SubmitHandler<RegisterType> = async (signUpData) => {
    try {
      setRegisterState((state) => ({ ...state, loading: true }));
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

      console.log(error);

      if (!data || error) {
        setRegisterState((state) => ({
          ...state,
          error: true,
          errorMessage: error,
        }));
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

      if (!userData || userError) {
        setRegisterState((state) => ({
          ...state,
          error: true,
          errorMessage: userError,
        }));
      }

      console.log(userError);

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setRegisterState((state) => ({ ...state, loading: false }));
    }
  };
  return (
    <>
      <VStack alignItems="center" justifyContent="center" minHeight="100dvh">
        <Card.Root
          width={{
            base: "90%",
            sm: "500px",
          }}
          p={{
            base: "0rem",
            sm: ".5rem",
          }}
        >
          <Card.Header>
            <Card.Title fontWeight={700}>Sign up</Card.Title>
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
              <VStack alignItems="stretch" gap="1rem">
                <VStack alignItems="flex-start">
                  <Text>First Name</Text>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                    rules={{
                      required: "First name is required",
                    }}
                  />
                </VStack>
                <FormError error={errors} field="firstName" />
                <VStack alignItems="flex-start">
                  <Text>Last Name</Text>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                    rules={{
                      required: "Last name is required",
                    }}
                  />
                </VStack>
                <FormError error={errors} field="lastName" />

                <VStack alignItems="flex-start">
                  <Text>Email</Text>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <Input {...field} />}
                    rules={{
                      required: "Email name is required",
                    }}
                  />
                  <FormError error={errors} field="email" />
                </VStack>
                <VStack alignItems="flex-start">
                  <Text>Password</Text>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <PasswordInput {...field} />}
                    rules={{
                      required: "Password  is required",
                    }}
                  />
                  <FormError error={errors} field="password" />
                </VStack>

                <VStack alignItems="flex-start">
                  <Text>Confirm Password</Text>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => <PasswordInput {...field} />}
                    rules={{
                      required: "Password confirmation is required",
                    }}
                  />
                  <FormError error={errors} field="confirmPassword" />
                  {password && <Text color="red">Passwords doesnt match</Text>}
                  {registerState.error && (
                    <Text color="red"> {registerState.errorMessage} </Text>
                  )}
                </VStack>
                <Button
                  _active={{
                    bgColor: "#F7F7F7",
                    color: "black",
                    transform: "scale(0.95)",
                  }}
                  transition="all .1s ease-in-out"
                  fontWeight="bold"
                  type="submit"
                  disabled={!isValid}
                >
                  Sign up {registerState.loading && <Spinner />}
                </Button>
              </VStack>
              <p>{authError}</p>
              <Link href="/login">
                <Text
                  _active={{
                    textDecoration: "underline",
                  }}
                  fontWeight={600}
                >
                  Already have an account ?
                </Text>
              </Link>
            </form>
          </Card.Body>
        </Card.Root>
      </VStack>
    </>
  );
};

export default RegisterForm;
