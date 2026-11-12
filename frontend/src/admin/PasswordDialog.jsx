import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { api, errText } from "../lib/api";

export const PasswordDialog = ({ open, onOpenChange }) => {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    if (next.length < 8) return toast.error("New password must be at least 8 characters");
    try {
      await api.post("/auth/change-password", { current_password: cur, new_password: next });
      toast.success("Password changed");
      setCur(""); setNext(""); onOpenChange(false);
    } catch (err) { toast.error(errText(err)); }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm" data-testid="admin-password-dialog">
        <DialogHeader><DialogTitle>Change password</DialogTitle></DialogHeader>
        <form onSubmit={submit} className="space-y-3">
          <Input type="password" placeholder="Current password" value={cur} onChange={(e) => setCur(e.target.value)} data-testid="admin-current-password" />
          <Input type="password" placeholder="New password (8+ characters)" value={next} onChange={(e) => setNext(e.target.value)} data-testid="admin-new-password" />
          <button type="submit" className="h-10 w-full rounded-full bg-[#FEBD1C] font-semibold hover:bg-[#F0AC00]" data-testid="admin-password-submit">Update password</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
