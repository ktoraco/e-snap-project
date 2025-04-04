import { FC } from "react";

const InfoTerminal: FC = () => {
  return (
    <div className="bg-black text-gray-300 font-mono p-4 h-full overflow-y-auto max-h-[300px] p-2 text-xs">
      <p>[INFO] Photo ID: 10234</p>
      <p>[INFO] Title: Sunset Over the Mountains</p>
      <p>[INFO] Location: Virtual World - Region 5</p>
      <p>[INFO] Captured By: User12345</p>
      <p>[INFO] Date Captured: 2023-09-15 18:45:23</p>
      <p>[INFO] Resolution: 1920x1080</p>
      <p>[INFO] File Size: 2.3MB</p>
      <p>[INFO] Format: JPEG</p>
      <p>[INFO] Tags: #sunset #mountains #virtualworld</p>
      <p>
        [INFO] Description: A breathtaking view of the sun setting over the
        mountains in the virtual world.
      </p>
      <p>[INFO] Camera Settings:</p>
      <p> - Aperture: f/2.8</p>
      <p> - Shutter Speed: 1/250s</p>
      <p> - ISO: 100</p>
      <p> - Focal Length: 35mm</p>
      <p>[INFO] Color Profile: sRGB</p>
      <p>[INFO] GPS Coordinates: 35.6895° N, 139.6917° E</p>
      <p>[INFO] Weather: Clear Skies</p>
      <p>[INFO] Popularity: 4.8/5 (based on 234 ratings)</p>
      <p>[INFO] Comments:</p>
      <p> - "Absolutely stunning!"</p>
      <p> - "Feels like I'm there."</p>
      <p> - "Great composition and colors."</p>
      <p>[INFO] Related Photos:</p>
      <p> - Photo ID: 10235 (Sunrise in the Valley)</p>
      <p> - Photo ID: 10236 (Night Sky Over the Lake)</p>
    </div>
  );
};

export default InfoTerminal;
