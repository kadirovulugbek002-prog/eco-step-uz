interface Props {
  total: number;
  collected: number;
}

export default function DailyStats({ total, collected }: Props) {
  const remaining = total - collected;

  return (
    <div className="grid grid-cols-3 gap-2.5">
      <div className="rounded-[12px] border border-line bg-white p-3.5 text-center">
        <p className="font-mono text-[22px] font-semibold text-ink">
          {total}
        </p>
        <p className="mt-0.5 text-[11.5px] text-ink-soft">Jami vazifa</p>
      </div>
      <div className="rounded-[12px] border border-line bg-white p-3.5 text-center">
        <p className="font-mono text-[22px] font-semibold text-[#C1502E]">
          {remaining}
        </p>
        <p className="mt-0.5 text-[11.5px] text-ink-soft">Qoldi</p>
      </div>
      <div className="rounded-[12px] border border-line bg-white p-3.5 text-center">
        <p className="font-mono text-[22px] font-semibold text-primary-deep">
          {collected}
        </p>
        <p className="mt-0.5 text-[11.5px] text-ink-soft">Yig'ildi</p>
      </div>
    </div>
  );
}