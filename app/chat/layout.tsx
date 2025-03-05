import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js"
        strategy="beforeInteractive"
      /> */}
      <SidebarProvider>
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
