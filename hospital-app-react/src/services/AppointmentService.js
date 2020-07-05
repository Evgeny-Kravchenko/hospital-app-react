import BaseService from "./BaseService";

export class AppointmentService extends BaseService {
  find({ filter }) {
    return super.request({
      url: "/appointments",
      params: { ...filter },
    });
  }
}

export default new AppointmentService();
