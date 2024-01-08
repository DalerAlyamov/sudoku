import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import { useAppDispatch, useAppSelector } from "@/tools/store";
import styles from "./modals.module.scss";

const Modal = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const closeModal = () => dispatch.modal.close();

  const renderChildren = () =>
    React.Children.map(modal.element!, (child: React.ReactElement) =>
      React.cloneElement(child, {
        onClose: closeModal,
      })
    );

  React.useEffect(() => {
    if (modal.open) {
      document.querySelector("html")!.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.querySelector("html")!.style.overflow = "inherit";
      document.body.style.overflow = "inherit";
    }
  }, [modal.open]);

  return ReactDOM.createPortal(
    <CSSTransition
      unmountOnExit
      timeout={250}
      in={modal.open}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
    >
      <div
        className={styles.modal}
        onMouseDown={closeModal}
        style={{ minHeight: window.outerHeight + "px" }}
      >
        <div className={styles.panel} onMouseDown={(e) => e.stopPropagation()}>
          {renderChildren()}
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
};

export default Modal;
