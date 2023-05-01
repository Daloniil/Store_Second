import Router from "next/router";

export const redirectTo = (pathName: string) => {
    Router.push(pathName);
};

