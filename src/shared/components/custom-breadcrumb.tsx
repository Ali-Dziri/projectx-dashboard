import { Link, useMatches } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useLocation } from "@tanstack/react-router";

export default function CustomBreadcrumb() {
  const location = useLocation();
  const matches = useMatches();
  const homeRoute = matches.find((m) => m.staticData?.title === "Home");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {!homeRoute && (
          <>
            <BreadcrumbItem className="hidden md:block">
              <Link to="/">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )}
        {matches
          .filter((m) => m.staticData?.title)
          .map((m) => {
            if (m.fullPath === location.pathname) {
              return (
                <BreadcrumbItem key={m.id}>
                  <BreadcrumbPage>{m.staticData?.title}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }
            return (
              <BreadcrumbItem key={m.id} className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to={m.fullPath}>{m.staticData?.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
