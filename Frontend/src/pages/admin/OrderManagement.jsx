import { useAdminOrders } from "@/hooks/useOrders";
import { useState } from "react";
import { Card, Badge } from "@/components/ui";
import { Pagination } from "@/components/common/Pagination";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { formatDate } from "@/utils/formatDate";

export function OrderManagement() {
  const [page, setPage] = useState(1);
  const ordersQuery = useAdminOrders({ limit: 10, page });

  if (ordersQuery.isLoading) return <LoadingSpinner />;
  if (ordersQuery.isError) return <ErrorState description="We could not load orders." onRetry={() => ordersQuery.refetch()} />;

  const orders = ordersQuery.data?.data || ordersQuery.data || [];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-3xl font-black text-slate-950">Order management</h1>
      </Card>

      {orders.length === 0 ? (
        <EmptyState title="No orders found" description="Order records will appear here." />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id} className="p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-950">Order #{order._id.slice(-6)}</h3>
                  <p className="text-sm text-slate-500">Placed {formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={order.status === "paid" ? "success" : "secondary"}>{order.status}</Badge>
                  <Badge variant="outline">₹{order.amount}</Badge>
                </div>
              </div>
            </Card>
          ))}
          <Pagination pagination={ordersQuery.data?.pagination} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
