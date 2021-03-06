class TestClass {
    constructor (name, age) {
        this.people = { name, age };
    }

    getName() {
        return this.people.name;
    } 

    getPeople() {
        const { name, age } = this.people;
        return `${name} is ${age}`;
    }

    getNewObject() {
        return  {...this.people};
    }
}

module.exports = TestClass;