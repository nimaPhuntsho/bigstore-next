"use client";
import React, { useState } from "react";
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Button,
  DialogActionTrigger,
  VStack,
  Text,
  Input,
  HStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import resetPassword from "@/app/actions/resetPassword";
interface Props {}

const ResetPasswordDialog = ({}: Props) => {
  const [resetState, setResetState] = useState<{
    loading: boolean;
    errorMessage: string;
    error: boolean;
  }>({
    loading: true,
    errorMessage: "",
    error: false,
  });
  const { register, control, handleSubmit } = useForm<{ email: string }>({
    defaultValues: { email: "" },
  });
  const onSubmit: SubmitHandler<{ email: string }> = async (email) => {
    try {
      const response = await resetPassword(email.email);

      if (!response.success) {
        setResetState((state) => ({
          ...state,
          error: true,
          errorMessage: response.message,
        }));
      }

      setResetState((state) => ({
        ...state,
        error: false,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setResetState((state) => ({ ...state, loading: false }));
    }
  };
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Reset password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset password link</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>
            If your email addressed is registered with BigStore, you will
            recieve an email to reset your password
          </Text>
          <VStack alignItems="stretch">
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack alignItems="stretch">
                <Text>Email</Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input {...field} />}
                />

                <HStack justifyContent="end">
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button type="submit">
                    {resetState.loading ? "Get Link" : "Link sent"}
                  </Button>
                </HStack>
              </VStack>
            </form>
          </VStack>
        </DialogBody>
        <DialogFooter></DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ResetPasswordDialog;
