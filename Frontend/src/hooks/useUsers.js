import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardApi, userApi } from "@/services/api";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userApi.me(),
  });
}

export function useUsers(params = {}) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => userApi.list(params),
  });
}

export function useAdminUsers(params = {}) {
  return useQuery({
    queryKey: ["admin-users", params],
    queryFn: () => dashboardApi.adminUsers(params),
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => userApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => userApi.updateMe(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
