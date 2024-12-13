"use client";

import Image from "next/image";
import styles from "./page.module.css";
import CountryModal from "./CountryModal";
import { useState } from "react";

interface HeroBannerDto {
  __typename: "HeroBannerDto";
  name: string;
  buttonText: string;
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
  countrySwitch: Array<{
    countryName: string;
    flagIcon: string;
  }>;
}

type HeroBannerDtoType = HeroBannerDto;
type HeaderBannerDtoType = HeaderBannerDto;
type MainContentType = HeroBannerDtoType | HeaderBannerDtoType;

interface LandingPageProps {
  mainContent: MainContentType[];
}

const LandingPage = ({ mainContent }: LandingPageProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {mainContent.map((item, index) => (
          <div key={index}>
            {item.__typename === "HeroBannerDto" && (
              <div>
                <h1>{item.name}</h1>
                <h1>{item.buttonText}</h1>
              </div>
            )}
          </div>
        ))}
      </main>
      <nav className={styles.nav}>
        {mainContent.map((item, index) => {
          if (item.__typename === "HeaderBannerDto") {
            return (
              <div key={index} className={styles.headerBanner}>
                <div className={styles.bannerText}>
                  <Image
                    src={
                      "http://scandiweb-optimizely.runasp.net" + item.garageLogo
                    }
                    alt={item.garageAltText}
                    width={40}
                    height={40}
                  />
                  <Image
                    src={
                      "http://scandiweb-optimizely.runasp.net" +
                      item.dynamiteLogo
                    }
                    alt={item.dynamiteAltText}
                    width={40}
                    height={40}
                  />
                </div>
                <div className={styles.ctaText}>
                  <a href={item.ctaUrl} className={styles.ctaButton}>
                    <h4>{item.text || "Start Saving"}</h4>
                  </a>
                </div>
                <div className={styles.countrySwitch}>
                  <button
                    onClick={() => setModalOpen(true)}
                    className={styles.modalButton}
                  >
                    <Image
                      aria-hidden
                      src={
                        "http://scandiweb-optimizely.runasp.net" +
                        item.countrySwitch[0].flagIcon
                      }
                      alt="Window icon"
                      width={16}
                      height={16}
                    />
                  </button>
                  <CountryModal
                    isOpen={modalOpen}
                    countrySwitchHeading={item.countrySwitchHeading}
                    onClose={() => setModalOpen(false)}
                    countries={item.countrySwitch}
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
      </nav>

      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
};

export default LandingPage;
