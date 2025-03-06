import { Schema, z } from "zod";

export const callFetch = async <TSchema extends Schema>({
  endpoint,
  schema,
  method,
  body,
  accessToken,
}: {
  method: "GET" | "POST" | "DELETE" | "PUT";
  endpoint: string;
  schema: TSchema;
  body?: Object;
  accessToken?: string;
}): Promise<{
  data?: z.infer<typeof schema>;
  success: boolean;
  status: number;
}> => {
  try {
    if (method === "GET") {
      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return {
          data: null,
          success: false as const,
          status: response.status,
        };
      }
      const result = await response.json();

      const parsedResponse = schema.safeParse(result);

      if (!parsedResponse.success) {
        return {
          data: null,
          success: false as const,
          status: response.status,
        };
      }
      return {
        data: parsedResponse.data,
        success: true as const,
        status: response.status,
      };
    }

    if (method === "POST") {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });
      const jsonResponse = await response.json();

      if (!response.ok) {
        throw new Error(jsonResponse.message || "Unknown error occurred");
      }

      console.log(jsonResponse);

      const parsedResponse = schema.safeParse(jsonResponse);

      console.log(parsedResponse);

      return {
        data: parsedResponse,
        success: true as const,
        status: response.status,
      };
    }
  } catch (error) {
    console.log(error);
  }

  return {
    data: null,
    success: false as const,
    status: 1,
  };
};
