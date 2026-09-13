import { getSiteImage } from './images';

export const socialIcons = async (): Promise<Record<string, string>> => {
  const [facebook, instagram, tiktok] = await Promise.all([
    getSiteImage('icon_facebook'),
    getSiteImage('icon_instagram'),
    getSiteImage('icon_tiktok'),
  ]);
  return { Facebook: facebook.src, Instagram: instagram.src, TikTok: tiktok.src };
};
