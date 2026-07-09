import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { enrollmentApi, courseApi } from "@/services/api";

export function useEnrollments(enabled = true) {
  return useQuery({
    queryKey: ["enrollments"],
    enabled,
    queryFn: () => enrollmentApi.myEnrollments(),
  });
}

export function useCourseProgress(courseId) {
  return useQuery({
    queryKey: ["course-progress", courseId],
    enabled: Boolean(courseId),
    queryFn: () => courseApi.getCourseProgress(courseId),
  });
}

export function useEnrollCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId) => enrollmentApi.enroll(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => enrollmentApi.updateProgress(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["course-progress", variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    },
  });
}
