import Image from "next/image";
import styles from "./page.module.css";
import Carousel from "@/component/carousel/Carousel";
import OffersSection from "@/component/offers/Offers";


export default function Home() {
  return <>
<Carousel/>
<OffersSection/>
  </>
}
