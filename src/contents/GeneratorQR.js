import React from "react";
import NavContent from "../contents/NavContentGenerator";
import QRCode from "react-qr-code";
import useState from "react-hook-use-state";

function GeneratorQR() {
  const [qrCode, setQrCode] = useState("");
  const onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="w-full">
      <NavContent />
      <div className="w-full flex justify-center py-8">
        <div className="max-w-5xl flex justify-center flex-col">
          <span className="w-full text-center text-[20px] font-bold">QR Generator</span>
          <div
            style={{ background: "white", padding: "16px" }}
            className="w-full flex justify-center flex-col"
          >
            <div className="w-full flex justify-center">
              <QRCode id="QRCode" title="Custom Title" value={qrCode} />
            </div>
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                maxWidth: 64,
                width: "100%",
              }}
            >
              <QRCode
                id="QRCodeScaled"
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                title="Custom Title"
                value={qrCode}
                viewBox={`0 0 256 256`}
                className="py-4"
              />
            </div>

            <div className="flex flex-wrap md:w-auto w-full p-3 justify-center">
              <label
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                Your URL
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                placeholder="Your URL"
                type="text"
                name="title"
                onChange={(e) => setQrCode(e.target.value)}
                value={qrCode}
                required
              />
            </div>
            <input
              type="button"
              value="Download QR"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onImageCownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneratorQR;
