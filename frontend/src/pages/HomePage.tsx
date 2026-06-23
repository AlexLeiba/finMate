import ContainerLayout from "@/components/shared/ContainerLayout";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

function HomePage() {
  return (
    <ContainerLayout>
      <div className="h-21" />

      <div className="flex flex-col gap-4 items-center">
        <h1>
          Take control of your{" "}
          <span style={{ color: "var(--accent)" }}>Finances</span>
        </h1>

        <div className="flex justify-center flex-col items-center">
          <h2>
            <span style={{ color: "var(--accent)" }}>Fine</span>Mate
          </h2>

          <p className="text-center text-lg">
            Is a personal{" "}
            <span style={{ color: "var(--accent)" }}>
              finance management app
            </span>{" "}
            that helps you keep track of your expenses,
          </p>

          <p>spending habits, to create and compare budgets,</p>

          <p>and many more tools to make smarter financial decisions.</p>
        </div>

        <Link to="/signin">
          <Button
            loading={false}
            size={"lg"}
            variant={"accent"}
            classNameChildren="flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2 size-6" />
          </Button>
        </Link>
      </div>
    </ContainerLayout>
  );
}

export default HomePage;
