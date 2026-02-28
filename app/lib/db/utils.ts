import { clsx, type ClassValue } from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(input : ClassNameValue[]){
    twMerge(clsx(input))
}