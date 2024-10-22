import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DialogOnGoingEvent = () => {
  return (
    <div className="flex w-[60px] items-center text-center md:w-[120px]">
      <Dialog>
        <DialogTrigger className="text-center text-xs md:text-xs md:font-medium animate-blink rounded-xl bg-yellow-500 px-4 py-2 font-bold text-white">
         Event On Going
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogOnGoingEvent;
