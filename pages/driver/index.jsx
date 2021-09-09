import { useSession } from "next-auth/client";
import {
  DriverContent,
} from "../../src/components/Layouts/driver";
import DriverLogin from "./login";
import FoodLayout from "../../src/components/Layouts/home/FoodLayout";

const DriverSection = () => {
  const [session, loading] = useSession();
  console.log({ session });
  return (
    <>
      {session && session.role == "driver" ? <DriverContent /> : <DriverLogin />}
    </>
  );
};

DriverSection.Layout = FoodLayout;
export default DriverSection;
