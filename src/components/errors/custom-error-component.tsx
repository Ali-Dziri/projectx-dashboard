import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "../ui/button";
import { House } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function CustomErrorComponent({ error }: { error: Error }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Error occured</EmptyTitle>
        <EmptyDescription>{error.message}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" asChild>
          <Link to="/">
            <House /> Back home
          </Link>
        </Button>
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}
