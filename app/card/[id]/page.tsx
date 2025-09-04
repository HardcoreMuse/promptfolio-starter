type Props = { params: { id: string } }

export default function CardPage({ params }: Props) {
  return (
    <article className="space-y-4">
      <h1 className="h1">Prompt Card — {params.id}</h1>
      <section className="card">
        <h2 className="h2">Prompt</h2>
        <pre className="whitespace-pre-wrap text-sm text-slate-700">{`Write a friendly cold email for ...`}</pre>
      </section>
      <section className="card">
        <h2 className="h2">Output</h2>
        <pre className="whitespace-pre-wrap text-sm text-slate-700">{`Subject: Re: Exploring a quick win`}</pre>
      </section>
      <section className="card">
        <h2 className="h2">Model</h2>
        <div className="text-sm text-slate-700">provider: OpenAI · name: gpt-4o</div>
      </section>
    </article>
  )
}
