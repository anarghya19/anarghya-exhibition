export function ProjectHero({ title, tagline, image }: { title: string; tagline: string; image: string }) {
  return (
    <div className="case-intro">
      <h1>{title}</h1>
      <p className="case-summary">{tagline}</p>
      <img className="case-cover" src={image} alt={`${title} project cover`} />
    </div>
  );
}
