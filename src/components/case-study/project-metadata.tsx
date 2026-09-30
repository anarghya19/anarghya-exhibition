export function ProjectMetadata({
  projectType,
  duration,
  team,
  role,
  lineup,
  roleLabel = "My Role",
}: {
  projectType: string;
  duration: string;
  team: string;
  role: string;
  lineup?: string;
  roleLabel?: string;
}) {
  const facts = [
    { label: "Project Type", value: projectType },
    { label: "Duration", value: duration },
    { label: "Team", value: team },
    { label: roleLabel, value: role },
    { label: "Focus", value: lineup ?? "" },
  ].filter((fact) => fact.value);

  return (
    <dl className="case-facts">
      {facts.map((fact) => (
        <div key={fact.label}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
