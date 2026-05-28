import { Shell } from "@/components/Shell";
import { PageHeader } from "@/components/PageHeader";
import { MetricGrid } from "@/components/MetricGrid";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardBody, CardHeader, CardTitle } from "@gio4x/ui";
import { Network, Users, TrendingUp, Layers } from "lucide-react";

type Node = {
  id: number;
  name: string;
  uid: string;
  level: number;
  clients: number;
  volume30d: number;
  commission30d: number;
  status: "active" | "dormant";
  children?: Node[];
};

const tree: Node = {
  id: 0,
  name: "You",
  uid: "1701808",
  level: 0,
  clients: 38,
  volume30d: 4830000,
  commission30d: 48.3,
  status: "active",
  children: [
    {
      id: 1,
      name: "Raja K.",
      uid: "1814022",
      level: 1,
      clients: 12,
      volume30d: 980000,
      commission30d: 9.8,
      status: "active",
      children: [
        { id: 11, name: "Vinay P.", uid: "1922104", level: 2, clients: 4, volume30d: 230000, commission30d: 2.3, status: "active" },
        { id: 12, name: "Anu S.", uid: "1922520", level: 2, clients: 2, volume30d: 88000, commission30d: 0.88, status: "active" },
      ],
    },
    {
      id: 2,
      name: "Lakshmi M.",
      uid: "1817744",
      level: 1,
      clients: 8,
      volume30d: 612000,
      commission30d: 6.12,
      status: "active",
      children: [
        { id: 21, name: "Arjun B.", uid: "1926006", level: 2, clients: 3, volume30d: 145000, commission30d: 1.45, status: "dormant" },
      ],
    },
    {
      id: 3,
      name: "Vikram T.",
      uid: "1820055",
      level: 1,
      clients: 4,
      volume30d: 220000,
      commission30d: 2.2,
      status: "active",
    },
  ],
};

function NodeRow({ node, depth = 0 }: { node: Node; depth?: number }) {
  return (
    <>
      <tr className="border-t border-slate-50">
        <td className="py-3 pr-4" style={{ paddingLeft: 16 + depth * 28 }}>
          <div className="flex items-center gap-2">
            {depth > 0 ? <span className="text-steel-light">└</span> : null}
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky to-navy text-[10px] font-bold text-white">
              {node.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <div className="text-sm font-medium text-navy">{node.name}</div>
              <div className="text-[10px] text-steel">UID {node.uid}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <span className="rounded-full bg-sky/10 px-2 py-0.5 text-[10px] font-semibold text-sky">L{node.level}</span>
        </td>
        <td className="px-4 py-3 text-right text-navy">{node.clients}</td>
        <td className="px-4 py-3 text-right text-steel">${node.volume30d.toLocaleString()}</td>
        <td className="px-4 py-3 text-right font-semibold text-success">${node.commission30d.toFixed(2)}</td>
        <td className="px-4 py-3 text-right">
          <StatusBadge tone={node.status === "active" ? "success" : "neutral"}>{node.status}</StatusBadge>
        </td>
      </tr>
      {node.children?.map((c) => <NodeRow key={c.id} node={c} depth={depth + 1} />)}
    </>
  );
}

export default function TreePage() {
  return (
    <Shell title="Multi-Level IB">
      <PageHeader
        title="Multi-Level IB Tree"
        subtitle="Your downline up to 3 levels deep, with rolled-up volume and commission."
      />

      <MetricGrid
        columns={4}
        metrics={[
          { label: "Direct sub-IBs", value: "3", icon: <Network size={14} /> },
          { label: "Total downline", value: "6", icon: <Layers size={14} /> },
          { label: "Total downline clients", value: "33", icon: <Users size={14} /> },
          { label: "Downline volume (30D)", value: "$2.3M", icon: <TrendingUp size={14} />, deltaDirection: "up", delta: "+22% MoM" },
        ]}
      />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Downline tree</CardTitle>
        </CardHeader>
        <CardBody className="px-0">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-steel-light">
              <tr>
                <th className="pl-4 pr-4 py-3 font-medium">Sub-IB</th>
                <th className="px-4 py-3 text-center font-medium">Level</th>
                <th className="px-4 py-3 text-right font-medium">Clients</th>
                <th className="px-4 py-3 text-right font-medium">Volume 30D</th>
                <th className="px-4 py-3 text-right font-medium">Comm 30D</th>
                <th className="px-4 py-3 text-right font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <NodeRow node={tree} />
            </tbody>
          </table>
        </CardBody>
      </Card>
    </Shell>
  );
}
