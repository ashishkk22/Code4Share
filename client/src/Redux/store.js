// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import AuthReducer from "./Features/authSlice";
// import logger from "redux-logger";
// import CompileReducer from "./Features/compileSlice";
// import storage from "redux-persist/lib/session";
// export default configureStore({
//   reducer: {
//     compile: CompileReducer,
//     auth: AuthReducer,
//   },
//   middleware: getDefaultMiddleware => {
//     return getDefaultMiddleware().concat(logger);
//   },
// });

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AuthReducer from "./Features/authSlice";
import logger from "redux-logger";
import CompileReducer from "./Features/compileSlice";
import storage from "redux-persist/lib/storage/session";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  compile: CompileReducer,
  auth: AuthReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
