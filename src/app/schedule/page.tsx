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
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/forms/resolvers/LoginForm.resolver";

type IMemorized = {
  sura: number;
  page: number;
  strength: "weak" | "medium" | "strong";
};

type ISchedulerInputs = {
  minutesPerDay: number;
  memorized: IMemorized[];
  password: string;
};
export function ScheduleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISchedulerInputs>({ resolver: yupResolver(loginSchema) });

  const onSubmit: SubmitHandler<ISchedulerInputs> = (data) => handleLogin(data);

  const handleLogin: SubmitHandler<ISchedulerInputs> = async (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Schedule Introduction</CardTitle>
          <CardDescription>
            Fill in your muraja history to start off the scheduler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">How much have you memorized?</Label>
              {/* TODO: add multiple input form */}
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
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
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <span className="text-red-500">
                  Password should be at least 6 characters
                </span>
              )}
            </div>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
