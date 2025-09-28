export default function ({
  comp,
  name,
  subtitle,
  alias,
  domain,
  history,
  isbn,
  author,
  works,
  image_url,
  resource_url,
}) {
  return (
    <div class="p-5">
      {image_url && (
        <div class="lg:h-[150px] flex lg:items-center justify-center">
          <div>
            <comp.maybe_link_url resource_url={resource_url}>
              <img class="max-w-[150px] max-h-[150px]" src={image_url} />
            </comp.maybe_link_url>
          </div>
        </div>
      )}

      <div class="text-center">
        <div class="font-content text-gray-700">
          <comp.maybe_link_url resource_url={resource_url}>
            {name}
          </comp.maybe_link_url>
        </div>

        {subtitle && (
          <div class="font-content text-gray-700 text-sm">{subtitle}</div>
        )}

        {alias && (
          <div class="font-content text-sm text-gray-500">aka {alias}</div>
        )}

        {domain && (
          <div class="font-detail text-red-500 text-xs">
            <comp.maybe_link_url resource_url={resource_url}>
              {domain}
            </comp.maybe_link_url>
          </div>
        )}

        {history && (
          <div class="font-content text-sm text-gray-700">{history}</div>
        )}

        {isbn && (
          <div class="font-detail text-red-500 text-xs">ISBN: {isbn}</div>
        )}

        {author && (
          <div class="font-content text-sm text-gray-700">{author}</div>
        )}

        {works && <div class="font-content text-sm text-gray-500">{works}</div>}
      </div>
    </div>
  );
}
