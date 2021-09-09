import { Button } from "antd";
import React from "react";
import { GoogleLogin } from "react-google-login";
import { FcGoogle } from "react-icons/fc";

const clientId =
  "710426436210-6vdt9q2m40bsdj37op1ljfuvihfjea53.apps.googleusercontent.com";

const GoogleLoginComp = ({ handler }) => {
  const onFailure = (res) => {
    console.log("[Login failed] res:", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={handler}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSigned={true}
        render={({ onClick, disabled }) => (
          <Button
            className="py-6 px-5 md:py-6 md:px-8 rounded-md flex flex-row gap-2 justify-center font-semibold items-center"
            onClick={onClick}
            disabled={disabled}
            icon={<FcGoogle />}
          >
            Google
          </Button>
        )}
      />
    </div>
  );
};

export default GoogleLoginComp;
