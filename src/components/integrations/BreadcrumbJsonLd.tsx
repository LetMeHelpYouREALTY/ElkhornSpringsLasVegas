import { JsonLd } from "@/components/integrations/JsonLd";
import { breadcrumbListJsonLd, type BreadcrumbItem } from "@/lib/schema";

type BreadcrumbJsonLdProps = {
  crumbs: BreadcrumbItem[];
};

export function BreadcrumbJsonLd({ crumbs }: BreadcrumbJsonLdProps) {
  return <JsonLd data={breadcrumbListJsonLd(crumbs)} />;
}
