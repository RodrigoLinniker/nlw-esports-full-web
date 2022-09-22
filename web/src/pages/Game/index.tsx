import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import logoImg from "../../assets/logo-nlw-esports.svg";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CaretLeft, CaretRight, Divide } from "phosphor-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { AnuncioBanner } from "../../components/AnuncioBanner";
import * as Dialog from "@radix-ui/react-dialog";

interface Anuncios {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
}

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function Game() {
  const params = useParams();
  const gameId = params.id;
  const [anuncios, setAnuncios] = useState<Anuncios[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  const gameFiltered = games.filter((game: Game) => game.id === gameId);

  useEffect(() => {
    axios(`http://localhost:3333/games/${gameId}/ads`).then((response) => {
      setAnuncios(response.data);
    });
  }, []);

  useEffect(() => {
    axios(`http://localhost:3333/games`).then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="w-full max-w-[1344px] mx-auto flex flex-col items-center justify-center mt-20">
      {gameFiltered.map((game) => {
        return (
          <div
            className="flex flex-col m-auto items-center justify-center"
            key={game.id}
          >
            <img
              src={game.bannerUrl}
              className="w-[311px] h-[160px] object-cover rounded-lg"
              alt=""
            />
            <h1 className="text-6xl text-white font-black mt-20 text-center">
              {game.title}
            </h1>
          </div>
        );
      })}
      <h1 className="text-2xl text-zinc-400 mt-5">
        Conecte-se e comece a jogar!
      </h1>

      {anuncios && anuncios.length ? (
        <div className="w-full max-w-[1200px] max-md:max-w-[300px] flex flex-row mt-16 items-center justify-center">
          <div className="swiper-button-prev-unique1 cursor-pointer">
            <CaretLeft size={48} className="text-zinc-400" />
          </div>
          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            loopFillGroupWithBlank={true}
            navigation={{
              nextEl: ".swiper-button-next-unique1",
              prevEl: ".swiper-button-prev-unique1",
            }}
            breakpoints={{
              1280: {
                spaceBetween: 20,
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
              1024: {
                spaceBetween: 20,
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              768: {
                spaceBetween: 70,
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
            }}
            mousewheel={true}
            modules={[Pagination, Navigation]}
            className="w-full mb-2"
          >
            {anuncios.map((anuncios) => {
              return (
                <SwiperSlide key={anuncios.id}>
                  <AnuncioBanner
                    id={anuncios.id}
                    name={anuncios.name}
                    weekDays={anuncios.weekDays}
                    yearsPlaying={anuncios.yearsPlaying}
                    useVoiceChannel={anuncios.useVoiceChannel}
                    hourStart={anuncios.hourStart}
                    hourEnd={anuncios.hourEnd}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="swiper-button-next-unique1  cursor-pointer ">
            {" "}
            <CaretRight size={48} className="text-zinc-400" />
          </div>
        </div>
      ) : (
        <h1 className="text-5xl text-zinc-400  mt-24 text-center">
          Não há anuncios publicados ainda
        </h1>
      )}
    </div>
  );
}
