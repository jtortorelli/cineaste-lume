export default function ({ p }) {
  if (p.dob && p.dod && p.dod != "unknown") {
    return `${new Date(p.dob).getFullYear()} - ${new Date(
      p.dod
    ).getFullYear()}`;
  } else if (p.dob && !p.dod) {
    return `b.${new Date(p.dob).getFullYear()}`;
  } else {
    return "";
  }
}
