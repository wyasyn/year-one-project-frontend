export default function SubTitle({ title }: { title: string }) {
  return (
    <h2 className="text-foreground font-semibold text-lg tracking-tight">
      {title}
    </h2>
  );
}
