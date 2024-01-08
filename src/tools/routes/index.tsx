import React, { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import Playgroud from "@/pages/playgroud";
import Modal from "@/modals";

const AppRoutes: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback="Loading">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Outlet />
              <Modal />
            </>
          }
        >
          <Route path="/playground" element={<Playgroud />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
