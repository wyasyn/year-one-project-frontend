import Logo from "./logo";
import DropMenu from "./menu";

export default function Navbar() {
  return (
    <header className="border-b bg-background/75 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <nav className=" w-full max-w-lg mx-auto flex items-center justify-between px-2 md:px-0 ">
        <Logo />
        <DropMenu />
      </nav>
    </header>
  );
}
