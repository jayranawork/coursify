import { Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { StudentLayout } from "@/layouts/StudentLayout";
import { InstructorLayout } from "@/layouts/InstructorLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import { RoleGuard } from "@/components/common/RoleGuard";

import { Home } from "@/pages/public/Home";
import { CourseList } from "@/pages/public/CourseList";
import { CourseDetail } from "@/pages/public/CourseDetail";
import { Checkout } from "@/pages/public/Checkout";
import { NotesMarketplace } from "@/pages/public/NotesMarketplace";
import { FocusPlaylists } from "@/pages/public/FocusPlaylists";
import { PlaylistImport } from "@/pages/public/PlaylistImport";
import { PlaylistDetail } from "@/pages/public/PlaylistDetail";
import { PlaylistWatch } from "@/pages/public/PlaylistWatch";
import { Login } from "@/pages/public/Login";
import { Register } from "@/pages/public/Register";
import { ForgotPassword } from "@/pages/public/ForgotPassword";
import { ResetPassword } from "@/pages/public/ResetPassword";

import { Dashboard as StudentDashboard } from "@/pages/student/Dashboard";
import { MyCourses as StudentCourses } from "@/pages/student/MyCourses";
import { LessonPlayer } from "@/pages/student/LessonPlayer";
import { OrderHistory } from "@/pages/student/OrderHistory";
import { Wishlist } from "@/pages/student/Wishlist";
import { Profile } from "@/pages/student/Profile";

import { Dashboard as InstructorDashboard } from "@/pages/instructor/Dashboard";
import { MyCourses as InstructorCourses } from "@/pages/instructor/MyCourses";
import { CourseEditor } from "@/pages/instructor/CourseEditor";
import { Stats as InstructorStats } from "@/pages/instructor/Stats";
import { Profile as InstructorProfile } from "@/pages/instructor/Profile";

import { Dashboard as AdminDashboard } from "@/pages/admin/Dashboard";
import { UserManagement } from "@/pages/admin/UserManagement";
import { CourseManagement } from "@/pages/admin/CourseManagement";
import { CategoryManagement } from "@/pages/admin/CategoryManagement";
import { CouponManagement } from "@/pages/admin/CouponManagement";
import { OrderManagement } from "@/pages/admin/OrderManagement";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/notes" element={<NotesMarketplace />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <FocusPlaylists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists/import"
          element={
            <ProtectedRoute>
              <PlaylistImport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists/:id"
          element={
            <ProtectedRoute>
              <PlaylistDetail />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/playlists/:id/watch"
        element={
          <ProtectedRoute>
            <PlaylistWatch />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["student"]}>
              <StudentLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="courses/:id/learn" element={<LessonPlayer />} />
        <Route path="orders" element={<OrderHistory />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="/instructor"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["instructor"]}>
              <InstructorLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<InstructorDashboard />} />
        <Route path="courses" element={<InstructorCourses />} />
        <Route path="courses/new" element={<CourseEditor />} />
        <Route path="courses/:id/edit" element={<CourseEditor />} />
        <Route path="stats" element={<InstructorStats />} />
        <Route path="profile" element={<InstructorProfile />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["admin"]}>
              <AdminLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="coupons" element={<CouponManagement />} />
        <Route path="orders" element={<OrderManagement />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
