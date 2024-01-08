import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import user from "./user";
import modal from "./modal";

interface IRootModel extends Models<IRootModel> {
  user: typeof user;
  modal: typeof modal;
}
type TRootState = RematchRootState<IRootModel>;
export const useAppDispatch = () => useDispatch<RematchDispatch<IRootModel>>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

const localStorageState = {
  get: () => {
    const initalState = localStorage.getItem("states");
    return initalState ? JSON.parse(initalState) : {};
  },
  set: (state: Partial<TRootState>) => {
    localStorage.setItem("states", JSON.stringify(state));
  },
};

const store = init({
  models: { user, modal },
  redux: {
    initialState: localStorageState.get(),
  },
});

store.subscribe(() => {
  const { user } = store.getState();

  const state: Partial<TRootState> = {};
  state.user = user;

  return localStorageState.set(state);
});

export default store;
