import beater from 'beater';
import * as assert from 'power-assert';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';

import { add } from '../src/';

const { test } = beater();

test('add', () => {
  assert(add(1, 2) === 3);
  assert(proxyquire);
  assert(sinon);
});
