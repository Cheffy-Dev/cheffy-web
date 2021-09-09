import { Button } from "antd";
import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebookF } from "react-icons/fa";

const appId = "780902649008769";

const FacebookLoginComp = ({ handler }) => {
  const facebookCallback = (res) => {
    console.log("[Facebook Login response]:", res);
    if (res.email) handler(res);
  };

  return (
    <div>
      <FacebookLogin
        appId={appId}
        fields="name,email,picture"
        callback={facebookCallback}
        render={({ onClick, isSdkLoaded }) => (
          <Button
            className="py-6 px-5 md:py-6 md:px-8 rounded-md flex flex-row gap-2 justify-center font-semibold items-center bg-blue-900 text-white hover:border-blue-600 hover:border-4"
            onClick={onClick}
            disabled={!isSdkLoaded}
            icon={<FaFacebookF />}
          >
            <div className="inline-block">Facebook</div>
          </Button>
        )}
      />
    </div>
  );
};

export default FacebookLoginComp;
