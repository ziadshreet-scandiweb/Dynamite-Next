import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";

interface Country {
  countryName: string;
  flagIcon: string;
}

interface CountryModalProps {
  isOpen: boolean;
  onClose: () => void;
  countries: Country[];
  countrySwitchHeading: string;
}

const CountryModal: React.FC<CountryModalProps> = ({
  isOpen,
  onClose,
  countries,
  countrySwitchHeading,
}) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modalContent = document.querySelector(`.${styles.modalContent}`);
      if (modalContent && !modalContent.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.modal} ${styles.modalWrapper}`}>
      <div className={styles.modalContent}>
        <div className={styles.countryTitle}>
          <h2>{countrySwitchHeading}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </div>
        {countries.map((country, index) => (
          <div
            className={styles.country}
            key={index}
            onClick={() => console.log(country.countryName)}
          >
            <Image
              aria-hidden
              src={"http://scandiweb-optimizely.runasp.net" + country.flagIcon}
              alt="Flag icon"
              width={20}
              height={20}
            />
            {country.countryName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryModal;
