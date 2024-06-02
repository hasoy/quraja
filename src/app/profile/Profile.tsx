"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Typography from "@/components/Typography";
import { logOutUser } from "@/lib/auth";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import PageWrapper from "@/components/PageWrapper";

// TODO: improve this page and show the user details and logout button
export default function Profile() {
  const authData = useContext(AuthContext);
  return (
    <PageWrapper>
      <h1 className="mb-10">User Settings</h1>
      <div className="grid items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm ">
          <Link href="#" className="font-semibold text-primary">
            General
          </Link>
          {/* <Link href="#">Visual</Link> */}
          {/* <Link href="#">Data</Link> */}
          {/* <Link href="#">Support</Link> */}
          {/* <Link href="#">FAQ</Link> */}
          {/* <Link href="#">Donate</Link> */}
        </nav>
        <div className="grid gap-6">
          {/* TODO: add settings and other stuff for hte user */}
          {/* <Card> */}
          {/*   <CardHeader> */}
          {/*     <CardTitle>Settings</CardTitle> */}
          {/*     <CardDescription> */}
          {/*       Change how the app looks for you */}
          {/*     </CardDescription> */}
          {/*   </CardHeader> */}
          {/*   <CardContent> */}
          {/*     <form> */}
          {/*       <Input placeholder="Highlight colors" /> */}
          {/*     </form> */}
          {/*   </CardContent> */}
          {/*   <CardFooter className="border-t px-6 py-4"> */}
          {/*     <Button>Save</Button> */}
          {/*   </CardFooter> */}
          {/* </Card> */}
          {/* <Card> */}
          {/*   <CardHeader> */}
          {/*     <CardTitle>Progression</CardTitle> */}
          {/*     <CardDescription> */}
          {/*       Data about your progression of the Quran */}
          {/*     </CardDescription> */}
          {/*   </CardHeader> */}
          {/*   <CardContent> */}
          {/*     <form> */}
          {/*       <Input placeholder="Store Name" /> */}
          {/*     </form> */}
          {/*   </CardContent> */}
          {/*   <CardFooter className="border-t px-6 py-4"> */}
          {/*     <Button>Save</Button> */}
          {/*   </CardFooter> */}
          {/* </Card> */}
          <Card>
            <CardHeader>
              <CardTitle>Log out</CardTitle>
              <CardDescription>
                Log out of your account with id:
                {authData && <p>{authData.uid}</p>}
              </CardDescription>
            </CardHeader>

            <CardFooter className="border-t px-6 py-4">
              <Button onClick={logOutUser}>Logout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
