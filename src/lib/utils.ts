import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getAccronym(firstName: string, lastName: string) {
    const name = `${firstName} ${lastName}`;
    const words = name.split(" ");
    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    } else {
        return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    }
}