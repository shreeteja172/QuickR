import Image from "next/image";

export default function QRPreview({ qr, text }: any) {
  return (
    <div className="rounded-2xl border p-5">
      {qr ? (
        <Image src={qr} alt="QR" width={300} height={300} />
      ) : (
        <p>No preview</p>
      )}

      <p className="text-xs mt-2">{text}</p>
    </div>
  );
}