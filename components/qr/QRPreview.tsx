import Image from "next/image";

type Props = {
  qr: string;
  text: string;
};

export default function QRPreview({ qr, text }: Props) {
  return (
    <div className="rounded-lg border border-hairline-soft bg-canvas p-8 shadow-[rgba(0,0,0,0.04)_0px_4px_12px]">
      {qr ? (
        <div className="flex justify-center rounded-md bg-surface p-4">
          <Image
            src={qr}
            alt="QR"
            width={300}
            height={300}
            unoptimized
            className="w-44 h-44 sm:w-72 sm:h-72"
          />
        </div>
      ) : (
        <div className="flex min-h-80 items-center justify-center rounded-md border border-dashed border-hairline-strong bg-surface px-8 text-center">
          <div>
            <p className="text-base font-medium text-ink">
              No preview yet
            </p>
            <p className="mt-2 text-sm text-stone">
              Enter a link or text to generate your first QR code.
            </p>
          </div>
        </div>
      )}

      <p className="mt-4 break-all text-xs leading-[1.5] text-stone">
        {text || "Your encoded content will appear here."}
      </p>
    </div>
  );
}
