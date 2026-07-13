import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { couponApi } from "@/services/api";
import { Button, Card, Input, Label, Select } from "@/components/ui";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { formatDate } from "@/utils/formatDate";
import { getApiErrorMessage } from "@/services/api";

const schema = z.object({
  code: z.string().min(2),
  type: z.enum(["percent", "fixed"]),
  value: z.coerce.number().min(0),
});

export function CouponManagement() {
  const couponsQuery = useQuery({ queryKey: ["coupons"], queryFn: () => couponApi.list() });
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { code: "", type: "percent", value: 0 },
  });

  if (couponsQuery.isLoading) return <LoadingSpinner />;
  if (couponsQuery.isError) return <ErrorState description="We could not load coupons." onRetry={() => couponsQuery.refetch()} />;

  const submit = form.handleSubmit(async (values) => {
    try {
      await couponApi.create(values);
      toast.success("Coupon created");
      form.reset({ code: "", type: "percent", value: 0 });
      couponsQuery.refetch();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  });

  const coupons = couponsQuery.data || [];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-3xl font-black text-slate-950">Coupon management</h1>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold">Create coupon</h2>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={submit}>
          <Field label="Code">
            <Input {...form.register("code")} />
          </Field>
          <Field label="Type">
            <Select {...form.register("type")}>
              <option value="percent">Percent</option>
              <option value="fixed">Fixed</option>
            </Select>
          </Field>
          <Field label="Value">
            <Input type="number" {...form.register("value")} />
          </Field>
          <div className="md:col-span-3">
            <Button type="submit">Add coupon</Button>
          </div>
        </form>
      </Card>

      {coupons.length === 0 ? (
        <EmptyState title="No coupons" description="Create coupons for your students." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {coupons.map((coupon) => (
            <Card key={coupon._id} className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-950">{coupon.code}</h3>
                  <p className="text-sm text-slate-500">
                    {coupon.type} - {coupon.value}
                  </p>
                </div>
                <p className="text-sm text-slate-500">{formatDate(coupon.expiresAt)}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
