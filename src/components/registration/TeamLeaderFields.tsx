import { FormData, inputClass, labelClass, sectionHeadingClass } from "./types";

interface Props {
  form: FormData;
  onChange: (field: keyof FormData, value: string) => void;
}

export default function TeamLeaderFields({ form, onChange }: Props) {
  return (
    <>
      {/* Team Information */}
      <div className="mb-[30px]">
        <div className={sectionHeadingClass}>
          <span className="inline-block w-1 h-[14px] bg-[#ff3355] flex-shrink-0" />
          TEAM INFORMATION
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="teamName" className={labelClass}>
              TEAM NAME <span className="text-[#ff3355]">*</span>
            </label>
            <input
              id="teamName" type="text" required
              value={form.teamName}
              onChange={(e) => onChange("teamName", e.target.value)}
              placeholder="TEAM_NAME"
              autoComplete="off"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="country" className={labelClass}>
              COUNTRY <span className="text-[#ff3355]">*</span>
            </label>
            <input
              id="country" type="text" required
              value={form.country}
              onChange={(e) => onChange("country", e.target.value)}
              placeholder="COUNTRY"
              autoComplete="country-name"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Team Leader */}
      <div className="mb-[30px]">
        <div className={sectionHeadingClass}>
          <span className="inline-block w-1 h-[14px] bg-[#ff3355] flex-shrink-0" />
          TEAM LEADER
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="leaderName" className={labelClass}>
              FULL NAME <span className="text-[#ff3355]">*</span>
            </label>
            <input
              id="leaderName" type="text" required
              value={form.leaderName}
              onChange={(e) => onChange("leaderName", e.target.value)}
              placeholder="LEADER_NAME"
              autoComplete="name"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="leaderEmail" className={labelClass}>
              EMAIL <span className="text-[#ff3355]">*</span>
            </label>
            <input
              id="leaderEmail" type="email" required
              value={form.leaderEmail}
              onChange={(e) => onChange("leaderEmail", e.target.value)}
              placeholder="LEADER@DOMAIN.COM"
              autoComplete="email"
              inputMode="email"
              className={inputClass}
            />
          </div>
        </div>
      </div>
    </>
  );
}
