import styles from "@/styles/style.module.scss";
import { useEffect, useRef } from "react";
import Glide from "@glidejs/glide";
import Link from "next/link";
import Image from "next/image";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";

export default function Hero() {
  const glide = useRef();
  useEffect(() => {
    new Glide(glide.current, {
      type: "carousel",
      startAt: 0,
      autoplay: 3000,
      gap: 0,
      hoverpause: true,
      perView: 1,
      animationDuration: 800,
      animationTimingFunc: "linear",
    }).mount();
  }, []);

  const {
    hero,
    hero__left,
    hero__container,
    hero__center,
    hero__right,
    button,
    hero__arrow,
    hero__img,
    container,
  } = styles;
  const images = [
    {
      img: "/images/buy.svg",
      title: "Achetez vos produits dans vos boutiques de choix",
      text: "Plus la peine de se déplacer pour acheter vos marchandises vous pouvez rester chez vous et acheter vos produit. ",
      width: 900,
      height: 896,
    },
    // "Ouvrez votre boutique et obtenez votre propre boutique en ligne pour vos produits",
    {
      img: "/images/open.svg",
      title: "Achetez vos produits dans vos boutiques de choix",
      text: "Observez vos ventes augmenter grace à un marketing rigoureux mis en place par la plateforme.",
      width: 706,
      height: 686,
    },
  ];
  return (
    <div className={hero}>
      <div className="glide" ref={glide}>
        <div className="glide__track" data-glide-el="track">
          <ul className={`glide__slides`}>
            {images.map((image, idx) => (
              <li className="glide__slide" key={idx}>
                <div className={`${hero__center} ${container} center`}>
                  <div className={`${hero__left} left`}>
                    <h1>{image.title}</h1>
                    <p>{image.text}</p>
                    <Link href="/">
                      <button className={button}></button>
                    </Link>
                  </div>
                  <div className={`${hero__right} right`}>
                    <Image
                      src={image.img}
                      width={image.width}
                      height={image.height}
                      className={hero__img}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glide__bullets" data-glide-el="controls[nav]">
          <button className={`glide__bullet `} data-glide-dir="=0"></button>
          <button className={`glide__bullet `} data-glide-dir="=1"></button>
        </div>

        <div className={`glide__arrows `} data-glide-el="controls">
          <button
            className={`glide__arrow glide__arrow--left ${hero__arrow}`}
            data-glide-dir="<"
          >
            {/* <Image src="/images/slider-left" width={56} height={56} /> */}
            <BiChevronLeft color="#000" size="56px" />
          </button>
          <button
            className={`glide__arrow glide__arrow--right ${hero__arrow}`}
            data-glide-dir=">"
          >
            <BiChevronRight color="#000" size="56px" />
          </button>
        </div>
      </div>
    </div>
  );
}
