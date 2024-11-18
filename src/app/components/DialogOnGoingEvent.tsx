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
        <DialogTrigger className="animate-blink rounded-xl bg-yellow-500 px-4 py-2 text-center text-xs font-bold text-white md:text-xs md:font-medium">
          Event Dalam Waktu Dekat
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Daftar Event Yang Sedang On Going</DialogTitle>
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
