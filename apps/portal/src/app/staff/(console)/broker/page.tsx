import { listBrokerInstruments, listBrokerAudit } from "@/lib/broker-actions";
import { BrokerControls } from "./broker-client";

export const dynamic = "force-dynamic";

// Broker Control Center (enhancement prompt §16, increment 1): per-symbol
// trading controls on the LIVE Raptor terminal, staff-only, fully audited.
export default async function StaffBrokerPage() {
  const [instruments, audit] = await Promise.all([listBrokerInstruments(), listBrokerAudit()]);
  return <BrokerControls instruments={instruments} audit={audit} />;
}
