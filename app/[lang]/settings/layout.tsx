

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-96 bg-background">{children}</div>;
}