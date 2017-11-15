import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
let sinon = require('sinon');
import moment from 'moment';
import locus from 'locus';
import UpcomingMock from './helpers/upcomingMock'
var nock = require('nock');

var couchdb = nock('https://api.themoviedb.org')
                .get('/3/movie/upcoming?api_key=1500d38f789b9c7a70e564559a8c644d&language=en-US&page=1')
                .reply(200, {
                  UpcomingMock
                 });

import Upcoming from '../lib/components/Upcoming';

const props = {
      UpcomingMock
    }

describe('Upcoming page', () => {

  it.skip('renders as a <div>', () => {
    const wrapper = shallow(<Upcoming {...props}/>);
    expect(wrapper).to.exist;
  });

});
