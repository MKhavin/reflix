import React from "react";
import "./css/ModalMessage.css";

export default function ModalMessage({ children, closeModalMessage }) {
  function closeButtonClicked() {
    closeModalMessage(false);
  }

  return (
    <div className="modal-container center">
      <div className="modal-message-container center">
        {children}
        <button className="close-modal-message" onClick={closeButtonClicked}>
          X
        </button>
      </div>
    </div>
  );
}
