import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, loginWithGoogle, signUpUser } from "@/lib/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/forms/resolvers/LoginForm.resolver";

type ILoginInputs = {
  email: string;
  password: string;
};
export function LoginForm() {
  const router = useRouter();
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<ILoginInputs> = (data) => handleLogin(data);

  const handleLogin: SubmitHandler<ILoginInputs> = async (data) => {
    setError("");
    const { email, password } = data;
    const res = login
      ? await loginUser(email, password)
      : await signUpUser(email, password);
    if (res === true) router.push("/");
    if (typeof res === "string") setError(res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {login ? "Login" : "Sign up"}
          </CardTitle>
          <CardDescription>
            {login
              ? "Enter your email below to login to your account"
              : "Enter your email below to sign up"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                onKeyDown={() => {
                  setError("");
                }}
              />
              {errors.email && (
                <span className="text-red-500">Fill in a valid email</span>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* TODO: add forgot password functionality */}
                {/* <Link href="#" className="ml-auto inline-block text-sm underline"> */}
                {/*   Forgot your password? */}
                {/* </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                {...register("password")}
                onKeyDown={() => setError("")}
              />
              {errors.password && (
                <span className="text-red-500">
                  Password should be at least 6 characters
                </span>
              )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button className="w-full " type="submit">
              {login ? "Login" : "Sign up"}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={loginWithGoogle}
            >
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {login ? (
              <>
                Don&apos;t have an account?{" "}
                <Button onClick={() => setLogin(false)}>Sign up</Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setLogin(true);
                }}
                className="underline"
              >
                Back to Login
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
