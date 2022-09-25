import React, { useEffect, useState } from "react";
import axios from "axios";

const useAuth = (code) => {
  const [accessToken, setAcessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post(
        "http://localhost:5001/spotify-react-ts-vite/us-central1/webApi/login",
        {
          code,
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }, [code]);
};

export default useAuth;
