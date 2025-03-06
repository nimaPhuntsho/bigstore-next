export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Admin header</h1>
      {children}
    </>
  );
}
