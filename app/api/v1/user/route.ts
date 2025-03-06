import { supabase } from "@/app/supabase/supabaseClient";

export async function GET(req: Request, res: Response) {
  const authorization = req.headers.get("authorization");
  console.log(authorization);

  if (!authorization)
    return Response.json({
      success: false as const,
      message: "access token is missing or invalid",
      data: null,
    });
  const polishedToken = authorization.split(" ")[1].replace(/"/g, "").trim();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(polishedToken);

  if (error)
    return Response.json({
      success: false as const,
      message: "access denied",
      data: null,
    });

  console.log(user);

  return Response.json({
    success: true as const,
    message: "user credentials",
    data: user,
  });
}
