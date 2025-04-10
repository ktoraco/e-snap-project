import { config } from "dotenv";
config();//envファイルを読み込む

/** @type {import('next').NextConfig} */
const nextConfig = {
    env : {
        MICROCMS_API_KEY : process.env.MICROCMS_API_KEY,
    },
    images: {
        domains: ['images.microcms-assets.io'], // 許可するホスト名を追加
    },
};

export default nextConfig;
