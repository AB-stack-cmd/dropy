import Image from "next/image";
import Main from "./components/main";
import SignInPage from "./sign-in/[[...sign-in]]/page";
import FileUploadForm from "./components/FileActionButton";
import DropShare from "./components/main";
import NovIDE from "./components/IDE_";
import { DashBoard } from "./components/DashBoardcontent";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
      
       <DashBoard/>
      {/* <NovIDE/> */}
      </div>
    </div>
  );
}
