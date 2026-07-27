import AppFolder from "@/components/AppFolder";
import { getAppFolderData } from "@/lib/database";

export default function GridOfFolders() {
  const folders = getAppFolderData();
  return (
    <div className="w-full h-full">
      {folders.map((folder) => (
        <AppFolder key={folder.key} folderKey={folder.key} title={folder.name} items={folder.apps} />
      ))}
    </div>
  );
}
