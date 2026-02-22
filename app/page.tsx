import Image from "next/image";
import Main from "./components/main";
import SignUpForm from "./components/SignUpForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div>
        <Main/>
        <SignUpForm/>
      </div>
    </div>
  );
}
