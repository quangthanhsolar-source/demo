"use client";

import { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, Sun } from "lucide-react";
import { VALID_EMAIL, VALID_PASS } from "@/lib/auth";
import { T } from "@/lib/tokens";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(VALID_EMAIL);
  const [pass, setPass] = useState(VALID_PASS);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });
      if (!res.ok) {
        setError("Email hoặc mật khẩu chưa đúng. Thử lại nhé.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Không thể đăng nhập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") void submit();
  };

  return (
    <div
      className="min-h-[100dvh] w-full flex flex-col items-center justify-center px-6 py-8"
      style={{ background: T.canvas }}
    >
      <div
        className="w-[58px] h-[58px] rounded-[18px] grid place-items-center"
        style={{ background: T.ink, color: T.lime }}
      >
        <Sun className="w-7 h-7" />
      </div>

      <h1 className="font-display text-[30px] font-bold text-center leading-tight mt-5">
        <span style={{ color: "#c4c7cc", fontWeight: 500 }}>
          VP HCM – Quang Thanh Solar
        </span>
        <br />
        Báo giá NLMT
      </h1>
      <p className="mt-2 text-sm" style={{ color: T.muted }}>
        Hệ thống quản lý năng lượng mặt trời
      </p>

      <div
        className="w-full max-w-[420px] mt-7 rounded-3xl px-6 py-7"
        style={{ background: T.panel, boxShadow: T.lift }}
      >
        <h2 className="font-display text-xl font-bold mb-5">Đăng nhập</h2>

        {error && (
          <div
            className="rounded-xl px-3.5 py-2.5 text-[13px] mb-3.5"
            style={{ background: T.redSoft, color: "#c2341a" }}
          >
            {error}
          </div>
        )}

        <label
          className="block text-[11px] font-bold uppercase tracking-[0.07em] mb-1.5"
          style={{ color: T.muted }}
        >
          Email
        </label>
        <div className="relative mb-3.5">
          <Mail
            className="w-[17px] h-[17px] absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: T.muted }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="username"
            className="w-full h-12 rounded-[14px] pl-11 pr-4 text-[15px] border border-transparent focus:outline-none focus:border-[var(--ink)] focus:bg-white"
            style={{ background: T.surface }}
          />
        </div>

        <label
          className="block text-[11px] font-bold uppercase tracking-[0.07em] mb-1.5"
          style={{ color: T.muted }}
        >
          Mật khẩu
        </label>
        <div className="relative mb-5">
          <Lock
            className="w-[17px] h-[17px] absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: T.muted }}
          />
          <input
            type={showPass ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="current-password"
            className="w-full h-12 rounded-[14px] pl-11 pr-12 text-[15px] border border-transparent focus:outline-none focus:border-[var(--ink)] focus:bg-white"
            style={{ background: T.surface }}
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
            style={{ color: T.muted }}
            aria-label="Hiện mật khẩu"
          >
            {showPass ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={() => void submit()}
          disabled={loading}
          className="w-full h-12 rounded-full text-white text-sm font-bold transition-opacity disabled:opacity-60"
          style={{ background: T.ink }}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </div>

      <p
        className="mt-7 text-[11px] text-center uppercase tracking-[0.04em]"
        style={{ color: T.muted2 }}
      >
        © 2026 Quang Thanh Solar – Giải pháp Năng lượng Mặt trời
      </p>
    </div>
  );
}
