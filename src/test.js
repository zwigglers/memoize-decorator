import memoize from './index';

class Foo {
	constructor(num) {
		this._myNum = num;
		this.calculateCount = 0;
	}

	@memoize({length:1})
	bar1(num=999) {
		console.log('Complicated calculations...');
		this.calculateCount++;
		return this._myNum+'-'+num;
	}

	@memoize
	bar2(object) {
		console.log('Complicated calculations...');
		this.calculateCount++;
		return this._myNum+'-'+JSON.stringify(object);
	}

	@memoize
	get myNum() {
		console.log('Complicated calculations...');
		this.calculateCount++;
		return this._myNum;
	}

	get calcCount() {
		return "("+this.calculateCount+")";
	}

}

let foo = new Foo(100);
let foo2 = new Foo(50);

console.log('>> Testing: foo.bar1');
console.log(foo.bar1(), foo.calcCount);
console.log(foo.bar1(), foo.calcCount);
console.log(foo.bar1(3), foo.calcCount);

console.log('>> Testing: foo2.bar1');
console.log(foo2.bar1(4), foo2.calcCount);
console.log(foo2.bar1(4), foo2.calcCount);
console.log(foo2.bar1(5), foo2.calcCount);

let obj = {hello:'world'};

console.log('>> Testing: foo.bar2');
console.log(foo.bar2(obj), foo.calcCount);
console.log(foo.bar2(obj), foo.calcCount);
console.log(foo.bar2({farewell:'world'}), foo.calcCount);

console.log('>> Testing: foo.myNum');
console.log(foo.myNum, foo.calcCount);
console.log(foo.myNum, foo.calcCount);

console.log('>> Testing: foo2.myNum');
console.log(foo2.myNum, foo2.calcCount);
console.log(foo2.myNum, foo2.calcCount);