
export const UserAPIUr = {
  Register: (url: string) => `${url}/api/auth/register`,
  Login: (url: string) => `${url}/api/auth/login`,
  CheckUser: (url: string) => `${url}/api/auth/check`,
  Update: (url: string) => `${url}/api/auth/update`,
  GetUser: (url: string) => `${url}/api/auth/`,
  Friends: (url: string) => `${url}/api/auth/updateFriends`,
  Upload: (url: string) => `${url}/api/auth/upload`
}
