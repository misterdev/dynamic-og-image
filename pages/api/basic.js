import { withOGImage } from "next-api-og-image";

// export enum GeneralQueryEnum {
//   'logo',
//   'details',
//   'name',
//   'theme',
//   'title',
//   'logoWidth',
//   'logoHeight',
// }

export default withOGImage({
  contentType: "image/png",
  width: 1200,
  height: 630,
  template: {
    html: async ({
      author,
      details,
      name,
      theme = "dark",
      title,
      logo = "https://og.thcl.dev/images/logo.jpg",
      logoWidth,
      logoHeight = 100,
    }) => {
      const styleProps = {
        theme,
        logo,
        logoHeight,
        logoWidth,
      };
      return `
        <html>
          <head>
            ${getStyle(styleProps)}
          </head>
          <body>
            <div class="container">
              <img src="${logo}" alt="Favicon" />
              <h3>${name} - ${author}</h3>
              <h1>${title}</h1>
              <p class="details">${details}</p>
            </div>
          </body>
        </html>
      `;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStyle = (
  query //: Record<keyof typeof GeneralQueryEnum, string | string[]>
) => `
<style>
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100 900;
    font-display: optional;
    src: url('/fonts/inter-var-latin.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  body {
    font-family: 'Inter', sans-serif;
  }
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${query.theme === "dark" ? "#222" : "#fff"};
    color: ${query.theme === "dark" ? "white" : "black"};
    text-align: center;
    padding: 0 5rem;
  }
  img {
    width: ${query.logoWidth}px;
    ${query.logoHeight && `height: ${query.logoHeight}px`}
  }
  h1 {
    font-size: 3.5rem;
    line-height: 1.1;
    margin-top: 1rem;
  }
  h3 {
    margin-top: 1.5rem;
    color: ${query.theme === "dark" ? "#E5E7EB" : "#374151"};
    font-size: 1.8rem;
    font-weight: 400;
  }
  
  .details {
    font-size: 1.2rem;
    margin-top: 1rem;
    color: ${query.theme === "dark" ? "#D1D5DB" : "#1F2937"};
    font-weight: 400;
  }
</style>
`;

// http://localhost:3000/api/basic?title=Will%20Banning%20Russian%20Oil%20Hurt%20Russia%2C%20or%20the%20U.S.%3F&name=The%20Daily&details=Wednesday%2C%209%20Mar%202022%20-%2023min&author=The%20New%20York%20Times&logo=https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/1c/ac/04/1cac0421-4483-ff09-4f80-19710d9feda4/mza_12421371692158516891.jpeg/600x600bb.jpg
// http://localhost:3000/api/basic?title=Broken%20Chains&name=The%20Daily%20American&details=Wednesday%2C%208%20Dec%202021%20-%2031min&author=Dan%20The%20Man&logo=https%3A%2F%2Fis4-ssl.mzstatic.com%2Fimage%2Fthumb%2FPodcasts125%2Fv4%2F0e%2F5d%2Fe6%2F0e5de637-cd26-27ca-cf10-044213e02e4e%2Fmza_16193323601993112215.jpg%2F600x600bb.jpg 
