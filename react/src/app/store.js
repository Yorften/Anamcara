import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import applicationReducer from "../features/applications/applicationSlice";
import applicantReducer from "../features/applications/applicantSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    applicant: applicantReducer,
  },
});
