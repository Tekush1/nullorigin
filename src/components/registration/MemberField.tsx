import { ChevronDown, ChevronUp, Hash, ExternalLink } from "lucide-react";
import { FormData, inputClass, labelClass, sectionHeadingClass } from "./types";

interface Props {
  n: number;
  required?: boolean;
  expanded: boolean;
  form: FormData;
  onToggle: (n: number) => void;
  onChange: (field: keyof FormData, value: string) => void;
}

export default function MemberField({ n, required = false, expanded, form, onToggle, onChange }: Props) {
  const dKey = `member${n}Discord` as keyof FormData;
  const cKey = `member${n}CTFtime` as keyof FormData;
  const accentColor = required ? "border-emerald-600 text-emerald-400" : "border-zinc-700 text-zinc-500";
  const iconColor   = required ? "text-emerald-600" : "text-zinc-600";
  const ringColor   = required ? "focus:ring-emerald-600/40" : "focus:ring-zinc-600/40";

  return (
    <fieldset className="space-y-3">
      <button
        type="button" onClick={() => onToggle(n)}
        aria-expanded={expanded} aria-controls={`member${n}-fields`}
        className={`w-full flex items-center justify-between focus:outline-none focus:ring-1 ${ringColor} rounded px-1 py-0.5`}
      >
        <legend className={`${sectionHeadingClass} ${accentColor} cursor-pointer`}>
          Member {n}{" "}
          {required
            ? <span className="text-red-500 ml-1" aria-label="required">*</span>
            : <span className="text-zinc-700 font-normal normal-case ml-1 text-[9px]">(optional)</span>}
        </legend>
        {expanded
          ? <ChevronUp   className="h-3 w-3 text-zinc-500" aria-hidden="true" />
          : <ChevronDown className="h-3 w-3 text-zinc-600" aria-hidden="true" />}
      </button>

      {expanded && (
        <div id={`member${n}-fields`} className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-3 border-l border-zinc-800">
          <div>
            <label htmlFor={`m${n}discord`} className={labelClass}>
              <Hash className={`h-3 w-3 ${iconColor}`} aria-hidden="true" />
              Discord Username{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input id={`m${n}discord`} type="text" required={required}
              value={form[dKey] as string} onChange={(e) => onChange(dKey, e.target.value)}
              placeholder="USERNAME" autoComplete="off" className={inputClass} />
          </div>
          <div>
            <label htmlFor={`m${n}ctftime`} className={labelClass}>
              <ExternalLink className={`h-3 w-3 ${iconColor}`} aria-hidden="true" />
              CTFtime Profile{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input id={`m${n}ctftime`} type="url" required={required}
              value={form[cKey] as string} onChange={(e) => onChange(cKey, e.target.value)}
              placeholder="CTFTIME.ORG/USER/..." autoComplete="off" inputMode="url" className={inputClass} />
          </div>
        </div>
      )}
    </fieldset>
  );
}
