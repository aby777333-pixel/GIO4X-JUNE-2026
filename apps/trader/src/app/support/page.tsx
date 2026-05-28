import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader, CardTitle, Button } from "@gio4x/ui";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { LINKS } from "@/lib/constants";
import { BookOpen, HelpCircle, Mail, MessageCircle, Phone, Plus } from "lucide-react";

type Ticket = { id: number; ref: string; subject: string; updated: string; status: "open" | "in-progress" | "resolved" };

const tickets: Ticket[] = [
  { id: 1, ref: "T-22411", subject: "Withdrawal pending more than 24h", updated: "3 hours ago", status: "in-progress" },
  { id: 2, ref: "T-22388", subject: "Cannot login to GIO Raptor account 15624153", updated: "Yesterday", status: "resolved" },
  { id: 3, ref: "T-22270", subject: "Change registered email address", updated: "1 week ago", status: "resolved" },
];

const cols: Column<Ticket>[] = [
  { key: "ref", header: "Ref", render: (r) => <span className="font-mono text-[11px] text-steel">{r.ref}</span> },
  { key: "subject", header: "Subject", render: (r) => <Link href={`/support/${r.id}`} className="text-navy hover:text-sky">{r.subject}</Link> },
  { key: "updated", header: "Updated", render: (r) => <span className="text-steel">{r.updated}</span> },
  { key: "status", header: "Status", render: (r) => <StatusBadge tone={r.status === "resolved" ? "success" : r.status === "in-progress" ? "info" : "warning"}>{r.status}</StatusBadge> },
];

export default function SupportPage() {
  return (
    <Shell title="Support">
      <PageHeader
        title="Help & Support"
        subtitle="Search the help centre, talk to us live, or open a ticket."
        actions={
          <Button variant="primary">
            <Plus size={14} className="mr-1" /> New ticket
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {[
          { icon: MessageCircle, label: "Live chat", detail: "24/7 · avg response < 90s", action: "Start chat" },
          { icon: Mail, label: "Email", detail: LINKS.support.email, action: "Send" },
          { icon: Phone, label: "Phone", detail: LINKS.support.phone, action: "Call" },
          { icon: BookOpen, label: "Help centre", detail: "260+ articles", action: "Browse" },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.label}>
              <CardBody>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky/10 text-sky">
                  <Icon size={18} />
                </div>
                <div className="mt-3 text-sm font-semibold text-navy">{c.label}</div>
                <div className="mt-0.5 text-[11px] text-steel">{c.detail}</div>
                <button className="mt-3 text-xs font-medium text-sky hover:underline">{c.action} →</button>
              </CardBody>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your tickets</CardTitle>
        </CardHeader>
        <CardBody className="px-0 pt-2">
          <DataTable columns={cols} rows={tickets} />
        </CardBody>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Top help topics</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              "How long do withdrawals take?",
              "Why is my deposit pending?",
              "Reset my GIO Raptor account password",
              "How does the rebate calculation work?",
              "What documents are accepted for KYC?",
              "Switching account currency / leverage",
            ].map((q) => (
              <Link
                key={q}
                href="#"
                className="flex items-start gap-2 rounded-lg border border-slate-100 p-3 text-sm text-navy transition hover:border-sky/30 hover:bg-sky/5"
              >
                <HelpCircle size={14} className="mt-0.5 text-sky" /> {q}
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
    </Shell>
  );
}
