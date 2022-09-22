import { GameController } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnuncioModal } from "./AnuncioModal";
import { useEffect, useState } from "react";
import axios from "axios";

interface AnuncioBannerProps {
  id: string;
  name: string;
  weekDays: string[];
  useVoiceChannel: boolean;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
}

interface Discord {
  discord: string;
}
export function AnuncioBanner(props: AnuncioBannerProps) {
  const [nickDiscord, setNickDiscord] = useState<Discord>();

  useEffect(() => {
    axios(`http://localhost:3333/ads/${props.id}/discord`).then((response) => {
      setNickDiscord(response.data);
    });
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 px-4 py-4 max-w-[200px] h-[305px]  bg-[#2A2634] rounded-lg">
      <div>
        <h1 className="text-zinc-400 text-sm">Nome</h1>
        <strong className="font-bold text-white text-sm">{props.name}</strong>
      </div>
      <div>
        <h1 className="text-zinc-400 text-sm">Tempo de Jogo</h1>
        <strong className="font-bold text-white text-sm">
          {`${props.yearsPlaying} anos`}
        </strong>
      </div>
      <div>
        <h1 className="text-zinc-400 text-sm">Disponibilidade</h1>
        <strong className="font-bold text-white text-sm">
          {`${props.weekDays.length} dias \u2022 ${props.hourStart} - ${props.hourEnd} `}
        </strong>
      </div>
      <div>
        <h1 className="text-zinc-400 text-sm">Chamada de Aúdio?</h1>

        {props.useVoiceChannel ? (
          <strong className="font-bold text-green-500 text-sm">Sim</strong>
        ) : (
          <strong className="font-bold text-red-500 text-sm">Não</strong>
        )}
      </div>
      <Dialog.Root>
        <Dialog.Trigger className="bg-[#8B5CF6] w-[140px] py-2 mx-auto items-center justify-center rounded-md flex flex-row gap-2">
          {" "}
          <GameController size={20} color={"#fff"} />
          <h1 className="font-semibold text-white text-sm">Conectar</h1>
        </Dialog.Trigger>
        <AnuncioModal discord={`${nickDiscord?.discord}`} />
      </Dialog.Root>
    </div>
  );
}
