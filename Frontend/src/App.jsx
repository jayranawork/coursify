import { useEffect } from "react";
import { AppRoutes } from "@/routes";
import { useAuth } from "@/hooks/useAuth";
import { authApi, getStoredRefreshToken, setStoredRefreshToken } from "@/services/api";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function App() {
  const { hydrated, setAuth, clearAuth, markHydrated } = useAuth();
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

  if (!hydrated) {
    return <LoadingSpinner label="Loading Coursify..." />;
  }

  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}
