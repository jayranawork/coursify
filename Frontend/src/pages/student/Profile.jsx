import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCurrentUser, useUpdateProfile } from "@/hooks/useUsers";
import { useAuth } from "@/hooks/useAuth";
import { Button, Card, Input, Label, Textarea, Badge } from "@/components/ui";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().optional(),
  avatar: z.string().optional(),
  bio: z.string().optional(),
});

export function Profile() {
  const meQuery = useCurrentUser();
  const updateProfile = useUpdateProfile();
  const { updateUser } = useAuth();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", avatar: "", bio: "" },
  });

  useEffect(() => {
    if (meQuery.data) {
      form.reset({
        name: meQuery.data.name || "",
        email: meQuery.data.email || "",
        password: "",
        avatar: meQuery.data.avatar || "",
        bio: meQuery.data.bio || "",
      });
    }
  }, [meQuery.data, form]);

  if (meQuery.isLoading) return <LoadingSpinner />;
  if (meQuery.isError) return <ErrorState description="We could not load your profile." onRetry={() => meQuery.refetch()} />;

  const submit = form.handleSubmit(async (values) => {
    try {
      const data = await updateProfile.mutateAsync(values);
      updateUser(data);
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to update profile");
    }
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Profile</p>
          <h1 className="text-3xl font-black text-slate-950">{meQuery.data?.name}</h1>
          <Badge variant="secondary" className="w-fit">
            {meQuery.data?.role}
          </Badge>
        </div>
      </Card>

      <Card className="p-6">
        <form className="grid gap-4 md:grid-cols-2" onSubmit={submit}>
          <Field label="Name" error={form.formState.errors.name?.message}>
            <Input {...form.register("name")} />
          </Field>
          <Field label="Email" error={form.formState.errors.email?.message}>
            <Input type="email" {...form.register("email")} />
          </Field>
          <Field label="Password" error={form.formState.errors.password?.message}>
            <Input type="password" {...form.register("password")} placeholder="Leave blank to keep current password" />
          </Field>
          <Field label="Avatar URL">
            <Input {...form.register("avatar")} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Bio">
              <Textarea rows={5} {...form.register("bio")} />
            </Field>
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={updateProfile.isPending}>
              Save changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
