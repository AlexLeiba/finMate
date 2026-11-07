import ContainerLayout from "../shared/ContainerLayout";
import { Logo } from "../shared/Logo";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-600 bg-background-element-primary py-4">
      <ContainerLayout>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <nav aria-label="Social media and contact links" className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Contact</span>
            <ul className="flex items-center gap-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/alexandru-leiba-9205801ba/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn profile"
                  title="LinkedIn"
                  className="flex size-10 items-center justify-center rounded-md hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AlexLeiba"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub profile"
                  title="GitHub"
                  className="flex size-10 items-center justify-center rounded-md hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 fill-current">
                    <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .3Z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="mailto:leiba.alexandru@gmail.com"
                  aria-label="Email Alexandru Leiba"
                  title="Email"
                  className="flex size-10 items-center justify-center rounded-md hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Mail aria-hidden="true" size={20} />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </ContainerLayout>
    </footer>
  );
}
