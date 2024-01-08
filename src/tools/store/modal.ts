import { createModel } from "@rematch/core";

interface IModal {
  open: boolean;
  element: React.ReactElement | null;
}

const modal = createModel()({
  state: {
    open: false,
    element: null,
  } as IModal,
  reducers: {
    open(_, element: React.ReactElement) {
      return {
        open: true,
        element,
      };
    },
    close(state) {
      return {
        ...state,
        open: false,
      };
    },
  },
});

export default modal;
