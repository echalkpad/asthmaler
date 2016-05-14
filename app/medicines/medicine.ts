export default class Medicine {

	id: number
	name: string;
	quantity: number;
	morningHours: string;
	//TODO : dawkowanie itp ...

	constructor(id: number, name: string, quantity: number, morningHours: string) {
		this.id = id;
		this.name = name;
		this.quantity = quantity;
		this.morningHours = morningHours;
	}

}
