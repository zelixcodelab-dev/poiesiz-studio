import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { CITIES, PROPERTY_TYPES } from "../../data/content";

const field = "h-12 w-full rounded-xl border border-[#E5DEC9] bg-white px-4 text-[15px] text-[#1A1918] outline-none transition-colors duration-300 placeholder:text-[#8E8A82] focus:border-[#8A6200]";

export const ConsultForm = ({ id = "hero" }) => {
  const [form, setForm] = useState({ name: "", phone: "", city: "", type: "Apartment" });
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Please enter your name");
    if (!/^[6-9]\d{9}$/.test(form.phone)) return toast.error("Please enter a valid 10-digit mobile number");
    if (!form.city) return toast.error("Please choose your city");
    setDone(true);
    toast.success(`Thank you, ${form.name.split(" ")[0]}! A designer will call you shortly.`);
  };

  if (done) {
    return (
      <div className="flex flex-col items-start gap-4 py-6" data-testid={`${id}-consult-success`}>
        <CheckCircle2 className="h-10 w-10 text-[#5E7A4C]" />
        <h3 className="font-display text-2xl font-semibold text-[#1A1918]">Your request is in.</h3>
        <p className="text-[#6E6B65]">Thank you, {form.name}. A designer will reach you on +91 {form.phone} to plan your {form.type} in {form.city}.</p>
        <button type="button" onClick={() => { setDone(false); setForm({ name: "", phone: "", city: "", type: "Apartment" }); }} className="text-sm font-medium text-[#8A6200] underline-offset-4 hover:underline" data-testid={`${id}-consult-reset-btn`}>Book for another home</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3" data-testid={`${id}-consult-form`}>
      <input className={field} placeholder="Your name" value={form.name} onChange={set("name")} data-testid={`${id}-name-input`} />
      <div className="flex">
        <span className="flex h-12 items-center rounded-l-xl border border-r-0 border-[#E5DEC9] bg-[#F3EFEA] px-3 text-sm text-[#6E6B65]">+91</span>
        <input className={`${field} rounded-l-none`} inputMode="numeric" maxLength={10} placeholder="Mobile number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })} data-testid={`${id}-phone-input`} />
      </div>
      <select className={field} value={form.city} onChange={set("city")} data-testid={`${id}-city-select`}>
        <option value="">Select your city</option>
        {CITIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <div className="flex flex-wrap gap-2 pt-1">
        {PROPERTY_TYPES.map((t) => (
          <button type="button" key={t} onClick={() => setForm({ ...form, type: t })}
            className={`h-10 rounded-full border px-4 text-sm transition-colors duration-300 ${form.type === t ? "border-[#1C1C1C] bg-[#1C1C1C] text-[#FBF9F5]" : "border-[#E5DEC9] bg-white text-[#1A1918] hover:border-[#1C1C1C]"}`}
            data-testid={`${id}-type-${t.replace(/\s/g, "").toLowerCase()}`}>{t}</button>
        ))}
      </div>
      <button type="submit" className="group mt-2 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#FEBD1C] py-3.5 font-medium text-white transition-colors duration-300 hover:bg-[#F0AC00]" data-testid={`${id}-consult-submit-btn`}>
        Book Free Consultation
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <p className="text-center text-xs text-[#6E6B65]">No spam. We only call to plan your consultation.</p>
    </form>
  );
};
