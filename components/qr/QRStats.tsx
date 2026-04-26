export default function QRStats() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="border p-3 rounded-xl">
        <p>Format</p>
        <p className="font-bold">PNG</p>
      </div>
      <div className="border p-3 rounded-xl">
        <p>Status</p>
        <p className="font-bold">Ready</p>
      </div>
    </div>
  );
}