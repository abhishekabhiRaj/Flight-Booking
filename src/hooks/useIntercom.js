import { useEffect } from "react";

const useIntercom = (user = null) => {
  useEffect(() => {
    if (!window.Intercom) return;

    window.Intercom("boot", {
      app_id: "YOUR_APP_ID", // Replace with your Intercom App ID
      ...(user && {
        email: user.email,
        name: user.name,
        user_id: user.id,
      }),
    });

    return () => {
      window.Intercom("shutdown");
    };
  }, [user]);
};

export default useIntercom;
