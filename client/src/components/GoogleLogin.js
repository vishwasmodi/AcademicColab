import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import CompleteDetails from "./CompleteDetails";

const clientId =
  "1093894063906-v1vgtkhtvupp2678qr71ntsfktp9spr9.apps.googleusercontent.com";

const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken, refreshTiming);
};

const GLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = (res) => {
    localStorage.setItem("user", res.tokenId);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        token: res.tokenId,
        name: res.profileObj.name,
        userId: res.profileObj._id,
      },
    });

    // navigate("/completedetails", { replace: true });
    // alert(`Logged in successfully welcome ${res.profileObj.name} 😍.`);

    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
};

export default GLogin;
