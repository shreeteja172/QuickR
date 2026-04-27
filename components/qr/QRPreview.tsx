import Image from "next/image";

type Props = {
  qr: string;
  text: string;
};

export default function QRPreview({ qr, text }: Props) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.5)] backdrop-blur-sm">
      {qr ? (
        <div className="flex justify-center rounded-2xl bg-slate-50 p-4">
          <Image src={qr} alt="QR" width={300} height={300} unoptimized />
        </div>
      ) : (
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-8 text-center">
          <div>
            <p className="text-base font-semibold text-slate-800">
              No preview yet
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter a link or text to generate your first QR code.
            </p>
          </div>
        </div>
      )}

      <p className="mt-4 break-all text-xs leading-5 text-slate-500">
        {text || "Your encoded content will appear here."}
      </p>
    </div>
  );
}
