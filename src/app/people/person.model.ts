export class Person {

    constructor ( public id: string,
                  public firstName: string,
                  public middleName: string,
                  public lastName: string,
                  public birthDate: string,
                  public birthPlace: string,
                  public christeningDate: string,
                  public marriageDate: string,
                  public deathDate: string,
                  public burialPlace: string,
                  public notes: string,
                  public children: Person[] = []

    ) {}
}