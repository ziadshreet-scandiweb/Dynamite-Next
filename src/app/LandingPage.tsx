"use client";

import Image from "next/image";
import styles from "./page.module.css";
import CountryModal from "./CountryModal";
import { useState } from "react";

// Interfaces for content types
interface HeroBannerDto {
  __typename: "HeroBannerDto";
  name: string;
  buttonText: string;
  desktopImage: string | null; // Assuming the type for images
  mobileImage: string | null;
  texts: Array<{
    fontSize: string;
    text: string;
    color: string;
  }>;
}

interface HeaderBannerDto {
  __typename: "HeaderBannerDto";
  garageLogo: string;
  garageAltText: string;
  dynamiteLogo: string;
  dynamiteAltText: string;
  ctaUrl: string;
  text?: string;
  countrySwitchHeading: string;
  countrySwitch: Array<{ countryName: string; flagIcon: string }>;
}

interface MainNavigationItemDto {
  level: string;
  label: string;
  url: string;
  seoAltText?: string;
  column1?: Array<{ level: string; label: string; url: string }>;
  column2?: Array<{ level: string; label: string; url: string }>;
  column3?: Array<{ level: string; label: string; url: string }>;
  column4?: Array<{ level: string; label: string; url: string }>;
  bannerSet?: Array<{
    label: string;
    banners: Array<{
      label: string;
      image: string;
      url: string;
      seoAltText?: string;
      text: string;
      textColor: string;
    }>;
  }>;
}

interface MainNavigationDto {
  __typename: "MainNavigationDto";
  topLevelLinks: MainNavigationItemDto[];
}

interface FooterEmailBlock {
  footerEmail: string;
  footerEmailButtonText: string;
  footerEmailButtonColor: string;
  footerEmailButtonTextColor: string;
  footerEmailPrivacyCallout: string;
}

interface FooterColumn {
  text: string;
  link: string;
  color: string;
  fontSize: string;
}

interface FooterContainerBlock {
  footerColumn1Text: FooterColumn[];
  footerColumn2Text: FooterColumn[];
  footerColumn3Text: FooterColumn[];
  footerColumn4Text: FooterColumn[];
}

interface FooterBottomBlock {
  footerBottomSocialLinksImage: Array<{ image: string; link: string }>;
  footerBottomText: string;
  footerBottomTextLinks: Array<{ link: string; text: string; color: string; fontSize: string }>;
  footerBottomButtonText: string;
  footerBottomButtonLink: string;
  footerBottomButtonColor: string;
  footerBottomButtonPosition: string;
  footerBottomButtonTextColor: string;
}

interface FooterDto {
  __typename: "FooterDto";
  footerEmailBlock: FooterEmailBlock;
  footerContainerBlock: FooterContainerBlock;
  footerBottomBlock: FooterBottomBlock;
}
interface CategoriesDto {
  __typename: "CategoriesDto";
  name: string;
  identifier: string;
  desktopImages: Array<{
    image: string;
    desktopImageAltText: string | null;
    buttonText: string;
    buttonColor: string;
    buttonTextColor: string;
  }>;
}


// Combine content types
type MainContentType =
  | HeroBannerDto
  | HeaderBannerDto
  | MainNavigationDto
  | FooterDto
  | CategoriesDto;


interface LandingPageProps {
  mainContent: MainContentType[];
}

const LandingPage = ({ mainContent }: LandingPageProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const headerBanner = mainContent.find(
    (item) => item.__typename === "HeaderBannerDto"
  ) as HeaderBannerDto;

  const mainNavigation = mainContent.find(
    (item) => item.__typename === "MainNavigationDto"
  ) as MainNavigationDto;

  const footerData = mainContent.find(
    (item) => item.__typename === "FooterDto"
  ) as FooterDto;

  const heroBanner = mainContent.filter(
    (item) => item.__typename === "HeroBannerDto"
  ) as HeroBannerDto[]
  const categoriesData = mainContent.filter(
    (item) => item.__typename === "CategoriesDto"
  ) as CategoriesDto[];
  
  const handleMenuClick = (index: number) => {
    setActiveMenu(index === activeMenu ? null : index);
  };


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Header Banner */}
        {headerBanner && (
          <div className={styles.headerBanner}>
            <div className={styles.bannerText}>
              <Image
                src={`http://scandiweb-optimizely.runasp.net${headerBanner.garageLogo}`}
                alt={headerBanner.garageAltText}
                width={40}
                height={40}
              />
              <Image
                src={`http://scandiweb-optimizely.runasp.net${headerBanner.dynamiteLogo}`}
                alt={headerBanner.dynamiteAltText}
                width={40}
                height={40}
              />
            </div>
            <div className={styles.ctaText}>
              <a href={headerBanner.ctaUrl} className={styles.ctaButton}>
                <h4 style={{ color: 'black' }}>{headerBanner.text || "Start Saving"}</h4>
              </a>
            </div>
            <div className={styles.countrySwitch}>
              <button
                onClick={() => setModalOpen(true)}
                className={styles.modalButton}
              >
                <Image
                  aria-hidden
                  src={`http://scandiweb-optimizely.runasp.net${headerBanner.countrySwitch[0].flagIcon}`}
                  alt="Country Switch"
                  width={16}
                  height={16}
                />
              </button>
              <CountryModal
                isOpen={modalOpen}
                countrySwitchHeading={headerBanner.countrySwitchHeading}
                onClose={() => setModalOpen(false)}
                countries={headerBanner.countrySwitch}
              />
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        {mainNavigation && (
          <nav className={styles.navigationMenu}>
            <div className={styles.logo}>
              <a href="/">GARAGE</a>
            </div>
            <ul className={styles.menu}>
              {mainNavigation.topLevelLinks.map((item, index) => (
                <li
                  key={index}
                  className={styles.menuItem}
                  onMouseEnter={() => handleMenuClick(index)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <a
                    href={item.url}
                    className="level-1"
                  >
                    {item.label}
                    {((item.column1 && item.column1.length > 0) ||
                      (item.column2 && item.column2.length > 0) ||
                      (item.column3 && item.column3.length > 0) ||
                      (item.column4 && item.column4.length > 0) ||
                      (item.bannerSet && item.bannerSet.length > 0)) && (
                        <i className="fas fa-chevron-down"></i>
                      )}
                  </a>
                  {activeMenu === index && (
                    <div
                      className={styles.submenu}
                      style={{
                        display: "flex",
                      }}
                    >
                      {[item.column1, item.column2, item.column3, item.column4].map(
                        (column, colIndex) => column && (
                          <div key={colIndex} className={styles.column}>
                            {column && column.map((subItem, subIndex) => (
                              <a
                                key={subIndex}
                                href={subItem.url}
                                className={
                                  subItem.level === "1st"
                                    ? styles.level1
                                    : subItem.level === "2nd"
                                      ? styles.level2
                                      : styles.level3
                                }
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      {item.bannerSet && item.bannerSet.map((bannerSet, bSetIndex) => (
                        <div key={bSetIndex} className={styles.banners}>
                          {bannerSet.banners && bannerSet.banners.map((banner, bIndex) => (
                            <a key={bIndex} href={banner.url}>
                              <Image src={`http://scandiweb-optimizely.runasp.net${banner.image}`} alt={banner.seoAltText || ''} width={200} height={250} />
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.icons}>
              <a href="#">
                <Image
                  src="/images/profile.svg" 
                  alt="Description of the image"
                  width={20}
                  height={20}
                />
              </a>
              <a href="#">
                <Image
                  src="/images/search.svg" 
                  alt="Description of the image"
                  width={20}
                  height={20}
                />
              </a>
              <a href="#">
                <Image
                  src="/images/heart.svg" 
                  alt="Description of the image"
                  width={20}
                  height={20}
                />
              </a>
              <a href="#">
                <Image
                  src="/images/bag.svg" 
                  alt="Description of the image"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </nav>
        )}

        {/* Hero Banners */}
{heroBanner.map((item, index) => (
  <div key={index} className={styles.heroBanner}>
    <img
      src={`http://scandiweb-optimizely.runasp.net${item.mobileImage}`} //wdadawd
      alt={item.name}
    />
    <div className={styles.heroContent}>
    {item.texts && (
  <div>
    {/* First paragraph alone */}
    <p className="firstParagraph"style={{
      fontSize: '1.997vw',     
      textAlign: 'center',     
      lineHeight: '1',          
      margin: '0',               
      fontWeight: 'bold'         
    }}>
      <span>{item.texts[0].text}</span>
    </p>
    {/* Second and Third paragraphs on the same line */}
    <div className="inlineParagraphs" >
      <img src="/images/soft.webp" width="600px"></img>
    </div>
  </div>
)}

      <button id="hero_button">
        {item.buttonText}
      </button>
    </div>
  </div>
))}
{/* Categories Section */}
{categoriesData.map((category, index) => (
  <div key={index} className={styles.categoriesSection}>
    <div className={styles.categoryContainer}>
      {category.desktopImages.map((imageData, imgIndex) => (
        <div
          key={imgIndex}
          className={styles.categoryCard}
          style={{
            backgroundImage: `url(http://scandiweb-optimizely.runasp.net${imageData.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`${styles.categoryContent} ${
              imgIndex === 0 ? styles.leftButton : styles.rightButton
            }`}
          >
            <button
              className={styles.categoryButton}
              style={{
                backgroundColor: imageData.buttonColor,
                color: imageData.buttonTextColor,
              }}
            >
              {imageData.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
))}



</main>

    {/* Footer */}
{footerData && (
  <footer className={styles.footerMenu}>
    {/* Footer Email Block */}
    {footerData.footerEmailBlock && (
      <div className={styles.footerTop}>
        <p>{footerData.footerEmailBlock.footerEmail}</p>
        <div className={styles.emailSubscription}>
          <input type="email" placeholder="Enter your email" />
          <button
            style={{
              backgroundColor: footerData.footerEmailBlock.footerEmailButtonColor,
              color: footerData.footerEmailBlock.footerEmailButtonTextColor,
            }}
          >
            {footerData.footerEmailBlock.footerEmailButtonText}
          </button>
        </div>
      </div>
    )}

    {/* Footer Columns */}
    {footerData.footerContainerBlock && (
      <div className={styles.footerMiddle}>
        {[footerData.footerContainerBlock.footerColumn1Text,
          footerData.footerContainerBlock.footerColumn2Text,
          footerData.footerContainerBlock.footerColumn3Text,
          footerData.footerContainerBlock.footerColumn4Text].map((column, colIndex) => (
            <div key={colIndex} className={styles.footerColumn}>
              {column && column.map((item, itemIndex) => (
                <a
                  key={itemIndex}
                  href={item.link}
                  style={{ color: item.color, fontSize: item.fontSize }}
                >
                  {item.text}
                </a>
              ))}
            </div>
          ))}
      </div>
    )}

    {/* Footer Bottom Block */}
    <div className={styles.lastPartFooter}>
      {footerData.footerBottomBlock.footerBottomSocialLinksImage && (
        <div className={styles.socialIcons}>
          {footerData.footerBottomBlock.footerBottomSocialLinksImage.map((socialLink, socialIndex) => (
            <a key={socialIndex} href={socialLink.link} className={styles.socialImage}>
              <img src={`http://scandiweb-optimizely.runasp.net${socialLink.image}`}  alt="Social Icon" />
            </a>
          ))}
        </div>
      )}

      {footerData.footerBottomBlock.footerBottomTextLinks && (
        <div className={styles.additionalFooterLinks}>
          {footerData.footerBottomBlock.footerBottomTextLinks.map((link, linkIndex) => (
            <a
              key={linkIndex}
              href={link.link}
              style={{ color: "white", fontSize: link.fontSize }}
            >
              {link.text}
            </a>
          ))}
        </div>
      )}
    </div>
  </footer>
)}
    </div>
  );
};

export default LandingPage;

