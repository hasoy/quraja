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

export function LoginForm() {
  const router = useRouter();
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO: add error state
  // const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = login
      ? await loginUser(email, password)
      : await signUpUser(email, password);
    if (res) router.push("/");
  };

  return (
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link href="#" className="ml-auto inline-block text-sm underline"> */}
              {/*   Forgot your password? */}
              {/* </Link> */}
            </div>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleLogin}>
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
              <Button
                onClick={() => {
                  setLogin(false);
                }}
                className="underline"
              >
                Sign up
              </Button>
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
  );
}
