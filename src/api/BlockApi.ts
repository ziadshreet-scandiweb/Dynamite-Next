export async function fetchMainContent() {
  const url = process.env.GRAPHQL_API_URL as string;

  if (!url) {
    throw new Error(
      "GRAPHQL_API_URL is not defined in the environment variables"
    );
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
          query {
            startPage {
              mainContent {
                __typename
                  ...on HeaderBannerDto {
                  countrySwitchHeading
                  countrySwitch {
                    flagIcon
                    countryName
                    link
                  }
                  text
                  ctaUrl
                  garageLogo
                  garageAltText
                  garageURL
                  dynamiteLogo
                  dynamiteAltText
                  dynamiteUrl
                }
                ... on HeroBannerDto {
                  buttonText
                  identifier
                  desktopImage
                  mobileImage
                  name
                  texts {
                    fontSize
                    text
                    color
                  }            
                }
              }
            }
          }
        `,
    }),
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const { data } = await response.json();

  return data.startPage.mainContent;
}
