class Error403 extends Error {
  status = 0;
  tilgang = {};
  constructor(message: string, status: number, tilgang = {}) {
    super(message);
    this.status = status;
    this.tilgang = tilgang;
  }
}

exports.Error403 = Error403;
