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
  body?: object;
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

      // await new Promise((resolve) => setTimeout(resolve, 4000));
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

      if (!response.ok) {
        return {
          data: await response.json(),
          success: false as const,
          status: response.status,
        };
      }
      const jsonResponse = await response.json();

      const parsedResponse = schema.safeParse(jsonResponse);

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
  } catch (error) {
    console.log(error);
  }

  return {
    data: null,
    success: false as const,
    status: 1,
  };
};
