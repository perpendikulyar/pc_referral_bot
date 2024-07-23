import { SheetService } from '../google_api/sheet.service';

export abstract class DTO {
    abstract readonly tableName: string;
    abstract savedProps: string[];
    private service: SheetService;

    constructor() {
        this.service = new SheetService();
    }

    async save() {
        await this.service.save(this);
    }

    getProps() {
        let props: string[] = [];

        this.savedProps.forEach((e) => {
            props.push(Object.getOwnPropertyDescriptor(this, e)?.value || "");
        });

        return props;
    }
}
