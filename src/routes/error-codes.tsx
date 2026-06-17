import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/error-codes")({
  component: () => <Outlet />,
});
