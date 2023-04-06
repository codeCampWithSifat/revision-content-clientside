import React from "react";

const ConfirmationModal = ({title,message,modalData,closeModal,handleDeleteDoctor,successButtonName}) => {
  return (
    <div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">
            <span className="text-red-700 text-md">{message}</span>
          </p>
          <div className="modal-action">
            <label
              onClick={() => handleDeleteDoctor(modalData)}
              htmlFor="confirmation-modal"
              className="btn btn-sm"
            >
              {successButtonName}
            </label>
            <label
              htmlFor="confirmation-modal"
              className="btn btn-sm btn-error text-white"
              onClick={closeModal}
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
