import { useState } from "react";
import ModalString from "./ModalString";

export default function LyricsModal({ lyrics }) {
  const [openId, setOpenId] = useState('');
  return (
    <>
      <button className=" p-2 bg-emerald-600 text-white uppercase rounded-lg text-sm transition duration-200 ease-in-out montserrat active:bg-emerald-800 active:scale-90"
      onClick={() => setOpenId(lyrics.slice(0,20))}>
        lyrics
      </button>
      <ModalString openId={openId} setOpenId={setOpenId} string={lyrics}>
        <div className=" overflow-y-scroll">
        <pre className="text-black marcellus w-fit max-h-[80vh] break-all ">{lyrics}</pre>

        </div>
      </ModalString>
    </>
  );
}
