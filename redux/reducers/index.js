import { combineReducers } from "redux";
import { User } from "./user";
import { Boutiques } from "./boutique";
import { Products } from "./product";

export default combineReducers({
  User,
  Boutiques,
  Products,
});
