import SignUp from "../../src/components/auth/signup";
import FoodLayout from "../../src/components/Layouts/home/FoodLayout";

const DriverSignUp = () => {
  return (
    <>
      <div className="py-10" style={{ minHeight: "70vh" }}>
        <SignUp userType="driver" />
      </div>
    </>
  );
};

DriverSignUp.Layout = FoodLayout;

export default DriverSignUp;
