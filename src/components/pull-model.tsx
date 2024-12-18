import React, { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { DownloadIcon } from "@radix-ui/react-icons";
import PullModelForm from "./pull-model-form";

export default function PullModel() {

  return (
    <Dialog>
      <DialogContent className="space-y-2">
      <DialogTitle>Pull Model</DialogTitle>
          <PullModelForm />
      </DialogContent>
    </Dialog>
  );
}
