import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { ConsultForm } from "./ConsultForm";

export const BookDialog = ({ open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md rounded-[24px] border-[#E5DEC9] bg-[#FBF9F5] p-6 md:p-8" data-testid="book-dialog">
      <DialogHeader className="text-left">
        <DialogTitle className="font-display text-2xl font-semibold text-[#1A1918]">Book a free design session</DialogTitle>
        <DialogDescription className="text-[#6E6B65]">Share a few details and a designer will call you.</DialogDescription>
      </DialogHeader>
      <ConsultForm id="dialog" />
    </DialogContent>
  </Dialog>
);
