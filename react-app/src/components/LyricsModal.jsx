export default function LyricsModal({ lyrics }) {
  return (
    <>
      <div className=" overflow-y-scroll text-xs md:text-sm lg:text-base">
        <pre className="text-black marcellus w-fit max-h-[70vh] break-all ">
          {lyrics}
        </pre>
      </div>
    </>
  );
}
