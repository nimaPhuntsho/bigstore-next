"use client";

import { supabase } from "@/app/supabase/supabaseClient";
import {
  Button,
  Heading,
  VStack,
  Input,
  Text,
  Spinner,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { PasswordInput } from "../ui/password-input";
import { useRouter } from "next/navigation";

const ForgotPasswordForm = () => {
  const [passwordState, setPasswordState] = useState<{
    loading: boolean;
    error: boolean;
    errorMessage: string;
    incorrect: boolean;
    success: boolean;
    successMessage: string;
  }>({
    loading: false,
    error: false,
    errorMessage: "",
    incorrect: false,
    success: false,
    successMessage: "",
  });
  const { register, control, handleSubmit } = useForm<{
    newPassword: string;
    confirmPassword: string;
  }>({
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<{
    newPassword: string;
    confirmPassword: string;
  }> = async ({ newPassword, confirmPassword }) => {
    try {
      setPasswordState((state) => ({ ...state, loading: true }));

      if (newPassword !== confirmPassword) {
        setPasswordState((state) => ({ ...state, incorrect: true }));
        return;
      }
      const response = await updatePassword(newPassword);
      if (!response.success) {
        setPasswordState((state) => ({
          ...state,
          error: true,
          errorMessage: response.message,
          loading: false,
        }));
        return;
      }

      setPasswordState((state) => ({
        ...state,
        success: true,
        successMessage: "New password updated",
        loading: false,
      }));
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  async function updatePassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error)
      return {
        success: false as const,
        message: error.message,
        data: error,
      };

    return {
      success: true as const,
      message: "new password updated",
      data: data.user,
    };
  }
  return (
    <>
      <VStack alignItems="center" height="100dvh" justifyContent="center">
        <VStack
          width={{
            base: "80%",
            sm: "300px",
          }}
          alignItems="start"
        >
          <Heading fontWeight="800">Reset password</Heading>
          <VStack width="100%" alignItems="stretch">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack width="100%" alignItems="stretch">
                <VStack alignItems="stretch">
                  <label htmlFor="">New password</label>
                  <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => <PasswordInput {...field} />}
                  />
                </VStack>
                <VStack alignItems="start">
                  <label htmlFor="">Confirm password</label>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => <PasswordInput {...field} />}
                  />
                </VStack>
                {passwordState.incorrect && <Text>Passwords doesnt match</Text>}
                {passwordState.success && (
                  <Text> {passwordState.successMessage} </Text>
                )}

                {passwordState.error && (
                  <Text> {passwordState.errorMessage} </Text>
                )}

                <Button
                  _active={{
                    textDecoration: "underline",
                  }}
                  transition="all .1s ease-in-out"
                  fontWeight="bold"
                  type="submit"
                >
                  Update Password {passwordState.loading && <Spinner />}
                </Button>
              </VStack>
            </form>
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};

export default ForgotPasswordForm;
