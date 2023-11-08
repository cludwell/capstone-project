export default function Modal({ open, setOpen, children }) {
  return (
    // back
    <div
      onClick={() => setOpen(false)}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors z-30
        ${open ? "visible bg-black/40" : "invisible"}
    `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
}
