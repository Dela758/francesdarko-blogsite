export class DateStringValueObject {
  private readonly date: Date;

  constructor(private readonly dateString: string) {
    this.date = new Date(dateString);
  }

  public isValid(): boolean {
    return !isNaN(this.date.getTime());
  }

  public format(locale = "en-US"): string {
    if (!this.isValid()) return this.dateString;
    return this.date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  public getTime(): number {
    return this.isValid() ? this.date.getTime() : 0;
  }
}
