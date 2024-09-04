import { store } from "./store";
import { logOut } from "../redux/slice/auth-slice";


export const resetAllReduxData = () => {
    try {
      store.dispatch(logOut());
    } catch (error) {
      console.error("Error in resetAllReduxData:", error);
    }
  };