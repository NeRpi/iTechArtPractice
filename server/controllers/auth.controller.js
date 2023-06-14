import AuthService from "../services/auth.service.js";

class AuthController {
  constructor() {
    this._authService = new AuthService();
  }

  registration = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userData = await this._authService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userData = await this._authService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };

  logout = async (req, res, next) => {
    try {
      res.clearCookie("refreshToken");
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  };

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await this._authService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  };
}

export default new AuthController();
