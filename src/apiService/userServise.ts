import ApiService from "./apiService";

class UserService extends ApiService {
  private routeUrl: string;

  constructor(baseURL: string, routeUrl: string, token?: string) {
    super(baseURL, token);
    this.routeUrl = routeUrl;
  }

  public isUserCompliteRegistration = async (
    email: string
  ): Promise<boolean> => {
    const { status } = await this.post(this.routeUrl, { email });
    return status === 200 && true;
  };
}

export { UserService };
