"use client";

import {
  Heading,
  HStack,
  Input,
  VStack,
  Text,
  Textarea,
  Button,
  Icon,
  Grid,
  Spinner,
} from "@chakra-ui/react";
import { BsSend } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormError from "@/components/custom/FormError";
import { FaHandsWash } from "react-icons/fa";
import { contactSchema } from "@/app/contact/contactSchema";
import sendMessage from "@/app/actions/sendMessage";
import { Toaster, toaster } from "@/components/ui/toaster";

export type ContactInputType = z.infer<typeof contactSchema>;

const Contact = () => {
  const [message, setMessage] = useState<{
    sending: boolean;
    errorMessage: string;
  }>({
    sending: false,
    errorMessage: "",
  });
  useEffect(() => {}, []);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInputType>({
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      message: "",
    },
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactInputType> = async (contact) => {
    try {
      setMessage((state) => ({ ...state, sending: true }));
      const response = await sendMessage(contact);
      if (!response.success) {
        setMessage((state) => ({
          ...state,
          errorMessage: response.data.message,
        }));
        return;
      }

      toaster.create({
        title: "Confirmation",
        description:
          "We have recieved your message, we will be in touch with you shortly, thank you",
        duration: 6000,
      });
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setMessage((state) => ({ ...state, sending: false }));
    }
  };
  return (
    <>
      <VStack height="100dvh" justifyContent="center">
        <Grid
          width={{
            base: "80%",
            sm: "400px",
          }}
        >
          <HStack>
            <Heading fontWeight={800}>Say Hello</Heading>
            <Icon fontSize="40px">
              <FaHandsWash />
            </Icon>
          </HStack>
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <VStack alignItems="stretch">
              <Text flex={1}>Full Name</Text>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Full Name" />
                )}
              />
              <FormError error={errors} field="fullName" />
            </VStack>
            <VStack alignItems="flex-start">
              <Text flex={1}>Email</Text>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Email" />}
              />

              <FormError error={errors} field="email" />
            </VStack>
            <VStack alignItems="flex-start">
              <Text flex={1}>Phone</Text>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Phone" />}
              />
              <FormError error={errors} field="phone" />
            </VStack>
            <VStack alignItems="flex-start">
              <Text flex={1}>Message</Text>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <Textarea
                    size="lg"
                    {...field}
                    placeholder="Leave your message"
                  />
                )}
              />

              <FormError error={errors} field="message" />
            </VStack>
            <Button variant="outline" type="submit">
              Send
              <Icon size="sm">
                <BsSend />
              </Icon>
              {message.sending && <Spinner />}
            </Button>
          </form>
          <Toaster />
        </Grid>
      </VStack>
    </>
  );
};

export default Contact;
