import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { LINKS } from "@/lib/constants";
import { BookOpen, HelpCircle, Mail, MessageCircle, Phone } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { getSupabaseServer } from "@/lib/supabase-server";
import { NewTicketForm } from "./new-ticket-form";
import { LiveChatButton } from "./live-chat-button";

type TicketRow = {
  id: string;
  ticket_ref: string;
  subject: string;
  status: "open" | "in_progress" | "waiting_customer" | "resolved" | "closed";
  updated_at: string;
};

const cols: Column<TicketRow>[] = [
  {
    key: "ticket_ref",
    header: "Ref",
    render: (r) => <span className="font-mono text-[11px] text-steel">{r.ticket_ref}</span>,
  },
  {
    key: "subject",
    header: "Subject",
    render: (r) => (
      <Link href={`/support/${r.id}`} className="text-navy hover:text-sky">
        {r.subject}
      </Link>
    ),
  },
  {
    key: "updated_at",
    header: "Updated",
    render: (r) => (
      <span className="text-steel">{new Date(r.updated_at).toLocaleDateString()}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (r) => (
      <StatusBadge
        tone={
          r.status === "resolved" || r.status === "closed"
            ? "success"
            : r.status === "in_progress"
            ? "info"
            : r.status === "waiting_customer"
            ? "warning"
            : "warning"
        }
      >
        {r.status.replace("_", " ")}
      </StatusBadge>
    ),
  },
];

export default async function SupportPage() {
  const user = await getCurrentUser();
  const signedIn = !!user;

  let tickets: TicketRow[] = [];
  if (user) {
    const supabase = getSupabaseServer();
    const { data } = await supabase
      .from("support_tickets")
      .select("id, ticket_ref, subject, status, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(50);
    tickets = (data ?? []) as TicketRow[];
  }

  return (
    <Shell title="Support">
      <PageHeader
        title="Help & Support"
        subtitle="Search the help centre, talk to us live, or open a ticket."
        actions={<NewTicketForm signedIn={signedIn} />}
      />

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {[
          { icon: MessageCircle, label: "Live chat", detail: "24/7 · avg response < 90s", action: "Start chat", live: true },
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
                {c.live ? (
                  <LiveChatButton label={c.action} />
                ) : (
                  <button className="mt-3 text-xs font-medium text-sky hover:underline">{c.action} →</button>
                )}
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
          {!signedIn ? (
            <div className="px-5 py-8 text-center text-sm text-steel">
              <Link href="/auth/login?redirect=/support" className="font-medium text-sky hover:underline">
                Sign in
              </Link>{" "}
              to view and open tickets.
            </div>
          ) : tickets.length === 0 ? (
            <div className="px-5 py-8 text-center text-sm text-steel">
              You haven&apos;t opened any tickets yet.
            </div>
          ) : (
            <DataTable columns={cols} rows={tickets} />
          )}
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
                href={`${LINKS.website.faq}?q=${encodeURIComponent(q)}`}
                target="_blank"
                rel="noreferrer"
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
