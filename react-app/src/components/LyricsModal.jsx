export default function LyricsModal({ lyrics }) {
  return (
    <>
      <div className=" overflow-y-scroll">
        <pre className="text-black marcellus w-fit max-h-[70vh] break-all ">
          {lyrics}
        </pre>
      </div>
    </>
  );
}
