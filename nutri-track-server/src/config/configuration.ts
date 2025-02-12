export class Configuration {
    private env: NodeJS.ProcessEnv;
    private static conf: Configuration;
  
    private constructor(env: NodeJS.ProcessEnv) {
      this.env = env;
    }
  
    get PORT(): number {
      return Number(this.env.PORT) || 443;
    }

    get DB_CONNECTION(): string {
      return this.env.DB_CONNECTION || "mongodb://server:123123123@127.0.0.1:21771/web_class";
    }
  
    get GEMINI_API_KEY(): string {
      return this.env.GEMINI_API_KEY || "AIzaSyDAN8VsZ4ltljYij4VPYcRegKYoKZsaQNA";
    }

    get DOMAIN_BASE(): string {
      return this.env.DOMAIN_BASE || "https://node90.cs.colman.ac.il";
    }

    get NODE_ENV(): string {
      return this.env.NODE_ENV || "production";
    }
  
    get JWT_SECRET(): string {
      return this.env.JWT_SECRET || "3c5d812d3e30e9544e71a58174f52d3158d930323176052ab5f835bd93296db193894ec4a7355bcaa0a9c5fc05e36efab31a1a08ad5810d63b8e3b60c6c2638c";
    }
  
    get JWT_EXPIRES_IN(): number {
      return Number(this.env.JWT_EXPIRES_IN) || 3600;
    }

    get JWT_REFRESH_SECRET(): string {
      return this.env.JWT_REFRESH_SECRET || "3c5d812d3e30e9544e71a58174f52d3158d930323176052ab5f835bd93296db193894ec4a7355bcaa0a9c5fc05e36efab31a1a08ad5810d63b8e3b60c6c11111";
    }
  
    get JWT_REFRESH_EXPIRES_IN(): number {
      return Number(this.env.JWT_REFRESH_EXPIRES_IN || "172800");
    }

    get GOOGLE_CLIENT_ID(): string {
      return this.env.GOOGLE_CLIENT_ID || "663257001119-t30hvqookots5n6oji8eqkuvv4lkkc86.apps.googleusercontent.com"
    }

    get GOOGLE_CLIENT_SECRET(): string {
      return this.env.GOOGLE_CLIENT_SECRET || "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"
    }
  
    public static getInstance(
      env: NodeJS.ProcessEnv = process.env
    ): Configuration {
      if (!this.conf) {
        this.conf = new Configuration(env);
      }
  
      return this.conf;
    }
  
    public static revokeInstance(): void {
      this.conf = undefined;
    }
  }