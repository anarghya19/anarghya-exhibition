const takeaways = [
  {
    number: "01",
    title: "Generated doesn't mean finished.",
    text: "AI could create a first version quickly, but I still had to question what it communicated and how people would use it.",
  },
  {
    number: "02",
    title: "Design decisions continued in code.",
    text: "Working with functional interfaces helped me recognise interaction and responsive issues that weren't obvious in sketches.",
  },
  {
    number: "03",
    title: "Shipping made the details matter.",
    text: "I learned to think beyond how an interface looked and take responsibility for testing, refining and releasing it.",
  },
];

export function AlchemicReflection() {
  return (
    <section id="case-alchemic-reflection" className="case-chapter alc-reflection">
      <p>
        05
        <span className="case-chapter-kicker">Reflection</span>
      </p>
      <h2>Building changed how I make design decisions.</h2>
      <div className="case-chapter-body">
        <div className="case-reflection">
          <p className="case-reflection-label">What I took away</p>
          <div className="case-learnings">
            {takeaways.map((item) => (
              <div key={item.number}>
                <span className="case-learning-number">{item.number}</span>
                <h4>{item.title}</h4>
                <p className="case-chapter-copy">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
