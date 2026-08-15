const RATING_LABELS = {
  1: "bad",
  2: "okay",
  3: "good",
  4: "great",
};

const RATING_LABEL_CLASSES = {
  1: "bg-red-100 text-red-700",
  2: "bg-orange-100 text-orange-700",
  3: "bg-blue-100 text-blue-700",
  4: "bg-green-100 text-green-700",
};

export default function ({ star_rating, show_label }, { icon }) {
  const n = Math.min(
    4,
    Math.max(0, Number(star_rating) || 0),
  );

  return (
    <div class="text-center w-fit m-auto">
      <div class="flex justify-center pt-1 gap-0.5">
        {Array.from({ length: 4 }, (_, i) => {
          const filled = i < n;
          return (
            <img
              key={i}
              class="inline h-6 w-6 text-amber-500"
              src={icon("star", "tabler", filled ? "filled" : "outline")}
              inline
            />
          );
        })}
      </div>
      {show_label && n > 0 && (
        <div class="pt-2">
          <span
            class={`badge badge-sm font-detail uppercase ${RATING_LABEL_CLASSES[n]}`}
          >
            {RATING_LABELS[n]}
          </span>
        </div>
      )}
    </div>
  );
}
