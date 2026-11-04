import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PaymentWizard } from "@/components/payment-wizard";

export default function PaymentsPage() {
  return <><SiteHeader /><main id="main-content" className="page-surface payments-page"><div className="shell"><div className="page-breadcrumb"><Link href="/">Home</Link><span>/</span><span>Payments</span></div><header className="payments-heading"><div><p className="eyebrow">Student & family payments</p><h1>A clear way<br />to <em>pay.</em></h1></div><p>Choose a payment type, tell us who’s paying and use the reference supplied by the college.</p></header><div className="payment-prototype-banner"><span>Secure Payment Portal</span><p>Pay online securely for course deposits, materials fees and college trips. Card details are processed directly by certified banking gateways.</p></div><PaymentWizard /></div></main><SiteFooter /></>;
}
