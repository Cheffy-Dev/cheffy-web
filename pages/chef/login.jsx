import Login from "../../src/components/auth/login";
import { ChefLayout } from "../../src/components/Layouts/chef";

const ChefLogin = () => {
  return (
    <>
      <div className="py-10" style={{ minHeight: "70vh" }}>
        <Login userType="chef" />
      </div>
    </>
  );
};

ChefLogin.Layout = ChefLayout;

export default ChefLogin;
