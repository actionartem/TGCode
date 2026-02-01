/** @type {import('next').NextConfig} */
const nextConfig = {
  // ВАЖНО для GitHub Pages: включает static export в папку /out
  output: "export",

  // Чтобы роуты корректно работали как статические файлы (/about/index.html)
  trailingSlash: true,

  // Если сайт будет НЕ на отдельном домене, а на https://user.github.io/repo/
  // тогда нужно раскомментировать basePath/assetPrefix и указать имя репозитория.
  // basePath: "/TGCode",
  // assetPrefix: "/TGCode/",

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
