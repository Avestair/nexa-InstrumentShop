import React from "react";
import { PiX } from "react-icons/pi";

interface ModalProps {
  mainContainerClassName?: string;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalHeaderProps {
  title: string;
  description?: string;
}

interface ModalBodyProps {
  className?: string;
  children: React.ReactNode;
}

interface ModalFooterProps {
  className?: string;
  children: React.ReactNode;
}

export default function Modal({
  mainContainerClassName,
  onClose,
  children,
}: ModalProps) {
  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-gray-100/30 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className={`relative m-4 grid w-full max-w-lg gap-4 rounded-lg bg-white p-6 shadow-xl ${mainContainerClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 cursor-pointer text-2xl text-gray-500 transition-all duration-300 hover:text-gray-800"
          aria-label="Close modal"
        >
          <PiX className="size-6" />
        </button>

        {/* Render sub-components */}
        {children}
      </div>
    </div>
  );
}

// Sub-component for Modal Header
Modal.Header = function ModalHeader({ title, description }: ModalHeaderProps) {
  return (
    <div className="grid gap-2 border-b pb-4">
      <p className="text-2xl font-bold text-gray-800">{title}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

// Sub-component for Modal Body
Modal.Body = function ModalBody({ className, children }: ModalBodyProps) {
  return (
    <div className={`grid max-h-[70vh] gap-3 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

// Sub-component for Modal Footer
Modal.Footer = function ModalFooter({ className, children }: ModalFooterProps) {
  return (
    <div className={`flex justify-end gap-3 border-t pt-4 ${className}`}>
      {children}
    </div>
  );
};
