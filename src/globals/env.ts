export class Env {
  static get isLocal(): boolean {
    return process.env.ENVIRONMENT === 'local'
  }

  static get ENVIRONMENT_NAME(): string {
    return process.env.ENVIRONMENT || 'production'
  }

  static get PORT(): number {
    return process.env.PORT ? parseInt(process.env.PORT) : 3000
  }

  static get JWT_ACCESS_SECRET(): string {
    return process.env.JWT_ACCESS_SECRET!
  }

  static get JWT_REFRESH_SECRET(): string {
    return process.env.JWT_REFRESH_SECRET!
  }
}