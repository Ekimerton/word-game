import { Suspense } from "react";
import { getGameNumber } from "../utils/manageTime";
import { cookies } from "next/headers";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import Link from "next/link";

export default async function Page() {
  const cookieStore = cookies();
  const number = getGameNumber();

  return (
    <Suspense>
      <div className="max-w-3xl p-4">
        <Card className="mb-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base p-0">README.md</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              This page is a WIP. Try extra auto-generated puzzles at negative
              number archives just like hexcodle. Some auto-generated words may
              be offensive or nonsensical.
            </p>
          </CardContent>
        </Card>
        <div className="flex items-center justify-center flex-wrap">
          <Button variant="link" className="max-w-1/4 text-red-700" asChild>
            <Link href={`/archive/-1`}>{`Relatle -1`}</Link>
          </Button>
          {Array.from({ length: number }, (_, i) => (
            <Button variant="link" key={i} className="max-w-1/4" asChild>
              <Link prefetch={false} href={`/archive/${i + 1}`}>{`Relatle ${
                i + 1
              }`}</Link>
            </Button>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
