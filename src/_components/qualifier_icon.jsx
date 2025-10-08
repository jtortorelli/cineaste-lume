export default function qualifier_icon({ qualifier = "" }, { icon }) {
  switch (qualifier.toLowerCase()) {
    case "cgi":
      return (
        <img
          class="inline h-4 w-4"
          src={icon("server", "tabler", "outline")}
          inline
        />
      );
    case "motion capture":
      return (
        <img
          class="inline h-4 w-4"
          src={icon("stretching-2", "tabler", "outline")}
          inline
        />
      );
    case "american version":
      return (
        <img
          class="inline h-4 w-4"
          src={icon("world", "tabler", "outline")}
          inline
        />
      );
    case "photo":
      return (
        <img
          class="inline h-4 w-4"
          src={icon("photo", "tabler", "outline")}
          inline
        />
      );
    case "puppet":
      return (
        <img
          class="inline h-4 w-4"
          src={icon("mood-happy", "tabler", "outline")}
          inline
        />
      );
    case "stock footage":
      return (
        <img
          class="inline h-4 w-4"
          src={icon("recycle", "tabler", "outline")}
          inline
        />
      );
    case "suit actor":
      return (
        <img
          class="inline h-4 w-4"
          src={icon("meeple", "tabler", "outline")}
          inline
        />
      );
    case "voice":
      return (
        <img
          class="inline h-4 w-4"
          src={icon("microphone-2", "tabler", "outline")}
          inline
        />
      );
  }
}
