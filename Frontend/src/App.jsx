import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AppRoutes } from "@/routes";
import { useAuth } from "@/hooks/useAuth";
import { authApi, getStoredRefreshToken, setStoredRefreshToken } from "@/services/api";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { recordRoute, getCurrentRoute } from "@/utils/routeHistory";

export default function App() {
  const { hydrated, setAuth, clearAuth, markHydrated } = useAuth();
  const location = useLocation();
  useEffect(() => {
    let mounted = true;

    const bootstrap = async () => {
      try {
        const refreshToken = getStoredRefreshToken();
        if (refreshToken) {
          const data = await authApi.refresh();
          if (!mounted) return;
          setStoredRefreshToken(data.refreshToken);
          setAuth(data.user, data.accessToken);
        } else {
          markHydrated();
        }
      } catch {
        if (!mounted) return;
        clearAuth();
        setStoredRefreshToken(null);
        markHydrated();
      }
    };

    bootstrap();
    return () => {
      mounted = false;
    };
  }, [setAuth, clearAuth, markHydrated]);

  useEffect(() => {
    recordRoute(getCurrentRoute());
  }, [location.pathname, location.search, location.hash]);

  if (!hydrated) {
    return <LoadingSpinner label="Loading Coursify..." />;
  }

  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}
