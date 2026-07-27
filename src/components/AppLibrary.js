"use client";

import { IosLibraryProvider } from "@/lib/iosLibraryProvider";

export default function AppLibrary({ children }) {
  return (
    <IosLibraryProvider>
      <div className="w-full h-full">{children}</div>
    </IosLibraryProvider>
  );
}
