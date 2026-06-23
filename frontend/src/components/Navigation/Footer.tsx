import ContainerLayout from "../shared/ContainerLayout";
import { Logo } from "../shared/Logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-600 py-4 z-50 bg-background-element-primary">
      <ContainerLayout>
        <Logo />
      </ContainerLayout>
    </footer>
  );
}
