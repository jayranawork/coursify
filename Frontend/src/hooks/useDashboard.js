import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "@/services/api";

export function useInstructorStats() {
  return useQuery({
    queryKey: ["instructor-stats"],
    queryFn: () => dashboardApi.instructorStats(),
  });
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => dashboardApi.adminStats(),
  });
}

export function useInstructorDashboardCourses(params = {}) {
  return useQuery({
    queryKey: ["dashboard-instructor-courses", params],
    queryFn: () => dashboardApi.instructorCourses(params),
  });
}

