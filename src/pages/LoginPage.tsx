import { Link, useNavigate } from "react-router-dom";
import EmailStep from "../components/auth/EmailStep";
import SuccessStep from "../components/auth/SuccessStep";
import { useLanguage } from "../context/useLanguage";
import { getMyProfile } from "../lib/auth";
import { useState } from "react";

export default function LoginPage() {
  const [success, setSuccess] = useState(false);
  const { t } = useLanguage();
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const profile = await getMyProfile();

      if (profile) {
        setSuccess(true);
      } else {
        navigate("/royxat");
      }
    } catch (err) {
      console.error("Profilni olishda xatolik:", err);
    }
  }

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
        {!success ? (
          <EmailStep mode="login" onSubmit={handleLogin} />
        ) : (
          <SuccessStep />
        )}
      </div>

      {!success && (
        <p className="mt-6 text-[13.5px] text-ink-soft">
          {t("login_noAccount")}{" "}
          <Link
            to="/royxat"
            className="font-semibold text-primary hover:text-primary-deep"
          >
            {t("login_registerLink")}
          </Link>
        </p>
      )}
    </div>
  );
}