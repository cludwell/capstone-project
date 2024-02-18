export default function LyricsModal({ lyrics }) {
  return (
      <div className=" overflow-y-scroll text-xs md:text-sm lg:text-base break-all">
        <pre className="text-black marcellus w-fit max-h-[70vh] overflow-pre pr-10 ">
          {lyrics}
        </pre>
      </div>
  );
}
