import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Menu, LogOut, UserCircle2, LayoutDashboard, Heart, BookOpen, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Card } from "@/components/ui";
import { SearchBar } from "@/components/common/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/hooks/useNotifications";
import { authApi } from "@/services/api";
import { toast } from "sonner";

export function Navbar() {
  const navigate = useNavigate();
  const { user, accessToken, clearAuth } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("coursify_theme") === "dark");
  const notificationsQuery = useNotifications(Boolean(accessToken));
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const dashboardPath = getDashboardPath(user?.role);
  const profilePath = getProfilePath(user?.role);
  const wishlistPath = user?.role === "student" ? "/student/wishlist" : "/instructor/courses";
  const coursesPath = user?.role === "student" ? "/student/courses" : "/instructor/courses";

  const toggleTheme = () => {
    setDarkMode((current) => {
      const next = !current;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("coursify_theme", next ? "dark" : "light");
      return next;
    });
  };

  const unreadCount = useMemo(
    () => (notificationsQuery.data || []).filter((item) => !item.read).length,
    [notificationsQuery.data]
  );

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // best effort
    } finally {
      clearAuth();
      navigate("/");
      toast.success("Logged out successfully");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-[#fbfbfa]/90 backdrop-blur dark:border-neutral-800/80 dark:bg-[#111111]/90">
      <div className="page-shell flex h-[72px] items-center gap-3">
        <Link to="/" className="flex items-center gap-2 font-semibold text-neutral-950 dark:text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#171717] text-sm text-white dark:bg-white dark:text-black">C</span>
          <span>Coursify</span>
        </Link>

        <div className="hidden flex-1 px-4 md:block">
          <SearchBar
            placeholder="Search courses, topics, instructors..."
            onSubmit={(value) => {
              const query = value.trim();
              navigate(query ? `/courses?search=${encodeURIComponent(query)}` : "/courses");
            }}
          />
        </div>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <NavLink to="/courses" className="text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white">
            Courses
          </NavLink>
          <NavLink to="/register" className="text-sm font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white">
            Become an Instructor
          </NavLink>
          {accessToken ? (
            <>
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setNotificationsOpen((open) => !open);
                    setProfileOpen(false);
                  }}
                >
                  <Bell className="h-4 w-4" />
                </Button>
                {unreadCount > 0 ? <Badge className="absolute -right-1 -top-1 px-1.5 py-0 text-[10px]">{unreadCount}</Badge> : null}
                {notificationsOpen ? (
                  <Card className="absolute right-0 mt-2 w-80 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                      <p className="text-sm font-semibold">Notifications</p>
                      <Button variant="ghost" size="sm" onClick={() => markAllRead.mutate()}>
                        Mark all read
                      </Button>
                    </div>
                    <div className="max-h-80 overflow-auto">
                      {(notificationsQuery.data || []).length === 0 ? (
                        <div className="p-4 text-sm text-slate-500">No notifications yet.</div>
                      ) : (
                        (notificationsQuery.data || []).map((note) => (
                          <button
                            key={note._id}
                            className="block w-full border-b border-slate-100 px-4 py-3 text-left hover:bg-slate-50"
                            onClick={() => markRead.mutate(note._id)}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className="text-sm font-medium text-slate-900">{note.title}</p>
                                <p className="mt-1 text-sm text-slate-500">{note.message}</p>
                              </div>
                              {!note.read ? <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" /> : null}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </Card>
                ) : null}
              </div>
              <div className="relative">
                <Button
                  variant="outline"
                  className="gap-3"
                  onClick={() => {
                    setProfileOpen((open) => !open);
                    setNotificationsOpen(false);
                  }}
                >
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
                    <AvatarFallback>{(user?.name || "U").slice(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:inline">{user?.name || "Account"}</span>
                </Button>
                {profileOpen ? (
                  <Card className="absolute right-0 mt-2 w-56 overflow-hidden">
                    <div className="p-2">
                      <MenuLink to={dashboardPath} icon={LayoutDashboard} label="Dashboard" />
                      <MenuLink to={profilePath} icon={UserCircle2} label="Profile settings" />
                      <MenuLink to={wishlistPath} icon={Heart} label={user?.role === "student" ? "Wishlist" : "Courses"} />
                      <MenuLink to={coursesPath} icon={BookOpen} label="Courses" />
                      <button
                        className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        onClick={logout}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </Card>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>Register</Button>
            </>
          )}
          <Button variant="outline" size="icon" aria-label="Toggle dark mode" onClick={toggleTheme}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setMobileOpen((open) => !open)}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="page-shell space-y-3 py-4">
            <SearchBar
              placeholder="Search courses..."
              onSubmit={(value) => {
                const query = value.trim();
                if (query) {
                  navigate(`/courses?search=${encodeURIComponent(query)}`);
                } else {
                  navigate("/courses");
                }
              }}
            />
            <nav className="flex flex-col gap-2">
              <NavLink to="/" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                Home
              </NavLink>
              <NavLink to="/courses" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                Courses
              </NavLink>
              {accessToken ? (
                <>
                  <NavLink
                    to={getProfilePath(user?.role)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Profile settings
                  </NavLink>
                  <button className="rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-100" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                    Register
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function MenuLink({ to, icon: Icon, label }) {
  return (
    <Link to={to} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}

function getDashboardPath(role) {
  if (role === "instructor") return "/instructor/dashboard";
  if (role === "admin") return "/admin/dashboard";
  return "/student/dashboard";
}

function getProfilePath(role) {
  if (role === "instructor") return "/instructor/profile";
  return "/student/profile";
}
