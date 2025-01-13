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
      ... on HeaderBannerDto {
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
        desktopImageSingle: desktopImage
        mobileImage
        name
        texts {
          fontSize
          text
          color
        }
      }
      ... on MainNavigationDto {
        topLevelLinks {
          __typename
          ... on MainNavigationItemDto {
            level
            label
            url
            seoAltText
            bannerSet {
              __typename
              ... on BannerSetDto {
                label
                banners {
                  __typename
                  ... on BannerSetItemtDto {
                    label
                    image
                    url
                    seoAltText
                    text
                    textColor
                  }
                }
              }
            }
            column1 {
              __typename
              ... on MainNavigationItemDto {
                level
                label
                url
              }
            }
            column2 {
              __typename
              ... on MainNavigationItemDto {
                level
                label
                url
              }
            }
            column3 {
              __typename
              ... on MainNavigationItemDto {
                level
                label
                url
              }
            }
            column4 {
              __typename
              ... on MainNavigationItemDto {
                level
                label
                url
              }
            }
          }
        }
      }
      ... on CategoriesDto {
        name
        identifier
        desktopImages: desktopImage {
          image
          desktopImageAltText
          buttonText
          buttonColor
          buttonTextColor
        }
      }
      ... on FooterDto {
        footerEmailBlock {
          footerEmail
          footerEmailButtonText
          footerEmailButtonColor
          footerEmailButtonTextColor
          footerEmailPrivacyCallout
        }
        footerContainerBlock {
          footerColumn1Text {
            text
            link
            color
            fontSize
          }
          footerColumn2Text {
            text
            link
            color
            fontSize
          }
          footerColumn3Text {
            text
            link
            color
            fontSize
          }
          footerColumn4Text {
            text
            link
            color
            fontSize
          }
        }
        footerBottomBlock {
          footerBottomSocialLinksImage {
            image
            link
          }
          footerBottomText
          footerBottomTextLinks {
            link
            text
            color
            fontSize
          }
          footerBottomButtonText
          footerBottomButtonLink
          footerBottomButtonColor
          footerBottomButtonPosition
          footerBottomButtonTextColor
        }
      }
      ... on SliderDto {
        text
        identifier
        button {
          text
          color
          link
          position
          textColor
        }
        image {
          image
          imageAltText
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
