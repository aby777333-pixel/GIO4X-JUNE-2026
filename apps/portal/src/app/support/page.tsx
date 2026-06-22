import Link from "next/link";
import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { LINKS } from "@/lib/constants";
import { BookOpen, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { getSupabaseServer } from "@/lib/supabase-server";
import { NewTicketForm } from "./new-ticket-form";
import { LiveChatButton } from "./live-chat-button";
import { HelpTopics } from "./help-topics";

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
        {([
          { icon: MessageCircle, label: "Live chat", detail: "24/7 · avg response < 90s", action: "Start chat", live: true },
          { icon: Mail, label: "Email", detail: LINKS.support.email, action: "Send", href: `mailto:${LINKS.support.email}` },
          { icon: Phone, label: "Phone", detail: LINKS.support.phone, action: "Call", href: `tel:${LINKS.support.phone.replace(/[^\d+]/g, "")}` },
          { icon: BookOpen, label: "Help centre", detail: "260+ articles", action: "Browse", href: LINKS.website.faq, external: true },
        ] as { icon: LucideIcon; label: string; detail: string; action: string; live?: boolean; href?: string; external?: boolean }[]).map((c) => {
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
                  <a
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="mt-3 inline-block text-xs font-medium text-sky hover:underline"
                  >
                    {c.action} →
                  </a>
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
          <HelpTopics />
        </CardBody>
      </Card>
    </Shell>
  );
}
