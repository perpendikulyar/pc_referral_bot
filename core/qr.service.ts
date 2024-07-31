import { create, QRCode, QRCodeOptions, QRCodeToDataURLOptions, toDataURL } from "qrcode";

export async function generateQR(link: string) {

    const options: QRCodeToDataURLOptions = {
        type: "image/jpeg",
        width: 1000,
        color: {light: "c6f2d8", dark: "333333"},
        margin: 2,
    }

    const qrcode = toDataURL(link, options);
    return qrcode;
}