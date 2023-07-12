import AuthenticationContext from "./AuthenticationContext";

const INITIAL_STATE = {
  isOnboardingCompleted: false,
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    emailOrderStatuses: false,
    emailPasswordChanges: false,
    emailSpecialOffers: false,
    emailNewsletter: false,
  },
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "onboard":
      return { ...state, isOnboardingCompleted: true };
    case "logout":
      return { ...INITIAL_STATE }; //{ ...state, isOnboardingCompleted: false }; // INITIAL_STATE
    case "update_userinfo":
      return { ...state, userInfo: action.payload };
    case "single_update_userinfo":
      return {
        ...state,
        userInfo: { ...state.userInfo, [action.name]: action.payload },
      };
    case "multi_update_userinfo":
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    default:
      return state;
  }
};

const onboard = (dispatch) => {
  return () => {
    dispatch({ type: "onboard" });
  };
};

const logout = (dispatch) => {
  return () => {
    dispatch({ type: "logout" });
  };
};

export const { AuthContext, AuthProvider } = AuthenticationContext(
  AuthReducer,
  { onboard, logout },
  INITIAL_STATE
);
