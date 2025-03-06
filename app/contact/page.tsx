"use client";

import {
  Heading,
  HStack,
  Input,
  VStack,
  Text,
  Box,
  Textarea,
  Button,
  Icon,
} from "@chakra-ui/react";
import { BsSend } from "react-icons/bs";
import React, { useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "./contactSchema";
import FormError from "@/components/custom/FormError";
import { FaHandsWash } from "react-icons/fa";

type ContactInputType = z.infer<typeof contactSchema>;

const Contact = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInputType>({
    defaultValues: {
      email: "",
      fullName: "",
      phone: "",
      message: "",
    },
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {}, []);

  const onSubmit: SubmitHandler<ContactInputType> = (contact) => {
    console.log(contact);
  };
  return (
    <>
      <VStack height="100dvh" justifyContent="center">
        <VStack justifyContent="stretch" minWidth="500px">
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
            </Button>
          </form>
        </VStack>
      </VStack>
    </>
  );
};

export default Contact;
