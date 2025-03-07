"use client";

import resetPassword from "@/app/actions/resetPassword";
import { Button, Heading, VStack, Input } from "@chakra-ui/react";

import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

const ForgotPasswordForm = () => {
  const { register, control, handleSubmit } = useForm<{
    newPassword: string;
    confirmPassword: string;
  }>({
    defaultValues: { newPassword: "", confirmPassword: "" },
  });
  const onSubmit: SubmitHandler<{
    newPassword: string;
    confirmPassword: string;
  }> = async (passwords) => {
    // const response = await resetPassword(email.email);
    // console.log(response);
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
          <Button type="submit"> Update </Button>
        </form>
      </VStack>
    </>
  );
};

export default ForgotPasswordForm;
