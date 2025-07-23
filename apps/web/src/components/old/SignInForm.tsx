import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import Loader from "../ui/loader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          callbackURL: "/dashboard",
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign in successful");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <form
      className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto flex flex-col gap-6 border border-white/10"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div>
        <form.Field name="email">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="block text-sm font-medium text-white mb-1">Glyph (Email)</Label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition shadow-sm"
                placeholder="Enter your glyph"
                required
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-400 text-sm font-cormorant italic">{error?.message}</p>
              ))}
            </div>
          )}
        </form.Field>
      </div>
      {/* Password Field */}
      <div>
        <form.Field name="password">
          {(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="block text-sm font-medium text-white mb-1">Secret Rune (Password)</Label>
              <Input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition shadow-sm"
                placeholder="Enter your secret rune"
                required
              />
              {field.state.meta.errors.map((error) => (
                <p key={error?.message} className="text-red-400 text-sm font-cormorant italic">{error?.message}</p>
              ))}
            </div>
          )}
        </form.Field>
      </div>
      {/* Submit Button */}
      <form.Subscribe>
        {(state) => (
          <Button
            type="submit"
            className="w-full bg-[#0B1014]/80 text-white py-2 rounded font-ebg text-lg shadow-lg hover:bg-[#0B1014] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
            disabled={!state.canSubmit || state.isSubmitting}
          >
            {state.isSubmitting ? "Entering Realm…" : "Return to the CodeRealm"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
