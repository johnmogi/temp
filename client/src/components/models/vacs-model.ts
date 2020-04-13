export class VacsModel {
  public constructor(
    public vacationID?: number,
    public description?: string,
    public destination?: string,
    public picFileName?: string,
    public startDate?: string | Date,
    public endDate?: string | Date,
    public price?: string,
    public follow?: boolean,
    public arrangedVacs?: boolean
  ) {}
}
export class NewVacsModel {
  public constructor(
    public vacationID?: number,
    public description?: string,
    public destination?: string,
    public picFileName?: string,
    public startDate?: string | Date,
    public endDate?: string | Date,
    public price?: string,
    public follow?: boolean
  ) {}
}
// File
