export type payloadType = string | number | boolean | undefined | null;

export type stateType = {
  userData: {
    gxyInfo: number,
    phone: string,
    role: string,
    token: string,
    username: string
  } | null
}
