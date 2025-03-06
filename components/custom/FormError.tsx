import { FieldErrors, FieldValues } from "react-hook-form";
import { HStack } from "@chakra-ui/react";
import React from "react";

const FormError = <T extends FieldValues>({
  error,
  field,
}: {
  field: keyof T;
  error: FieldErrors<T>;
}) => {
  const renderErrorMessage = () => {
    const errorMessage = error[field]?.message;
    if (!errorMessage) return;

    return (
      errorMessage && (
        <HStack fontSize=".9rem" color="#FF4D4F">
          {errorMessage.toString()}
        </HStack>
      )
    );
  };

  return <>{renderErrorMessage()}</>;
};

export default FormError;
