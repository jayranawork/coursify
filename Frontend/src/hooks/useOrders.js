import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderApi } from "@/services/api";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderApi.myOrders(),
  });
}

export function useAdminOrders(params = {}) {
  return useQuery({
    queryKey: ["admin-orders", params],
    queryFn: () => orderApi.list(params),
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => orderApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });
}
