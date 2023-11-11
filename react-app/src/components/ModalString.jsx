export default function ModalString({ openId, setOpenId, children, string }) {
    return (
      <>
      <div
        onClick={() => setOpenId('')}
        className={`
          absolute inset-0 flex justify-center  transition-colors z-30 drop-shadow-xl duration-200
          ${openId === string.slice(0,20) ? "visible bg-black/40" : "invisible"}
      `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 transition-all  max-h-[90vh] duration-300 h-fit
          ${openId ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
        >
          {children}
        </div>
      </div>
      </>
    );
  }
