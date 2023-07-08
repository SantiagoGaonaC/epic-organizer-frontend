export interface IAuthService {
  getCode: (email: string) => Promise<{ ok: boolean; message: string }>;
}
