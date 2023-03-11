import {expect} from 'chai';
import inRange from '../lib/index.js';

describe('in-range tests', ()=> {

	it('exact numbers', ()=> {
		expect(inRange(10, '=10')).to.be.true;
		expect(inRange(10, '10')).to.be.true;
		expect(inRange(9, '10')).to.be.false;
		expect(inRange(100, '10')).to.be.false;
	})

	it('multi-choice', ()=> {
		expect(inRange(9, '10,11,12')).to.be.false;
		expect(inRange(10, '10,11,12')).to.be.true;
		expect(inRange(11, '10,11,12')).to.be.true;
		expect(inRange(12, '10,11,12')).to.be.true;
		expect(inRange(13, '10,11,12')).to.be.false;
	});

	it('ranges', ()=> {
		expect(inRange(9, '10-20')).to.be.false;
		expect(inRange(10, '10-20')).to.be.true;
		expect(inRange(15, '10-20')).to.be.true;
		expect(inRange(19, '10-20')).to.be.true;
		expect(inRange(20, '10-20')).to.be.true;
		expect(inRange(21, '10-20')).to.be.false;
		expect(inRange(200, '10-20')).to.be.false;
	});

	it('lower-than', ()=> {
		expect(inRange(9, '<11')).to.be.true;
		expect(inRange(10, '<11')).to.be.true;
		expect(inRange(11, '<11')).to.be.false;
	});

	it('lower-or-equal', ()=> {
		expect(inRange(9, '<=11')).to.be.true;
		expect(inRange(10, '<11')).to.be.true;
		expect(inRange(11, '<11')).to.be.false;
		expect(inRange(12, '<11')).to.be.false;
	});

	it('higher-than', ()=> {
		expect(inRange(7, '>8')).to.be.false;
		expect(inRange(8, '>8')).to.be.false;
		expect(inRange(9, '>8')).to.be.true;
		expect(inRange(10, '>8')).to.be.true;
	});

	it('higher-or-equal', ()=> {
		expect(inRange(9, '>=11')).to.be.false;
		expect(inRange(10, '>=11')).to.be.false;
		expect(inRange(11, '>=11')).to.be.true;
		expect(inRange(12, '>=11')).to.be.true;
		expect(inRange(7, '8+')).to.be.false;
		expect(inRange(8, '8+')).to.be.true;
		expect(inRange(9, '8+')).to.be.true;
		expect(inRange(10, '8+')).to.be.true;
	});

	it('combinational logic', ()=> {
		expect(inRange(0, '1, 2-4, 10+')).to.be.false;
		expect(inRange(1, '1, 2-4, 10+')).to.be.true;
		expect(inRange(2, '1, 2-4, 10+')).to.be.true;
		expect(inRange(3, '1, 2-4, 10+')).to.be.true;
		expect(inRange(4, '1, 2-4, 10+')).to.be.true;
		expect(inRange(5, '1, 2-4, 10+')).to.be.false;
		expect(inRange(6, '1, 2-4, 10+')).to.be.false;
		expect(inRange(10, '1, 2-4, 10+')).to.be.true;
		expect(inRange(11, '1, 2-4, 10+')).to.be.true;
	});

});
