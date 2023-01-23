import { ServiceUrlConfig } from "@readme/shared"

export const getServiceUrl = (servicePara: ServiceUrlConfig): string => { return `http://${servicePara.host}:${servicePara.port}` }
