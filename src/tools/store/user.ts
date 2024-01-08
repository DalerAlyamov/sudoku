import { createModel } from "@rematch/core";

const user = createModel()({
  state: null,
  reducers: {
    REMOVE() {
      return null;
    },
  },
});

export default user;
