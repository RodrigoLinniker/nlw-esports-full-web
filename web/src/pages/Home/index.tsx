import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "../../assets/logo-nlw-esports.svg";
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { CaretLeft, CaretRight } from "phosphor-react";
import { GameBanner } from "../../components/GameBanner";
import { CreateAdBanner } from "../../components/CreateAdBanner";
import { CreateAdModal } from "../../components/CreateAdModal";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export const GameContext = createContext([]);
export function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="w-full max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />
      <h1 className="text-6xl text-white font-black text-center mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>
        está aqui
      </h1>
      <div className="w-full max-w-[1200px] max-md:max-w-[300px] flex flex-row mt-16 items-center justify-center">
        <div className="swiper-button-prev-unique cursor-pointer">
          <CaretLeft size={48} className="text-zinc-400" />
        </div>
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={20}
          loopFillGroupWithBlank={true}
          navigation={{
            nextEl: ".swiper-button-next-unique",
            prevEl: ".swiper-button-prev-unique",
          }}
          breakpoints={{
            768: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
          }}
          mousewheel={true}
          modules={[Pagination, Navigation]}
          className="w-full"
        >
          {games.map((game) => {
            return (
              <SwiperSlide key={game.id}>
                <GameBanner
                  key={game.id}
                  gameId={game.id}
                  bannerUrl={game.bannerUrl}
                  title={game.title}
                  adsCount={game._count.ads}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="swiper-button-next-unique  cursor-pointer ">
          {" "}
          <CaretRight size={48} className="text-zinc-400" />
        </div>
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}
