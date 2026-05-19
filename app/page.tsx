import TemplateGrid from "@/components/TemplateGrid";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 py-12">
      <h1 className="text-4xl font-bold text-warm-brown">
        Greeting Card Editor
      </h1>
      <p className="text-lg text-ink/70">
        Create beautiful, vintage-styled digital greeting cards.
      </p>
      <div className="flex gap-4">
        <span className="inline-block w-4 h-4 rounded-full bg-soft-pink" />
        <span className="inline-block w-4 h-4 rounded-full bg-sage-green" />
        <span className="inline-block w-4 h-4 rounded-full bg-warm-brown" />
        <span className="inline-block w-4 h-4 rounded-full bg-parchment" />
      </div>
      <p className="text-sm text-ink/50">Choose a template to get started</p>
      <TemplateGrid />
    </main>
  );
}
