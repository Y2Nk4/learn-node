class TestClass {
    constructor () {
        console.log('init')
    }

    get name () {
        return 'testClass'
    }

    printName () {
        return this.name
    }
}

TestClass.prototype.propertyname = 'testASD'

let instance = new TestClass()

console.log(instance.printName())
console.log(instance.propertyname)