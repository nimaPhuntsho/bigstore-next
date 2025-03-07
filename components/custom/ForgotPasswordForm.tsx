"use client";

import { updateNewPassword } from "@/app/actions/resetPassword";
import { Button, Heading, VStack, Input, Text } from "@chakra-ui/react";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

const ForgotPasswordForm = () => {
  const [passwordState, setPasswordState] = useState<{
    loading: boolean;
    error: boolean;
    errorMessage: string;
    incorrect: boolean;
  }>({
    loading: true,
    error: false,
    errorMessage: "",
    incorrect: false,
  });
  const { register, control, handleSubmit } = useForm<{
    newPassword: string;
    confirmPassword: string;
  }>({
    defaultValues: { newPassword: "", confirmPassword: "" },
  });
  const onSubmit: SubmitHandler<{
    newPassword: string;
    confirmPassword: string;
  }> = async ({ newPassword, confirmPassword }) => {
    try {
      if (newPassword !== confirmPassword) {
        setPasswordState((state) => ({ ...state, incorrect: true }));
        return;
      }

      const response = await updateNewPassword(newPassword);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <>
      <Heading>Reset password</Heading>
      <VStack alignItems="start">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack alignItems="start">
            <label htmlFor="">New password</label>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </VStack>
          <VStack alignItems="start">
            <label htmlFor="">Confirm password</label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </VStack>
          {passwordState.incorrect && <Text>Passwords doesnt match</Text>}

          <Button type="submit"> Update Password </Button>
        </form>
      </VStack>
    </>
  );
};

export default ForgotPasswordForm;
