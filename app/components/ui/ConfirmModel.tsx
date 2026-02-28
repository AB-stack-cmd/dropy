import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { LucideIcon } from "lucide-react";

interface ConfirmationModalProps{
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    title: string;
    description: string;
    icon?: LucideIcon;
    iconColor?: string;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: "primary" | "danger" | "warning" | "success" | "default";
    onConfirm: () => void;
    isDangerous?: boolean;
    warningMessage?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    // setting the model
  isOpen,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconColor = "text-danger",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "danger",
  onConfirm,
  isDangerous = false,
  warningMessage,
}) =>{
            return(
                <div>

                </div>
            )
        };