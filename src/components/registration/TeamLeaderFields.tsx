import { Users, Globe, User, Mail } from "lucide-react";
import { FormData, inputClass, labelClass, sectionHeadingClass } from "./types";

interface Props {
  form: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}

export default function TeamLeaderFields({ form, onChange }: Props) {
  return (
    <>
      <fieldset className="space-y-4">
        <legend className={`${sectionHeadingClass} border-red-600 text-red-400`}>Team Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="teamName" className={labelClass}>
              <Users className="h-3 w-3 text-red-500" aria-hidden="true" />
              Team Name <span className="text-red-500 ml-0.5" aria-label="required">*</span>
            </label>
            <input id="teamName" type="text" required value={form.teamName}
              onChange={(e) => onChange("teamName", e.target.value)}
              placeholder="TEAM_NAME" autoComplete="off" className={inputClass} />
          </div>
          <div>
            <label htmlFor="country" className={labelClass}>
              <Globe className="h-3 w-3 text-red-500" aria-hidden="true" />
              Country <span className="text-red-500 ml-0.5" aria-label="required">*</span>
            </label>
            <input id="country" type="text" required value={form.country}
              onChange={(e) => onChange("country", e.target.value)}
              placeholder="COUNTRY" autoComplete="country-name" className={inputClass} />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className={`${sectionHeadingClass} border-red-600 text-red-400`}>Team Leader</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="leaderName" className={labelClass}>
              <User className="h-3 w-3 text-red-500" aria-hidden="true" />
              Full Name <span className="text-red-500 ml-0.5" aria-label="required">*</span>
            </label>
            <input id="leaderName" type="text" required value={form.leaderName}
              onChange={(e) => onChange("leaderName", e.target.value)}
              placeholder="LEADER_NAME" autoComplete="name" className={inputClass} />
          </div>
          <div>
            <label htmlFor="leaderEmail" className={labelClass}>
              <Mail className="h-3 w-3 text-red-500" aria-hidden="true" />
              Email <span className="text-red-500 ml-0.5" aria-label="required">*</span>
            </label>
            <input id="leaderEmail" type="email" required value={form.leaderEmail}
              onChange={(e) => onChange("leaderEmail", e.target.value)}
              placeholder="LEADER@DOMAIN.COM" autoComplete="email" inputMode="email" className={inputClass} />
          </div>
        </div>
      </fieldset>
    </>
  );
}
