import Login from "../../src/components/auth/login";
import FoodLayout from "../../src/components/Layouts/home/FoodLayout";

const DriverLogin = () => {
  return (
    <>
      <div className="py-10" style={{ minHeight: "80vh" }}>
        <Login
          userType="driver"
        />
      </div>
    </>
  );
};

DriverLogin.Layout = FoodLayout;

export default DriverLogin;
