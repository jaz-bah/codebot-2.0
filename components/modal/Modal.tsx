import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  pathName: string;
}
export function Modal({ open, onOpenChange, title, children, pathName }: Props) {
  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(!open)}>
      <DialogContent className={`sm:max-w-full ${pathName === "presets" || pathName === "storage" ? "md:max-w-4xl" : "md:max-w-lg"}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
