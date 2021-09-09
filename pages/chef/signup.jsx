import SignUp from "../../src/components/auth/signup";
import { ChefLayout } from "../../src/components/Layouts/chef";

const ChefSignUp = () => {
  return (
    <>
      <div className="py-10" style={{ minHeight: "70vh" }}>
        <SignUp userType="chef" />
      </div>
    </>
  );
};

ChefSignUp.Layout = ChefLayout;

export default ChefSignUp;
