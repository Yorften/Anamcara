import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import applicationReducer from "../features/applications/applicationSlice";
import applicantReducer from "../features/applications/applicantSlice";
import videoReducer from "../features/videos/videoSlice";
import imageReducer from "../features/images/imageSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    applicant: applicantReducer,
    img: imageReducer,
    vid: videoReducer,
  },
});
