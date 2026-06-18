import React, { useState } from "react";
import { sound } from "../hooks/utils/audio";
import { FormData, initialForm, SubmitStatus, GOOGLE_SCRIPT_URL } from "./registration/types";
import { RegistrationHeader, RegistrationFooter } from "./registration/RegLayout";
import SuccessScreen from "./registration/SuccessScreen";
import RegFormCard from "./registration/RegFormCard";

interface Props { onBack: () => void; }

export default function RegistrationPage({ onBack }: Props) {
  const [form, setForm]                       = useState<FormData>(initialForm);
  const [status, setStatus]                   = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg]               = useState("");
  const [expandedMembers, setExpandedMembers] = useState<number[]>([1]);

  const handleChange = (field: keyof FormData, value: string) => {
    sound.playKey?.();
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMember = (n: number) => {
    sound.playClick();
    setExpandedMembers((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    const payload = {
      ...form,
      member2Discord: form.member2Discord || "",
      member2CTFtime: form.member2CTFtime || "",
      member3Discord: form.member3Discord || "",
      member3CTFtime: form.member3CTFtime || "",
      member4Discord: form.member4Discord || "",
      member4CTFtime: form.member4CTFtime || "",
      timestamp: new Date().toISOString(),
    };
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      sound.playSuccess?.();
      setStatus("success");
    } catch {
      sound.playError?.();
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return <SuccessScreen form={form} onBack={onBack} onReset={(f) => { setForm(f); setStatus("idle"); }} />;
  }

  return (
    <div className="min-h-screen bg-[#020202] text-gray-100 font-mono flex flex-col relative overflow-x-hidden">
      <RegistrationHeader onBack={onBack} />
      <RegFormCard form={form} status={status} errorMsg={errorMsg} expandedMembers={expandedMembers}
        onSubmit={handleSubmit} onChange={handleChange} onToggleMember={toggleMember} />
      <RegistrationFooter />
    </div>
  );
}
