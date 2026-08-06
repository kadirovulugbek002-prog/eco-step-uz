import { Link } from "react-router-dom";

export default function CtaSection() {
  return (
    <section id="boshlash" className="py-[76px]">
      <div className="mx-auto max-w-[1120px] px-7">
        <div className="rounded-3xl bg-ink px-11 py-14 text-center">
          <h2 className="heading mb-3.5 text-[28px] text-white sm:text-[36px] lg:text-[42px]">
            Mahallangizni ro'yxatga qo'shing
          </h2>
          <p className="mx-auto mb-[30px] max-w-[480px] text-base text-[#B9C2B7]">
            Birinchi konteyner tizimini o'z hududingizda sinab ko'rishni
            xohlaysizmi? Biz bilan bog'laning.
          </p>
          <Link
            to="/auth"
            className="inline-block rounded-[9px] bg-accent px-[26px] py-[15px] text-[15px] font-bold text-ink transition-colors hover:bg-[#F0B858]"
          >
            Mahallamni qo'shish
          </Link>
        </div>
      </div>
    </section>
  );
}