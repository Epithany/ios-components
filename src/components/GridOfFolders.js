"use client";

import { useContext } from "react";
import AppFolder from "@/components/AppFolder";
import { getAppFolderData } from "@/lib/database";
import { isOpenContext } from "@/lib/iosLibraryProvider";
import { motion } from "motion/react";

export default function GridOfFolders() {
  const folders = getAppFolderData();
  const { openFolderId } = useContext(isOpenContext);

  return (
    <div className="relative w-full h-full">
      {/* Blur overlay */}
      {openFolderId && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40"
          onClick={() => {}}
        />
      )}

      {/* Grid of folders */}
      <div className="grid grid-cols-2 gap-6 w-full h-full p-6 sm:grid-cols-3 lg:grid-cols-4 items-start justify-items-center">
        {folders.map((folder) => (
          <AppFolder
            key={folder.key}
            folderKey={folder.key}
            title={folder.name}
            items={folder.apps}
            isAnyFolderOpen={!!openFolderId}
          />
        ))}
      </div>
    </div>
  );
}
