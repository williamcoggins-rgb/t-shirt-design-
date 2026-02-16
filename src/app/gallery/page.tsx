"use client";

// Gallery is integrated into the main page via the sidebar navigation.
// This route redirects to the main page with the gallery view.
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GalleryRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
