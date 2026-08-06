"use client";

import { useState } from "react";
import { Building2, Contact, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/SearchInput";
import { suppliers } from "@/lib/mock-data";
import { T } from "@/lib/tokens";

export function SuppliersPage() {
  const [q, setQ] = useState("");
  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="max-w-[1200px] mx-auto space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <Building2 className="w-5 h-5" style={{ color: T.primary }} /> Nhà cung
        cấp
      </h1>
      <SearchInput
        value={q}
        onChange={setQ}
        placeholder="Tìm nhà cung cấp..."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <Card key={s.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-[15px]">{s.name}</h3>
              <Badge
                label={s.category}
                colors={{ bg: T.primarySoft, text: T.primary }}
              />
            </div>
            <div className="text-sm space-y-1.5" style={{ color: T.muted }}>
              <div className="flex items-center gap-2">
                <Contact className="w-3.5 h-3.5" /> {s.contact}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> {s.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> {s.address}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
