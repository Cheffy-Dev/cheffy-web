import { useSession } from "next-auth/client";
import { ChefContent } from "../../src/components/Layouts/chef";
import { ChefLayout } from "../../src/components/Layouts/chef/";
import ChefLogin from "./login";

const ChefDashboard = (props) => {
  const [session, loading] = useSession();
  return (
    <>
      {session && session.role == "chef" ? (
        <ChefContent />
      ) : (
        <ChefLogin />
      )}
    </>
  );
};

// const ChefDashboardComponent = ProtectedChef(ChefDashboard);
ChefDashboard.Layout = ChefLayout;
export default ChefDashboard;
