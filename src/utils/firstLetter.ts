export const capitalizeFirstLetter = (str: string) => {
    const words = str.split(" ");
    return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
};
