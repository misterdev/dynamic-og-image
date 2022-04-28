import { withOGImage } from "next-api-og-image";
import colorThief from "colorthief";
import fonts from '../../utils/fonts'

const getBgColor = async (image) => {
  let [r,g,b] = await colorThief.getColor(image)
  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  const threeshold = 50;

  if (luma < threeshold) {
    return `rgb(${r + threeshold}, ${g + threeshold}, ${b + threeshold})`;
  } else {
    return `rgb(${r}, ${g}, ${b})`;
  }
};

const getTemplate = async ({
  author,
  details,
  name,
  theme = "dark",
  title,
  logo = "https://og.thcl.dev/images/logo.jpg",
  logoWidth,
  logoHeight = 100,
}) => {
  const bgColor = await getBgColor(logo)
  const styleProps = {
    bgColor,
    theme,
    logo,
    logoHeight,
    logoWidth,
  };
  const doodle = doodles[Math.floor(Math.random() * doodles.length)];

  return `
    <html>
      <head>
        ${getStyle(styleProps, bgColor)}
      </head>
      <body>
        <div id="bg">
          ${doodle}
          <div id="overlay"></div>
          <div id="shadow"></div>
        </div>
        <div id="container">
        <img id="cover" src="${logo}" alt="Favicon" crossorigin="anonymous" />
        <div id="content">
          <svg id="logo" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="m33.834 7.888-13.4 9.7-.115.084L6.677 7.973a4.198 4.198 0 0 0-2.483-.793C2.206 7.18.322 8.507.322 10.463v7.355L.319 39.683c0 1.956 1.884 3.283 3.872 3.283.856 0 1.731-.246 2.483-.794l13.645-9.784c6.79 4.943 13.512 9.784 13.512 9.784a4.198 4.198 0 0 0 2.483.794c1.988 0 4.005-1.327 4.005-3.283V10.314c0-1.956-2.014-3.219-4.002-3.219-.856 0-1.73.246-2.483.793Z" fill="#fff" fill-opacity=".7"/><path fill-rule="evenodd" clip-rule="evenodd" d="m10.307 25.045 10.012 7.343 9.947-7.345-9.947-7.37-10.012 7.372ZM.324 17.792v14.505l9.983-7.252-9.983-7.253Zm29.942 7.251 10.053 7.345V17.672l-10.053 7.37Z" fill="#fff" fill-opacity=".6"/><path fill-rule="evenodd" clip-rule="evenodd" d="M33.652 8.015 20.32 17.672l9.947 7.37 10.053-7.37v-7.358c0-2.796-3.81-4.599-6.667-2.3ZM6.69 7.916C4.189 6.098.328 7.607.328 10.403v7.389l9.98 7.253 10.012-7.373L6.69 7.916ZM99.705 21.26c1.289 0 3.649.624 4.746 2.335v-9.67h3.265v22.137h-3.183v-2.254c-1.152 1.874-3.731 2.472-4.91 2.472-4.226 0-7.216-3.586-7.216-7.497 0-3.64 2.716-7.524 7.298-7.524Zm.411 2.933c-2.661 0-4.39 2.091-4.39 4.59 0 2.499 1.756 4.563 4.39 4.563 2.634 0 4.39-2.064 4.39-4.563 0-2.499-1.756-4.59-4.39-4.59Zm-36.928 3.992H67c5.213 0 7.957-3.096 7.93-6.817 0-3.286-2.14-6.6-7.518-6.6h-7.6v21.294h3.375v-7.876Zm0-10.32h3.923c3.567 0 4.417 1.982 4.39 3.585 0 1.684-1.125 3.64-4.39 3.64h-3.923v-7.226Zm27.49 10.837c0-4.265-3.484-7.47-7.682-7.47-4.252 0-7.764 3.26-7.764 7.524 0 4.291 3.512 7.524 7.737 7.524 4.307 0 7.71-3.287 7.71-7.578Zm-3.32.081c0 2.499-1.7 4.59-4.362 4.59-2.66 0-4.417-2.172-4.417-4.644 0-2.499 1.756-4.536 4.39-4.536 2.661 0 4.39 2.091 4.39 4.59Zm29.961-7.524c-4.363 0-7.682 3.396-7.682 7.524 0 4.264 3.319 7.524 7.627 7.524 3.978 0 6.255-2.526 6.914-4.753l-2.991-.951c-.439 1.113-1.344 2.77-3.868 2.77-2.497 0-4.335-1.928-4.335-4.644 0-2.744 1.92-4.536 4.307-4.536 2.442 0 3.512 1.575 3.841 2.716l2.963-.978c-.631-2.444-3.155-4.672-6.776-4.672Zm15.638 0c1.29 0 3.567.598 4.774 2.39v-2.118h3.237v14.531h-3.237v-2.2c-1.207 1.847-3.677 2.418-4.856 2.418-4.225 0-7.216-3.586-7.216-7.497-.027-3.64 2.716-7.524 7.298-7.524Zm.412 2.934c-2.662 0-4.39 2.091-4.39 4.59 0 2.499 1.756 4.563 4.39 4.563 2.633 0 4.389-2.064 4.389-4.563 0-2.499-1.756-4.59-4.389-4.59Zm12.84 7.198-2.826.706c.192 1.63 1.838 4.21 5.898 4.21 3.896 0 5.734-2.227 5.734-4.509 0-3.178-2.524-4.21-5.267-4.563-1.976-.272-2.881-.625-2.881-1.793 0-.923 1.097-1.575 2.25-1.575 1.838 0 2.634 1.06 2.88 2.037l2.744-.652c-.192-1.44-1.674-3.993-5.542-3.993-3.265 0-5.515 2.146-5.515 4.455 0 3.205 2.387 4.02 5.049 4.454 2.085.326 2.963.68 2.963 1.82 0 1.005-.906 1.684-2.442 1.684-1.674 0-2.799-1.032-3.045-2.281Zm15.665 0c0 1.249.631 1.874 2.25 1.874.302 0 .713-.027 1.317-.109V35.9c-.878.272-1.92.3-2.332.3-2.881 0-4.499-1.114-4.499-4.645v-7.09h-2.854v-2.933h2.854V17.05h3.264v4.482h3.704v2.906h-3.704v6.954Zm7.984 0-2.826.706c.192 1.63 1.866 4.21 5.872 4.21 3.896 0 5.734-2.227 5.734-4.509 0-3.178-2.524-4.21-5.268-4.563-1.975-.272-2.881-.625-2.881-1.793 0-.923 1.098-1.575 2.25-1.575 1.838 0 2.634 1.06 2.881 2.037l2.771-.652c-.192-1.44-1.674-3.993-5.542-3.993-3.265 0-5.515 2.146-5.515 4.455 0 3.205 2.387 4.02 5.048 4.454 2.085.326 2.963.68 2.963 1.82 0 1.005-.905 1.684-2.441 1.684-1.674 0-2.799-1.032-3.046-2.281Z" fill="#fff"/></svg>
          <div id="title">${title}</div>
          <div id="podcast">${name}</div>
          <div id="details">${details}</div>
        </div>
      </body>
    </html>
  `;
};


export default withOGImage({
  contentType: "image/jpeg",
  width: 1200,
  height: 630,
  template: {
    html: getTemplate,
  },
  dev: {
    // Whether to replace binary data (image/screenshot) with HTML
    // that can be debugged in Developer Tools
    inspectHtml: false,
  },
});

const doodles = [
  `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g clip-path="url(#a)"><path d="M0 0h1200v630H0z"/><path fill="url(#b)" fill-opacity=".02" d="M0 0h1200v630H0z"/><path opacity=".1" d="M1070.99 289.523c-29.53 31.584-68.89 60.077-113.81 70.015-23.872 5.282-47.586.3-60.331-15.981-13.122-16.762-10.434-38.43-6.025-59.169 5.8-27.286 32.767-97.09-14.474-102.412-18.268-2.057-41.546 9.2-57.334 18.465-25.895 15.195-46.952 34.8-64.702 56.757-33.214 41.085-58.966 89.977-101.751 125.243-18.489 15.239-40.42 29.101-64.34 24.155-16.362-3.383-20.43-17.619-24.42-30.328-6.234-19.856 1.72-40.781 6.547-61.775 6.474-28.156 45.571-99.896-17.133-92.769-36.276 4.124-122.683 77.076-193.144 214.312-45.451 88.523-67.975 353.879 46.292 336.309 126.989-19.526 156.09-694.984-452.178-85.746M1144.9 199.21C1209.33 97.562 1247.46-32.777 1246.22-87" stroke="#000" stroke-width="105.64" stroke-linecap="round"/></g><defs><clipPath id="a"><path d="M0 0h1200v630H0z"/></clipPath><pattern id="b" patternContentUnits="objectBoundingBox" width=".059" height=".112"><use xlink:href="#c" transform="scale(.00092 .00175)"/></pattern></defs></svg>`,
  `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g clip-path="url(#a)"><path d="M0 0h1200v630H0z"/><path fill="url(#b)" fill-opacity=".02" d="M0 0h1200v630H0z"/><path opacity=".1" d="M1354.44 501.387c-143.4-333.563-459.959-197.527-633.998-134.223-273.828 99.601-436.698 47.825-360.531-128.094 41.029-94.762 149.772-74.671 136.156 17.598C474.122 405.39-2.833 479.701-158 271.568" stroke="#000" stroke-width="105.64" stroke-linecap="round"/></g><defs><clipPath id="a"><path d="M0 0h1200v630H0z"/></clipPath><pattern id="b" patternContentUnits="objectBoundingBox" width=".059" height=".112"><use xlink:href="#c" transform="scale(.00092 .00175)"/></pattern></defs></svg>`,
  `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g clip-path="url(#a)"><path d="M0 0h1200v630H0z"/><path fill="url(#b)" fill-opacity=".02" d="M0 0h1200v630H0z"/><path opacity=".1" d="M2563.25 18.814c-77.01-53.962-221.33-70.047-330.66-47.134-109.33 22.913-13.04 179.663-214.62 206.588-201.58 26.925-168.99-181.734-452.13-141.337-283.14 40.397 37.63 243.738-233.53 302.244-179.8 38.796-216.79-291.144-416.292-230.229-151.012 46.11 30.731 317.229-174.511 378.109-161 47.757-252.487-214.774-435.001-184.5-68.602 11.38-92.697 51.93-105.213 100M-295.694 522.82c219.373-41.069 146.728 130.229 379.666 82.277 39.035-8.035 83.035-56.042 92.535-90.042" stroke="#000" stroke-width="105.64" stroke-linecap="round"/></g><defs><clipPath id="a"><path d="M0 0h1200v630H0z"/></clipPath><pattern id="b" patternContentUnits="objectBoundingBox" width=".059" height=".112"><use xlink:href="#c" transform="scale(.00092 .00175)"/></pattern></defs></svg>`,
  `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g clip-path="url(#a)"><path d="M0 0h1200v630H0z"/><path fill="url(#b)" fill-opacity=".02" d="M0 0h1200v630H0z"/><path opacity=".1" d="M945.948 567.411c-42.861 5.738-91.366 2.865-132.423-17.888-21.821-11.03-37.018-29.903-36.572-50.574.46-21.282 16.262-36.35 32.807-49.608 21.768-17.445 86.843-54.391 53.652-88.426-12.835-13.161-37.98-19.19-56.066-22.018-29.663-4.638-58.375-2.8-86.017 2.953-51.723 10.764-102.615 32.295-158.061 32.494-23.959.086-49.711-3.075-65.091-22.05-10.521-12.98-4.654-26.574.307-38.937 7.749-19.314 27.156-30.472 44.186-43.663 22.841-17.691 98.53-48.454 45.488-82.647-30.686-19.781-143.757-18.04-285.197 43.551-91.235 39.729-276.708 230.832-177.147 289.595C236.461 585.5 686.728 81.17-169.841 167.482M1060.33 544.315c114.24-37.867 226.3-114.589 259.67-157.339" stroke="#000" stroke-width="105.64" stroke-linecap="round"/></g><defs><clipPath id="a"><path d="M0 0h1200v630H0z"/></clipPath><pattern id="b" patternContentUnits="objectBoundingBox" width=".059" height=".112"><use xlink:href="#c" transform="scale(.00092 .00175)"/></pattern></defs></svg>`,
  `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g clip-path="url(#a)"><path d="M0 0h1200v630H0z"/><path fill="url(#b)" fill-opacity=".02" d="M0 0h1200v630H0z"/><path d="M998.785 550.186C862.774 748.921 658.098 758.824 541.234 670.351c-116.865-88.473-126.108-264.869 47.537-293.81 186.19-31.032 296.452-47.538 296.452-154.499 0-112.191-157.799-157.894-415.957-97.716-195.433 45.557-588.94 272.682-649.683 594.223-40.412 213.92 316.919 93.095 369.739-223.824C242.142 177.806-37.143 47.738-243.141 47.737M1078.01 424.079c163.75-227.785 536.13-274.664 608.09 40.935" opacity=".1" stroke="#000" stroke-width="105.64" stroke-linecap="round"/></g><defs><clipPath id="a"><path d="M0 0h1200v630H0z"/></clipPath><pattern id="b" patternContentUnits="objectBoundingBox" width=".059" height=".112"><use xlink:href="#c" transform="scale(.00092 .00175)"/></pattern></defs></svg>`,
  `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g clip-path="url(#a)"><path d="M0 0h1200v630H0z"/><path fill="url(#b)" fill-opacity=".02" d="M0 0h1200v630H0z"/><path d="M-243 405.473c306.5-127.5 378.5-155 526.5-189.5s186 24 189.5 58.5c4.817 47.481-24.457 87.359-103.5 131-86 47.481-127 120.981-86 176.481s172 50.019 299.5-18.481m94.5-55.519c186.5-89.5 387-336.5 290-459-66.118-83.5-206-22.5-176.5 86 45.309 166.647 245 82.5 350.5 56" opacity=".1" stroke="#000" stroke-width="105.64" stroke-linecap="round"/></g><defs><clipPath id="a"><path d="M0 0h1200v630H0z"/></clipPath><pattern id="b" patternContentUnits="objectBoundingBox" width=".059" height=".112"><use xlink:href="#c" transform="scale(.00092 .00175)"/></pattern></defs></svg>`,
];

console.log(process.cwd())
const getStyle = (
  query, //: Record<keyof typeof GeneralQueryEnum, string | string[]>

) => `
<style>
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ${fonts}
  html, body {
    width: 1200px;
    height: 630px;
    overflow: hidden;
  }
  #container {
    // width: 100vw;
    // height: 100vh;
    width: 1200px;
    height: 630px;
    display: flex;
    // flex-direction: column;
    // justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 5rem;
    z-index: 1;
  }
  #bg {
    width: 1200px;
    height: 630px;
    position: absolute;
    // filter: brightness(50%);
    z-index: -1;
    background-color: ${query.bgColor};
  }
  #overlay {
    width: 1200px;
    height: 630px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(287.14deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.25) 98.21%)
  }
  #shadow {
    position: absolute;
    width: 261.26px;
    height: 274.21px;
    left: 116.56px;
    top: 246.88px;

    background: rgba(0, 0, 0, 8);
    filter: blur(91px);
  }
  #logo {
    width: 178px;
    height: 50px;
  }
  #cover {
    width: 325px;
    height: 325px;
    border-radius: 16px;
  }
  #content {
    display: flex;
    flex-direction: column;
    margin-left: 60px;
    align-items: flex-start;
  }
  #title {
    font-family: 'Gordita';
    font-style: normal;
    font-weight: 600;
    font-size: 47px;
    line-height: 62px;
    text-align: left;
    color: #FFFFFF;
    margin: 10px 0px;
    
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical; 
    overflow: hidden; 
  }
  #podcast {
    font-family: 'sf_pro';
    font-style: normal;
    font-weight: 600;
    font-size: 25px;
    line-height: 29px;
    color: #FFFFFF;
    opacity: 0.5;
    margin: 10px 0px;
  }
  #details {
    font-family: 'sf_pro';
    font-style: normal;
    font-weight: 100;
    font-size: 20px;
    line-height: 35px;
    color: #FFFFFF;    
    opacity: 0.5;
    margin: 10px 0px;
  }
</style>
`;


// const img = document.getElementById("cover");

// if (img.complete) {
//   setBgColor(colorThief.getColor(img));
// } else {
//   img.addEventListener("load", function () {
//     setBgColor(colorThief.getColor(img));
//   });
// }

// http://localhost:3000/api/basic?title=Will%20Banning%20Russian%20Oil%20Hurt%20Russia%2C%20or%20the%20U.S.%3F&name=The%20Daily&details=Wednesday%2C%209%20Mar%202022%20-%2023min&author=The%20New%20York%20Times&logo=https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/1c/ac/04/1cac0421-4483-ff09-4f80-19710d9feda4/mza_12421371692158516891.jpeg/600x600bb.jpg
// http://localhost:3000/api/basic?title=Broken%20Chains&name=The%20Daily%20American&details=Wednesday%2C%208%20Dec%202021%20-%2031min&author=Dan%20The%20Man&logo=https%3A%2F%2Fis4-ssl.mzstatic.com%2Fimage%2Fthumb%2FPodcasts125%2Fv4%2F0e%2F5d%2Fe6%2F0e5de637-cd26-27ca-cf10-044213e02e4e%2Fmza_16193323601993112215.jpg%2F600x600bb.jpg
