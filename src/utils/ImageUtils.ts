import type { GetImageResult } from "astro";
import { getImage } from "astro:assets";

// Adjust the path to your profile image
import profileImageSrc from "../images/profile.png";


export async function getProfileImage(): Promise<GetImageResult> {
  const profileImage = await getImage({ src: profileImageSrc});
  return profileImage;
}