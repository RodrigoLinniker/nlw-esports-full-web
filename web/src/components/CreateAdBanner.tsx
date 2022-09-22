import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="w-full max-w-[1200px] px-2">
      <div className="w-full max-w-[1200px] pt-1 bg-nlw-gradient self-center rounded-lg mt-8 overflow-hidden ">
        <div className="bg-[#2A2634] px-8 py-6 flex max-md:flex-col justify-between items-center ">
          <div>
            <strong className="text-2xl text-white max-md:text-center font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>
          <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3 max-md:mt-5">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
        </div>
      </div>
    </div>
  );
}
