import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/useLanguage";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsLoggedIn(!!session);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function handleRegisterClick() {
    if (isLoggedIn) {
      navigate("/profil");
    } else {
      navigate("/royxat");
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-canvas/90 backdrop-blur-sm">
      <div className="mx-auto flex h-[72px] max-w-[1120px] items-center justify-between px-7">
        
        {/* LOGO */}
        <Link
          to="/"
          className="heading flex items-center gap-2.5 text-xl"
        >
          <span className="relative h-[30px] w-[30px] flex-none rounded-[7px] bg-primary">
            <span className="absolute left-2 top-[9px] h-[3px] w-3.5 bg-accent" />
            <span className="absolute left-2 top-4 h-[3px] w-2 bg-accent" />
          </span>

          Toza Mahalla
        </Link>

        {/* MENU */}
        <div className="hidden gap-8 text-sm font-semibold text-ink-soft md:flex">
          <a
            href="#qanday"
            className="hover:text-primary-deep"
          >
            {t("nav_howItWorks")}
          </a>

          <a
            href="#turlar"
            className="hover:text-primary-deep"
          >
            {t("nav_categories")}
          </a>

          <a
            href="#reyting"
            className="hover:text-primary-deep"
          >
            {t("nav_ranking")}
          </a>
        </div>

        {/* AUTH BUTTONS */}
        <div className="flex items-center gap-4">

          {!isLoggedIn && (
            <Link
              to="/kirish"
              className="hidden text-sm font-semibold text-ink-soft hover:text-ink sm:block"
            >
              {t("nav_login")}
            </Link>
          )}

          <button
            type="button"
            onClick={handleRegisterClick}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-deep"
          >
            {isLoggedIn ? "Profil" : t("nav_register")}
          </button>

        </div>
      </div>
    </nav>
  );
}