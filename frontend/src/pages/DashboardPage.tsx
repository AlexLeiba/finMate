import { Button } from "@/components/ui/button";

import { Link } from "@tanstack/react-router";

function DashboardPage() {
  return (
    <>
      <Button>Logout</Button>
      <Link to="/signin">Signin</Link>
    </>
  );
}

export default DashboardPage;
