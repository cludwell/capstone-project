export default function ModalString({ openId, setOpenId, children, lyrics }) {
    return (
      <div
        onClick={() => setOpenId('')}
        className={`
          fixed inset-0 flex justify-center items-center transition-colors z-30 drop-shadow-xl
          ${openId === lyrics.slice(0,20) ? "visible bg-black/40" : "invisible"}
      `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 transition-all overflow-y-scroll break-all max-h-[80%]
          ${openId ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
        >
          {children}
        </div>
      </div>
    );
  }
