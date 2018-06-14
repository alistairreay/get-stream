'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _stream = require('stream');

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _intoStream = require('into-stream');

var _intoStream2 = _interopRequireDefault(_intoStream);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function makeSetup(intoStream) {
	var setup = function setup(streamDef, opts) {
		return (0, _2.default)(intoStream(streamDef), opts);
	};
	setup.array = function (streamDef, opts) {
		return _2.default.array(intoStream(streamDef), opts);
	};
	setup.buffer = function (streamDef, opts) {
		return _2.default.buffer(intoStream(streamDef), opts);
	};
	return setup;
}

var setup = makeSetup(_intoStream2.default);
setup.obj = makeSetup(_intoStream2.default.obj);

(0, _ava2.default)('get stream as a buffer', function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(t) {
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.t0 = t;
						_context.next = 3;
						return _2.default.buffer(_fs2.default.createReadStream('fixture'));

					case 3:
						_context.t1 = new Buffer('unicorn\n');
						_context.t2 = _context.sent.equals(_context.t1);

						_context.t0.true.call(_context.t0, _context.t2);

					case 6:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, undefined);
	}));

	return function (_x) {
		return _ref.apply(this, arguments);
	};
}());

(0, _ava2.default)('get stream as an array', function () {
	var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(t) {
		var fixture;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						fixture = _fs2.default.createReadStream('index.js', 'utf8');

						fixture.setEncoding('utf8');
						_context2.t0 = t;
						_context2.t1 = _typeof;
						_context2.next = 6;
						return _2.default.array(fixture);

					case 6:
						_context2.t2 = _context2.sent[0];
						_context2.t3 = (0, _context2.t1)(_context2.t2);

						_context2.t0.is.call(_context2.t0, _context2.t3, 'string');

					case 9:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x2) {
		return _ref2.apply(this, arguments);
	};
}());

(0, _ava2.default)('get object stream as an array', function () {
	var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(t) {
		var result;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.next = 2;
						return setup.obj.array([{ foo: true }, { bar: false }]);

					case 2:
						result = _context3.sent;

						t.deepEqual(result, [{ foo: true }, { bar: false }]);

					case 4:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function (_x3) {
		return _ref3.apply(this, arguments);
	};
}());

(0, _ava2.default)('get non-object stream as an array of strings', function () {
	var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(t) {
		var result;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.next = 2;
						return setup.array(['foo', 'bar'], { encoding: 'utf8' });

					case 2:
						result = _context4.sent;

						t.deepEqual(result, ['foo', 'bar']);

					case 4:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function (_x4) {
		return _ref4.apply(this, arguments);
	};
}());

(0, _ava2.default)('get non-object stream as an array of Buffers', function () {
	var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(t) {
		var result;
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.next = 2;
						return setup.array(['foo', 'bar'], { encoding: 'buffer' });

					case 2:
						result = _context5.sent;

						t.deepEqual(result, [new Buffer('foo'), new Buffer('bar')]);

					case 4:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, undefined);
	}));

	return function (_x5) {
		return _ref5.apply(this, arguments);
	};
}());

(0, _ava2.default)('getStream should not affect additional listeners attached to the stream', function () {
	var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(t) {
		var fixture;
		return regeneratorRuntime.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						t.plan(3);
						fixture = (0, _intoStream2.default)(['foo', 'bar']);

						fixture.on('data', function (chunk) {
							return t.true(Buffer.isBuffer(chunk));
						});
						_context6.t0 = t;
						_context6.next = 6;
						return (0, _2.default)(fixture);

					case 6:
						_context6.t1 = _context6.sent;

						_context6.t0.is.call(_context6.t0, _context6.t1, 'foobar');

					case 8:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, undefined);
	}));

	return function (_x6) {
		return _ref6.apply(this, arguments);
	};
}());

(0, _ava2.default)('maxBuffer throws when size is exceeded', function (t) {
	t.throws(setup(['abcd'], { maxBuffer: 3 }));
	t.notThrows(setup(['abc'], { maxBuffer: 3 }));

	t.throws(setup.buffer(['abcd'], { maxBuffer: 3 }));
	t.notThrows(setup.buffer(['abc'], { maxBuffer: 3 }));
});

(0, _ava2.default)('maxBuffer applies to length of arrays when in objectMode', function (t) {
	t.throws(_2.default.array(_intoStream2.default.obj([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]), { maxBuffer: 3 }), /maxBuffer exceeded/);
	t.notThrows(_2.default.array(_intoStream2.default.obj([{ a: 1 }, { b: 2 }, { c: 3 }]), { maxBuffer: 3 }));
});

(0, _ava2.default)('maxBuffer applies to length of data when not in objectMode', function (t) {
	t.throws(setup.array(['ab', 'cd', 'ef'], { encoding: 'utf8', maxBuffer: 5 }), /maxBuffer exceeded/);
	t.notThrows(setup.array(['ab', 'cd', 'ef'], { encoding: 'utf8', maxBuffer: 6 }));
	t.throws(setup.array(['ab', 'cd', 'ef'], { encoding: 'buffer', maxBuffer: 5 }), /maxBuffer exceeded/);
	t.notThrows(setup.array(['ab', 'cd', 'ef'], { encoding: 'buffer', maxBuffer: 6 }));
});

(0, _ava2.default)('Promise rejects when input stream emits an error', function () {
	var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(t) {
		var readable, data, error, reads;
		return regeneratorRuntime.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						readable = new _stream.Readable();
						data = 'invisible pink unicorn';
						error = new Error('Made up error');
						reads = data.match(/.{1,5}/g);


						readable._read = function () {
							var _this = this;

							if (reads.length === 0) {
								setImmediate(function () {
									_this.emit('error', error);
								});
								return;
							}

							this.push(reads.shift());
						};

						_context7.prev = 5;
						_context7.next = 8;
						return (0, _2.default)(readable);

					case 8:
						t.fail('should throw');
						_context7.next = 15;
						break;

					case 11:
						_context7.prev = 11;
						_context7.t0 = _context7['catch'](5);

						t.is(_context7.t0, error);
						t.is(_context7.t0.bufferedData, data);

					case 15:
					case 'end':
						return _context7.stop();
				}
			}
		}, _callee7, undefined, [[5, 11]]);
	}));

	return function (_x7) {
		return _ref7.apply(this, arguments);
	};
}());
