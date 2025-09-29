export const URLpath = "FillTime";

export function getBackendUrl(path = "") {
    return `${location.protocol}//${location.hostname}/${URLpath}/${path}`;
}
