import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle, X } from "phosphor-react";

interface AnuncioModalProps {
  discord: string;
}

export function AnuncioModal(props: AnuncioModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed z-10" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 z-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <div className="flex justify-end">
          <Dialog.Close>
            <X size={20} className="text-zinc-500 " />
          </Dialog.Close>
        </div>
        <CheckCircle size={64} className="text-emerald-400 mx-auto" />
        <div className="flex flex-col mt-6 items-center">
          <Dialog.Title className="text-3lx font-black">
            Let’s play!
          </Dialog.Title>
          <h1 className="text-zinc-400 ">Agora é só começar a jogar!</h1>
        </div>
        <div className="w-full max-w-[231px] mx-auto flex flex-col mt-6 items-center justify-center gap-2">
          <h1 className="font-semibold text-white">Adicione no Discord</h1>

          <h1 className="w-full text-center text-zinc-400 py-[11px] bg-zinc-900">
            {props.discord}
          </h1>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
