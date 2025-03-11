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
  Spinner,
} from "@chakra-ui/react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { sendResetPasswordLink } from "@/app/actions/resetPasswordLink";
interface Props {}

const ResetPasswordDialog = ({}: Props) => {
  const [resetState, setResetState] = useState<{
    loading: boolean;
    errorMessage: string;
    error: boolean;
    success: boolean;
  }>({
    loading: false,
    errorMessage: "",
    error: false,
    success: false,
  });
  const { register, control, handleSubmit, formState } = useForm<{
    email: string;
  }>({
    defaultValues: { email: "" },
  });
  const onSubmit: SubmitHandler<{ email: string }> = async (email) => {
    try {
      setResetState((state) => ({ ...state, loading: true }));
      const response = await sendResetPasswordLink(email.email);

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
        success: true,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setResetState((state) => ({ ...state, loading: false }));
    }
  };
  return (
    <DialogRoot placement={"center"}>
      <DialogTrigger asChild>
        <Button size="2xl" fontWeight="bold" variant="outline">
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
                  rules={{
                    required: "Email is required",
                  }}
                />

                <HStack justifyContent="end">
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button
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
                    {resetState.success ? "link sent" : "Get link"}
                    {resetState.loading && <Spinner />}
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
