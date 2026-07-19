import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({ className, ...props }) {
  return (
    <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
      <Card className="bg-zinc-900 text-white w-full">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field className="w-full">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  className="w-full bg-zinc-800 border-zinc-700"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field className="w-full">
                <div className="flex w-full items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="text-sm whitespace-nowrap hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  className="w-full"
                  id="password"
                  type="password"
                  required
                  placeholder="Test"
                />
              </Field>
              <Field className="w-full">
                <Button
                  type="submit"
                  className="w-full bg-white text-black border border-white hover:bg-transparent hover:text-white transition"
                >
                  Login
                </Button>
                <FieldDescription>
                  Don&apos;t have an account?{" "}
                  <a
                    className="className=ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    href="#"
                  >
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
