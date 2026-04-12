export default ({ title, name, children }, { icon }) => {
  const pageTitle = title
    ? `${title} - The Godzilla Cineaste`
    : name
    ? `${name} - The Godzilla Cineaste`
    : "The Godzilla Cineaste";

  return (
    <>
      {{ __html: "<!DOCTYPE html>" }}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>{pageTitle}</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
          <div class="flex flex-col h-screen justify-between">
            <div>
              <header class="px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between py-3 text-sm">
                  <div class="flex items-baseline gap-6">
                    <a href="/">
                      <span class="font-content text-red-700 hover:underline">
                        godzillacineaste.net
                      </span>
                    </a>
                    <a href="/about">
                      <span class="font-content text-red-700 hover:underline">
                        about
                      </span>
                    </a>
                    <a href="/films">
                      <span class="font-content text-red-700 hover:underline">
                        films
                      </span>
                    </a>
                    <a href="/people">
                      <span class="font-content text-red-700 hover:underline">
                        people
                      </span>
                    </a>
                  </div>
                </div>
              </header>
              <main class="px-4 py-10 sm:px-6 lg:px-8">
                <div class="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
              </main>
            </div>
            <footer class="px-4 sm:px-6 lg:px-8 py-9">
              <div class="w-fit m-auto font-content text-sm text-center tracking-wider text-gray-500">
                <p>Est. 2016</p>
                <p>James Tortorelli</p>
                <p class="font-detail text-xs pb-2">@jingowestern</p>

                <p>
                  <a
                    href="https://x.com/jingowestern"
                    class="inline-block align-middle text-gray-500 [&_svg]:inline [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-gray-500 [&_path]:fill-gray-500"
                  >
                    <img src={icon("x", "simpleicons")} inline />
                  </a>
                  &nbsp;&nbsp;
                  <a
                    href="https://www.youtube.com/@jingowestern"
                    class="inline-block align-middle text-red-500 [&_svg]:inline [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-red-500 [&_path]:fill-red-500"
                  >
                    <img src={icon("youtube", "simpleicons")} inline />
                  </a>
                  &nbsp;&nbsp;
                  <a
                    href="https://rumble.com/c/c-7743057"
                    class="inline-block align-middle text-green-500 [&_svg]:inline [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-green-500 [&_path]:fill-green-500"
                  >
                    <img src={icon("rumble", "simpleicons")} inline />
                  </a>
                  &nbsp;&nbsp;
                  <a
                    href="https://odysee.com/@jingowestern:3"
                    class="inline-block align-middle text-orange-500 [&_svg]:inline [&_svg]:h-4 [&_svg]:w-4 [&_svg]:fill-orange-500 [&_path]:fill-orange-500"
                  >
                    <img src={icon("odysee", "simpleicons")} inline />
                  </a>
                </p>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </>
  );
};
