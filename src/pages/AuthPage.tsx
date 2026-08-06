import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneStep from "../components/auth/PhoneStep";
import CodeStep from "../components/auth/CodeStep";
import SuccessStep from "../components/auth/SuccessStep";
import type { AuthStep } from "../types";

export default function AuthPage() {
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center bg-canvas px-6 py-10">
      <Link to="/" className="heading mb-10 flex items-center gap-2.5 text-xl">
        <span className="relative h-[30px] w-[30px] flex-none rounded-[7px] bg-primary">
          <span className="absolute left-2 top-[9px] h-[3px] w-3.5 bg-accent" />
          <span className="absolute left-2 top-4 h-[3px] w-2 bg-accent" />
        </span>
        Toza Mahalla
      </Link>

      <div className="w-full max-w-[400px] rounded-2xl border border-line bg-white p-8">
        {step === "phone" && (
          <PhoneStep
            onSubmit={(value) => {
              setPhone(value);
              setStep("code");
            }}
          />
        )}

        {step === "code" && (
          <CodeStep
            phone={phone}
            onBack={() => setStep("phone")}
            onSubmit={() => setStep("success")}
          />
        )}

        {step === "success" && <SuccessStep />}
      </div>

      <p className="mt-7 max-w-[400px] text-center text-[12.5px] text-ink-soft">
        Davom etish orqali siz{" "}
        <span className="font-semibold text-ink">foydalanish shartlari</span>{" "}
        bilan tanishgan va rozi bo'lgan hisoblanasiz.
      </p>
    </div>
  );
}