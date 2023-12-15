import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);
  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`
      ${hasBorder ? "border-4 border-black" : ""}
      ${isLarge ? "h-32" : "h-12"} 
      ${isLarge ? "w-32" : "w-12"} 
      rounded-full 
      hover:opacity-90 
      cursor-pointer 
      relative 
      transition
      `}
    >
      <Image
        onClick={onClick}
        alt="Avatar"
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        src={
          fetchedUser?.profileImage ||
          "https://img.icons8.com/external-becris-lineal-color-becris/128/external-user-avatars-becris-lineal-color-becris.png"
        }
      />
    </div>
  );
};

export default Avatar;
