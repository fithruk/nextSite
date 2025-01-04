import ApiService from "./apiService";

type GetUserAgeAndGenderByEmailType = {
  gender: string;
  dateOfBirdth: Date;
};

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

  public getUserAgeAndGenderByEmail = async (email: string) => {
    const { data, status } = await this.get<GetUserAgeAndGenderByEmailType>(
      this.routeUrl,
      {
        params: {
          email,
        },
      }
    );
    if (status === 200 && data.dateOfBirdth && data.gender) {
      return { ...data };
    }
  };
}

export { UserService };
