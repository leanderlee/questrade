/** @format */

// const deprecated:never = {
// ! async method removeOrder(id)
/*   public async removeOrder(id: string) {
    try {
      return this._accountApi('DELETE', `/orders/${id}`); // # DELETE
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  } */

// ! async method createOrder(options)
/*  public async createOrder(options) {
    try {
      return this._accountApi('POST', '/orders', options); // # POST
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  } */
// ! async method createStrategy(options)
/*   public async createStrategy(options) {
    try {
      return this._accountApi('POST', '/orders/strategy', options); // # POST
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  } */

// ! async method testOrder(options)
/*   public async testOrder(options) {
    try {
      return this._accountApi('POST', '/orders/impact', options); // # POST
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  } */
// ! async method testStrategy(options)
// public async testStrategy(options) {
//   try {  // # POST
//     return this._accountApi('POST', '/orders/strategy/impact', options);
//   } catch (error) {
//     console.error(error.message);
//     throw new Error(error.message);
//   }
// }
// ! async method updateOrder(id)
/*   public async updateOrder(id: string, options) {
    try {
      return this._accountApi('POST', `/orders/${id}`, options); // # POST
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
        if (opt.startTime && !moment(opt.startTime).isValid()) {
        throw new Error('start_time_invalid');
      }
      // details: opt.startTime,
      if (opt.endTime && !moment(opt.endTime).isValid()) {
        throw new Error('end_time_invalid');
      }
      const startTime = opt.startTime
        ? moment(opt.startTime).toISOString()
        : moment()
            .startOf('day')
            .subtract(30, 'days')
            .toISOString();
      const endTime = opt.endTime
        ? moment(opt.endTime).toISOString()
        : moment().toISOString();

         let startTime;
      let endTime;
      if (!!options) {
        if (options.startTime && !moment(options.startTime).isValid()) {
          throw new Error('start_time_invalid');
        }
        if (options.endTime && !moment(options.endTime).isValid()) {
          throw new Error('end_time_invalid');
        }
        options.startTime
          ? (startTime = moment(options.startTime).toISOString())
          : (startTime = moment()
              .startOf('day')
              .subtract(30, 'days')
              .toISOString());
        options.endTime
          ? (endTime = moment(options.endTime).toISOString())
          : (endTime = moment().toISOString());
      // }
  */
// }
