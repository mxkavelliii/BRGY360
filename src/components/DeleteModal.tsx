import React from "react";
import {
  RiCheckboxMultipleFill,
  RiCloseFill,
  RiErrorWarningFill,
} from "react-icons/ri";

const DeleteModal = ({
  onDelete,
  onClose,
}: {
  onDelete: () => void;
  onClose: () => void;
}) => {
  return (
    <div className="fixed top-0 left-0 bg-black/20 w-full h-screen flex items-center justify-center">
      <div className="w-3/4 lg:w-1/6 bg-white p-6 rounded-2xl flex flex-col items-center justify-center gap-6">
        <div className="w-full flex flex-row items-center justify-end">
          <RiCloseFill
            size={16}
            color="black"
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-1">
          <RiErrorWarningFill size={42} color="red" />
          <p className="text-sm font-bold text-red-700">Warning!</p>
        </div>

        <p className="text-xs font-normal text-center">
          Are you sure about deleting? You cant revert this process if you
          proceed
        </p>
        <div
          className="p-3 rounded-xl bg-red-500 text-xs font-normal text-white cursor-pointer"
          onClick={onDelete}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
