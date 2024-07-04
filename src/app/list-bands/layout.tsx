export default async function FindBands({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center px-4">
      <div className="w-ful max-w-xs">{children}</div>
    </div>
  )
}
