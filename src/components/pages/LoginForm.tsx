"use client";

import { useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Sun } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { FormField, inputCls } from "@/components/ui/FormField";
import { T } from "@/lib/tokens";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
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
        setError("Email hoặc mật khẩu không đúng.");
        return;
      }
      router.push("/dashboard/bao-gia/tao");
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
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-sm"
            style={{ background: "linear-gradient(135deg,#FBBF24,#F97316)" }}
          >
            <Sun className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-lg font-bold text-center">
            VP HCM - Quang Thanh Solar
          </h1>
          <p className="text-sm text-center mt-1" style={{ color: T.muted }}>
            Hệ thống Quản lý Báo giá NLMT
          </p>
        </div>

        <Card className="p-6">
          <div>
            <FormField label="Email">
              <div className="relative">
                <Mail
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: T.muted }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="admin@baoduy.com"
                  className={inputCls + " pl-9"}
                  style={{ borderColor: T.border }}
                />
              </div>
            </FormField>
            <FormField label="Mật khẩu">
              <div className="relative">
                <Lock
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: T.muted }}
                />
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="••••••••"
                  className={inputCls + " pl-9"}
                  style={{ borderColor: T.border }}
                />
              </div>
            </FormField>

            {error && <div className="text-xs text-red-600 mb-3">{error}</div>}

            <button
              type="button"
              onClick={() => void submit()}
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
              style={{ backgroundColor: T.primary }}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </Card>

        <p className="text-center text-xs mt-6" style={{ color: T.muted }}>
          © 2026 Quang Thanh Solar - Giải pháp Năng lượng Mặt trời
        </p>
      </div>
    </div>
  );
}
