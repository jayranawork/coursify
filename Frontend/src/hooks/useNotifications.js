import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationApi } from "@/services/api";

export function useNotifications(enabled = true) {
  return useQuery({
    queryKey: ["notifications"],
    enabled,
    queryFn: () => notificationApi.list(),
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => notificationApi.markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationApi.markAllRead(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
}
