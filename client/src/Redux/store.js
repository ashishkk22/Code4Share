import { configureStore } from "@reduxjs/toolkit";
// import AuthReducer from "./features/authSlice";
// import ItemReducer from "./features/itemSlice";
// import OrderReducer from "./features/orderSlice";
import logger from "redux-logger";
import CompileReducer from "./Features/compileSlice";
export default configureStore({
  reducer: {
    compile: CompileReducer,
    // auth: AuthReducer,
    // item: ItemReducer,
    // order: OrderReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(logger);
  },
});
