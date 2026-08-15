import { useState } from "react";
import { Link } from "react-router-dom";
import EmailStep from "../components/auth/EmailStep";
import RegisterDetailsStep from "../components/auth/RegisterDetailsStep";
import SuccessStep from "../components/auth/SuccessStep";
import { useLanguage } from "../context/useLanguage";
import type { AuthStep } from "../types";

export default function RegisterPage() {
  const [step, setStep] = useState<AuthStep>("phone");
  const [fullName, setFullName] = useState("");
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col items-center bg-canvas px-6 py-10">
      <Link
        to="/"
        className="heading mb-8 flex items-center gap-2.5 text-xl"
      >
        <span className="relative h-[30px] w-[30px] flex-none rounded-[7px] bg-primary">
          <span className="absolute left-2 top-[9px] h-[3px] w-3.5 bg-accent" />
          <span className="absolute left-2 top-4 h-[3px] w-2 bg-accent" />
        </span>

        {t("auth_brand")}
      </Link>

      <div className="w-full max-w-[400px] rounded-2xl border border-line bg-white p-8">
        {step === "phone" && (
          <EmailStep
            mode="register"
            onSubmit={() => setStep("details")}
          />
        )}

        {step === "details" && (
          <RegisterDetailsStep
            onSubmit={(name) => {
              setFullName(name);
              setStep("success");
            }}
          />
        )}

        {step === "success" && <SuccessStep name={fullName} />}
      </div>

      {step === "phone" && (
        <p className="mt-6 text-[13.5px] text-ink-soft">
          {t("register_haveAccount")}{" "}
          <Link
            to="/kirish"
            className="font-semibold text-primary hover:text-primary-deep"
          >
            {t("register_loginLink")}
          </Link>
        </p>
      )}
    </div>
  );
}