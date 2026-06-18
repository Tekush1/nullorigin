export const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxI8sK3VAPkyQxu9knSBii1orDbr37ZRU6zy_og9DGZsbnVH-YpWYp4ND-0YV9L9DGN2A/exec";

export interface FormData {
  teamName: string;
  country: string;
  leaderName: string;
  leaderEmail: string;
  member1Discord: string;
  member1CTFtime: string;
  member2Discord: string;
  member2CTFtime: string;
  member3Discord: string;
  member3CTFtime: string;
  member4Discord: string;
  member4CTFtime: string;
}

export const initialForm: FormData = {
  teamName: "",
  country: "",
  leaderName: "",
  leaderEmail: "",
  member1Discord: "",
  member1CTFtime: "",
  member2Discord: "",
  member2CTFtime: "",
  member3Discord: "",
  member3CTFtime: "",
  member4Discord: "",
  member4CTFtime: "",
};

export type SubmitStatus = "idle" | "loading" | "success" | "error";

export const inputClass =
  "w-full bg-[#080810] border border-zinc-800 hover:border-zinc-600 focus:border-red-600 focus:outline-none rounded-md px-3.5 py-2.5 text-[12px] md:text-[13px] tracking-wider text-emerald-400 placeholder-zinc-700 uppercase focus:ring-1 focus:ring-red-600/25 transition-all font-mono";

export const labelClass =
  "text-[10px] tracking-widest text-zinc-500 uppercase font-bold mb-1.5 flex items-center gap-1.5 select-none";

export const sectionHeadingClass =
  "text-[10px] tracking-widest font-black uppercase border-l-2 pl-2.5";
