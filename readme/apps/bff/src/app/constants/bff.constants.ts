export enum BffConfigViolation {
  BffHostRequired = 'BFF service host is required',
  BffPortRequired = 'BFF service port is required',
  BffUserHostRequired = 'User service host is required',
  BffUserPortRequired = 'User service port is required',
  BffBlogHostRequired = 'Blog service host is required',
  BffBlogPortRequired = 'Blog service port is required',
  BffNotifyHostRequired = 'Notify service host is required',
  BffNotifyPortRequired = 'Notify service port is required',
}

export const ENV_FILE_PATH = 'environments/.bff.env';
