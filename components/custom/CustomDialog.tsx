"use client";

import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon, Spinner } from "@chakra-ui/react";
interface Props {
  openDialogTitle: string;
  dialogTitle: string;
  dialogBody: string;
  onCancel: () => Promise<boolean>;
}

import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

const CustomDialog = ({
  openDialogTitle,
  dialogTitle,
  dialogBody,
  onCancel,
}: Props) => {
  const [cancelingOrders, setCancelingOrders] = useState(false);
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="solid" size="sm">
          {openDialogTitle}
          <Icon>
            <MdDeleteOutline />
          </Icon>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {dialogTitle} </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p> {dialogBody} </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Not now</Button>
          </DialogActionTrigger>
          <Button
            onClick={async () => {
              setCancelingOrders(true);
              const response = await onCancel();
              if (response) setCancelingOrders(false);
            }}
          >
            Cancel {cancelingOrders && <Spinner />}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default CustomDialog;
