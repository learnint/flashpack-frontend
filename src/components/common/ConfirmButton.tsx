import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";

interface ConfirmButtonProps {
  isLoading?: boolean;
  type?: "button" | "reset" | "submit";
  popoverHeader?: string;
  popoverText?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  children,
  isLoading,
  type = "button",
  popoverHeader = "Confirmation!",
  popoverText,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover isOpen={isOpen}>
      <PopoverTrigger>
        <Button
          onClick={() => setIsOpen(true)}
          isLoading={isLoading}
          w="full"
          colorScheme="red"
        >
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton onClick={() => setIsOpen(false)} />
        <PopoverHeader>{popoverHeader}</PopoverHeader>
        {popoverText ? <PopoverBody>{popoverText}</PopoverBody> : null}
        <PopoverFooter d="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button onClick={() => setIsOpen(false)} isDisabled={isLoading}>
              {cancelText}
            </Button>
            <Button
              type={type}
              onClick={onConfirm ? onConfirm : undefined}
              isLoading={isLoading}
              colorScheme="red"
            >
              {confirmText}
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
